##连接数据库
import pymysql
import pymysql.cursors
import akshare as ak
import pandas as pd
import statsmodels.api as sm
from os import listdir
import urllib.request
import urllib.error

def get_init_backtest():
    return {
        "asset": 10000,
        "cash": 10000,
        "asset_init": 10000,
        "asset_max": 10000,
        "market_value": 0,  # 市值
        "pnl_real_accum": 0,  # 累计已实现盈亏：卖出
        "pnl_all": 0,  # 总盈亏=已实现盈亏+浮动盈亏-费用：买入、卖出
        "pnl_float": 0,  # 浮动盈亏：行情
        "npv": 1,  # 净值
        "yields": 0,  # 收益率
        "drawdown_max": 0,  # 最大回测
        "drawdownrate_max": 0,  # 最大回撤率
    }

def portfolio_trade(buy, sell, last_backtest: dict):
    backtest = last_backtest.copy()
    # 先卖出
    if sell:
        # 更新持券市值、可用现金
        # print(sell["volume"],sell['price'])
        value = sell["volume"] * sell["price"]  # 市值
        backtest["cash"] += value

        # 计算已实现盈亏
        cost = sell["cost"]
        pnl_real = (sell["price"] - cost) * sell["volume"]
        backtest["pnl_real_accum"] += pnl_real
        backtest["pnl_all"] += pnl_real
    # 再买入
    if buy:
        n = int(backtest["cash"] / buy["price"] / buy["size"])
        volume = buy["size"] * n
        value = buy["price"] * volume
        buy["volume"] = volume
        buy["amount"] = value
        backtest["cash"] -= value
        backtest["market_value"] += value
    # 返回最新持仓和买卖记录
    return buy, sell, backtest

def portfolio_backtest(last_backtest, position, backtest_obj):
    """
    根据一条交易流水更新最新组合绩效和持仓情况
    last_backtest_obj：PermanceObj，更新交易操作前的绩效对象
    backtest_obj：PermanceObj，最新组合绩效的对象
    position:dict,最新的持仓记录

    返回：更新后的最新组合绩效对象
    """

    # 遍历仓位计算浮动盈亏
    pnl_float = (position["current_price"] - position["price"]) * position["volume"]
    backtest_obj["pnl_float"] = pnl_float
    backtest_obj["pnl_all"] = backtest_obj["pnl_real_accum"] + backtest_obj["pnl_float"]

    # 最新权益=期初权益+总盈亏
    backtest_obj["asset"] = backtest_obj["asset_init"] + backtest_obj["pnl_all"]
    backtest_obj["market_value"] = backtest_obj["asset"] - backtest_obj["cash"]

    backtest_obj["asset_max"] = max(backtest_obj["asset"], backtest_obj["asset_max"])
    backtest_obj["npv"] *= backtest_obj["asset"] / last_backtest["asset"]
    backtest_obj["yields"] = backtest_obj["npv"] - 1
    backtest_obj["drawdown_max"] = max(backtest_obj["drawdown_max"], backtest_obj["asset_max"] - backtest_obj["asset"])
    backtest_obj["drawdownrate_max"] = max(
        backtest_obj["drawdownrate_max"],
        (backtest_obj["asset_max"] - backtest_obj["asset"]) / backtest_obj["asset_max"],
    )

    return backtest_obj

def backtest(bars,city,model,myDict,trades,backtests):
    backtest = get_init_backtest()
    # 持仓信息
    position = None
    
    for bar in bars:
        # 股票代码
        secu_id = bar["code"]
        # 日期
        date = bar["date"]
        # 收盘价
        close_price = bar["close"]
        buy, sell = {}, {}
        signal = calc_signal(secu_id, date, model, myDict)
        
        trades['dates'].append(date)
        trades['prices'].append(close_price)
        
        # 根据策略判断买卖点
        if signal == 1:
#             if position:
#                 print('')
            if not position:
                trades['inDates'].append(date)
                buy = {
                    "secu_id": secu_id,
                    "date": date,
                    "size": 100,  # 一手100股
                    "price": close_price,
                    "volume": 0,  # 后面填充
                    "amount": 0,  # 后面填充
                }
        elif signal == -1 and position:
            trades['outDates'].append(date)
            sell = {
                "secu_id": secu_id,
                "date": date,
                "price": close_price,
                "volume": position["volume"],  # 数量
                "cost": position["price"],  # 成本，买入价格
            }
        last_backtest = backtest
        buy, sell, backtest = portfolio_trade(buy, sell, last_backtest)
#         if buy and buy["volume"]==0:
#             continue
            
        # 更新持仓信息
        if sell:
#             print('sell:',sell)
            position = None
        elif buy:
#             print('buy',buy['volume'],buy["price"])
            position = buy
        if position:
            position["current_price"] = close_price
            backtest = portfolio_backtest(last_backtest, position, backtest)
        
#         print(backtest)
        backtests.append(backtest)
        
def handleWeather(weather):#将具体天气转化为[rain,snow,cloud]
    state=[0,0,0]#雨、雪、云
    weather=weather.replace('~','')
    if '暴雪' in weather:
        state[0]=4
        state[2]=4
    elif '大雪' in weather:
        state[0]=3
        state[2]=4
    elif '中雪' in weather:
        state[0]=2
        state[2]=4
    elif '雪' in weather:
        state[0]=1
        state[2]=3

    if '暴雨' in weather:
        state[1]=4
        state[2]=4
    elif '大雨' in weather:
        state[1]=3
        state[3]=4
    elif '中雨' in weather:
        state[1]=2
        state[2]=4
    elif '雨' in weather:
        state[1]=1
        state[2]=3

    if state[2]==0:
        if '阴' in weather:
            state[2]=3 
        elif '多云' in weather:
            state[2]=2
        elif '少云' in weather:
            state[2]=1
    return state

def calc_signal(secu_id, date, model, myDict):
    """
    计算股票的买卖信号
    """
    test=[] #如果是历史数据，直接从csv文件获取训练数据过程中获得
            #如果是未来数据，从接口中获得
    if date not in myDict['date']:
        return 0
    i = myDict['date'].index(date)
    testData=[1,myDict['snow'][i],myDict['rain'][i],myDict['cloud'][i],
                myDict['maxTemp'][i],myDict['minTemp'][i],myDict['wind'][i]]
    if -100 in testData:
#         print(date+'的天气信息缺失')
        return 0
    else:
        test.append(testData)
    if i<len(myDict['date'])-1:
        testData=[1,myDict['snow'][i+1],myDict['rain'][i+1],myDict['cloud'][i+1],
                myDict['maxTemp'][i+1],myDict['minTemp'][i+1],myDict['wind'][i+1]]
        if -100 not in testData:
            test.append(testData)
    if len(test)==0:
        print('未能获取'+str(date)+'的天气信息')
        return 0  
    result=[]
    b=''
    inSignal=''
    outSignal=''
    for i in range(len(test)):
        a=model.predict(test[i])[0]
        b+='1' if a>=0 else '0' 
        inSignal+='1'
        outSignal+='0'
        result.append(a)
    if b==inSignal: #未来三天预测为涨，买入
        return 1
    elif b==outSignal: #未来三天预测为跌，卖出
        return -1
    else: 
        return 0    

    pass

def getModel(myDict):
    weatherList = ['snow', 'rain', 'cloud', 'maxTemp', 'minTemp', 'wind', ]# 城市天气
    label = 'ret'

    exam_df= pd.DataFrame(myDict)
    exam_df = exam_df[exam_df!=-100].dropna()

    x = exam_df[weatherList]
    y = exam_df[label]
    x=sm.add_constant(x) #添加常数项
    est=sm.OLS(y,x)
    model=est.fit()#建立最小二乘回归模型
    return model
    
backtestResultDict = {
    'stkcd':[],
    'result':[],
    'date':[],
    'asset':[],
    'price':[],
    'inDate':[],
    'outDate':[],} 
config = {
          'host':"localhost",
          'port':3306,
          'user':'root',
          'password':'123456',
          'database':'weather',
          'charset':'utf8mb4',
          'cursorclass':pymysql.cursors.Cursor,
          }
 
# 连接数据库
conn = pymysql.connect(**config)
# conn = pymysql.connect("localhost","root","123456","weather")
cursor = conn.cursor()

cursor.execute('select * from map_stkplace')
D = cursor.fetchall()
# for k in range(1):
for i in D:
#     i = D[0]
    stkcd=i[0]
    if stkcd in backtestResultDict['stkcd']:
        continue
    city=i[4]
    print(stkcd,city)
    if '省' in city:
        city=city[city.index('省')+1:]
    if '自治区' in city:
        city=city[city.index('自治区')+3:]
    city = city.replace('市','')
    
    myDict={'date':[], 'maxTemp':[], 'minTemp':[], 'wind':[],
            'snow':[], 'rain':[], 'cloud':[],
            'ret':[] }
    
    bars=[]
    begindate="20110101"
    enddate="20181231"
    try:
        stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date=begindate, end_date=enddate, adjust="")
    except:
        print(stkcd,'has no data')
        continue
    for i in range(1,len(stock_zh_a_hist_df)):
        bar={"code":stkcd,"date":stock_zh_a_hist_df['日期'].values[i],"close":float(stock_zh_a_hist_df['收盘'].values[i])}
        bars.append(bar)
        myDict['date'].append(stock_zh_a_hist_df['日期'].values[i])
        myDict['ret'].append(stock_zh_a_hist_df['涨跌幅'].values[i])
    if len(bars)==0:
        print(stkcd,'has no data')
        continue
        
    cursor.execute('select * from map_map where city="'+city+'"')
    C = cursor.fetchall()
    if len(C)==0:
        continue
    for info in C:
#         print(info[2],info[3]-273.15,info[4]-273.15,info[5],info[17],info[18],info[20])
        if info[2] in myDict['date']:
            myDict['maxTemp'].append(info[3]-273.15)
            myDict['minTemp'].append(info[4]-273.15)
            myDict['wind'].append(info[5])
            myDict['snow'].append(info[17])
            myDict['rain'].append(info[18])
            myDict['cloud'].append(info[20])
    model = getModel(myDict)
    trades={'dates':[],'inDates':[],'outDates':[],'prices':[]}
    backtests=[]
    backtest(bars,city,model,myDict,trades,backtests)
    
    backtestResultDict['stkcd'].append(stkcd)
    backtestResultDict['result'].append(round(backtests[len(backtests)-1]['asset'],1))
    backtestResultDict['date'].append('#'.join(trades['dates']))
    backtestResultDict['asset'].append('#'.join([str(round(x["asset"],1)) for x in backtests]))
    backtestResultDict['price'].append('#'.join([str(round(x,2)) for x in trades['prices']]))
    backtestResultDict['inDate'].append('#'.join(trades['inDates']))
    backtestResultDict['outDate'].append('#'.join(trades['outDates']))
    
    print(stkcd,round(backtests[len(backtests)-1]['asset'],1))
# backtestResultDf = pd.DataFrame(backtestResultDict)
# backtestResultDf.to_csv('/Users/rumeng/Downloads/qingzang/backtest.csv', encoding='utf-8-sig')
