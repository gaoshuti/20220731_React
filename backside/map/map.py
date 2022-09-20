from webbrowser import get
from django.http import JsonResponse
from map.models import map,mapQuery,stkcdInCity,regQuery,predictModelPath
from map.stkLSTM import CgcpLSTM
from map.weatherRegression import regressionInfo
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from pandas import DataFrame

from chinese_calendar import is_workday
import json
import akshare as ak
import time
import datetime
import urllib.request
import urllib.error

def dispatcher(request):
  # 将请求参数统一放入request 的 params 属性中，方便后续处理

  # GET请求 参数在url中，同过request 对象的 GET属性获取
  if request.method == 'GET':
    request.params = request.GET

  # POST/PUT/DELETE 请求 参数 从 request 对象的 body 属性中获取
  elif request.method in ['POST','PUT','DELETE']:
    # 根据接口，POST/PUT/DELETE 请求的消息体都是 json格式
    request.params = json.loads(request.body)


  # 根据不同的action分派给不同的函数进行处理
  action = request.params['action']
  if action == 'list_info':
    return listInfo(request)
  # elif action == 'add_customer':
  #   return addcustomer(request)
  # elif action == 'modify_customer':
  #   return modifycustomer(request)
  # elif action == 'del_customer':
  #   return deletecustomer(request)

  else:
    return JsonResponse({'ret': 1, 'msg': '不支持该类型http请求'})
def handleParam(qs,name,minvalue,maxvalue):
  if name=='snow':
    record = qs.filter(snow__in=[minvalue,maxvalue])  
  elif name=='rain':
    record = qs.filter(rain__in=[minvalue,maxvalue])  
  elif name=='sand':
    record = qs.filter(sand__in=[minvalue,maxvalue])  
  elif name=='cloud':
    record = qs.filter(cloud__in=[minvalue,maxvalue])  
  elif name=='haze':
    record = qs.filter(haze__in=[minvalue,maxvalue])  
  elif name=='fog':
    record = qs.filter(fog__in=[minvalue,maxvalue])  
  elif name=='hail':
    record = qs.filter(hail__in=[minvalue,maxvalue])  
  elif name=='sun':
    record = qs.filter(sun__in=[minvalue,maxvalue])  
  return record

def getCities(name):
  cityInProvince = [
    ["北京市","北京"],
    ["上海市","上海"],
    ["天津市","天津"],
    ["重庆市","重庆"],
    ["安徽省","合肥","滁州","铜陵","芜湖"],
    ["福建省","福州","龙岩","泉州","厦门","漳州"],
    ["甘肃省","兰州"],
    ["广东省","广州","潮州","东莞","佛山","惠州","江门","揭阳","梅州","汕头","深圳","肇庆","珠海"],
    ["广西省","南宁","桂林","柳州"],
    ["贵州省","贵阳"],
    ["海南省","海口"],
    ["河北省","石家庄","保定","唐山"],
    ["河南省","郑州","焦作","洛阳","南阳","新乡","许昌"],
    ["黑龙江省","哈尔滨"],
    ["湖北省","武汉","荆门","襄阳","宜昌"],
    ["湖南省","长沙","衡阳","益阳","岳阳","株洲"],
    ["江苏省","南京","常州","连云港","南通","苏州","宿迁","泰州","无锡","徐州","盐城","扬州","镇江"],
    ["江西省","南昌","赣州"],
    ["吉林省","长春","吉林"],
    ["辽宁省","沈阳","鞍山","大连"],
    ["内蒙古","呼和浩特","包头"],
    ["宁夏","银川"],
    ["青海省","西宁"],
    ["山东省","济南","滨州","德州","济宁","青岛","威海","潍坊","烟台","淄博"],
    ["山西省","太原"],
    ["陕西省","西安","宝鸡"],
    ["四川省","成都","德阳","乐山","绵阳"],
    ["西藏","拉萨"],
    ["新疆","乌鲁木齐"],
    ["云南省","昆明"],
    ["浙江省","杭州","湖州","嘉兴","金华","宁波","衢州","绍兴","台州","温州"]
  ]
  provinces=[]
  cities=[]
  if name == "": return []
  if (name.endswith("地区")):
    if (name == "东北地区"): provinces=["黑龙江省", "吉林省", "辽宁省"]
    elif (name == "华北地区"):
      provinces= ["北京市", "天津市", "河北省", "山西省", "内蒙古"]
    elif (name == "华中地区"): provinces= ["河南省", "湖北省", "湖南省"]
    elif (name == "华东地区"):
      provinces= [
        "山东省",
        "江苏省",
        "安徽省",
        "上海市",
        "浙江省",
        "江西省",
        "福建省",
        "台湾",
      ]
    elif (name == "华南地区"):
      provinces= ["广东省", "广西省", "海南省", "香港", "澳门"]
    elif (name == "西北地区"):
      provinces= ["陕西省", "甘肃省", "宁夏", "青海省", "新疆"]
    elif (name == "西南地区"):
      provinces= ["四川省", "贵州省", "云南省", "重庆市", "西藏"]
    else: provinces=[]
  else:
    for i in range(len(cityInProvince)):
      if(name==cityInProvince[i][0]):
        provinces=[name]
        return [name]+cityInProvince[i][1:]
    return [name,name]

  for k in range(len(provinces)):
    province=provinces[k]
    for i in range(len(cityInProvince)):
      if(province==cityInProvince[i][0]):
        cities=cities+cityInProvince[i][1:]
        break
  return [name]+cities
def getDataSource(request,area):
  print('get stkcd in city')
  # qs2 = mapQuery.objects.values()
  qs2 = mapQuery.objects.values().filter(area=area)
  if len(qs2)==0:
    cities=getCities(area)
    print(cities)
  else:
    cities = qs2[0]['cities'].split('#')
  if len(cities)==0:
    return JsonResponse({'ret': 1, 'msg': '请检查该地区是否含有数据'})
  qs = stkcdInCity.objects.values()
  myDict = {}
  for city in cities:
    record = qs.filter(city=city)
    if len(record)==0:
      print('no data in',city)
      continue
    # stkcd = qs[0]['stkcd']
    myDict[city]=record[0]['stkcd']
    if len(myDict)==0:
      return JsonResponse({'ret': 1, 'msg': '请检查该地区是否含有数据'})
  return JsonResponse({'ret': 0,'data':myDict})
def listInfo(request,area,label,minvalue,maxvalue):
  print(area,label,minvalue,maxvalue)
  myDict={}
  conditions={
    'area':area,
    'label':label
  }
  cities=[]
  if maxvalue=='-1':
    qs2 = mapQuery.objects.values()
    qs2 =qs2.filter(**conditions)
    if len(qs2)!=0:
      print('has data')
      cities=qs2[0]['cities']
      myDict['all']={'num':qs2[0]['num'],'above':qs2[0]['aboveNum'],'below':qs2[0]['belowNum']}
      myDict['0']={'num':qs2[0]['num0'],'above':qs2[0]['aboveNum0'],'below':qs2[0]['belowNum0']}
      myDict['1']={'num':qs2[0]['num1'],'above':qs2[0]['aboveNum1'],'below':qs2[0]['belowNum1']}
      myDict['2']={'num':qs2[0]['num2'],'above':qs2[0]['aboveNum2'],'below':qs2[0]['belowNum2']}
      myDict['3']={'num':qs2[0]['num3'],'above':qs2[0]['aboveNum3'],'below':qs2[0]['belowNum3']}
      myDict['4']={'num':qs2[0]['num4'],'above':qs2[0]['aboveNum4'],'below':qs2[0]['belowNum4']}
      return JsonResponse({'ret': 0, 'cities':cities, 'data':myDict})
    else:
      print('no data')
      qs=map.objects.values()
      below=0
      above=0
      cities=getCities(area)
      # for city in cities:
      qs=qs.filter(city__in=cities)
      for i in range(len(qs)):
        if qs[i]['ret']<0:
          below+=1
        else:
          above+=1
      myDict['all']={'num':above+below,'above':above,'below':below}
      length=100
      for i in range(5):
        myDict[i] = {'num':0,'above':0,'below':0}
      k=0
      while k<5:
        record = handleParam(qs,label,k,k)
        length = len(record)
        if length==0:
          k+=1
          continue
        for i in range(length):
          info=record[i]
          myDict[k]['num']+=1
          if info['ret']<0:
            myDict[k]['below']+=1
          else:
            myDict[k]['above']+=1
        k+=1
      record = mapQuery.objects.create(area=area, label=label, cities='#'.join(cities),
        num=myDict['all']['num'], aboveNum=myDict['all']['above'], belowNum=myDict['all']['below'],
        num0=myDict[0]['num'], aboveNum0=myDict[0]['above'], belowNum0=myDict[0]['below'],
        num1=myDict[1]['num'], aboveNum1=myDict[1]['above'], belowNum1=myDict[1]['below'],
        num2=myDict[2]['num'], aboveNum2=myDict[2]['above'], belowNum2=myDict[2]['below'],
        num3=myDict[3]['num'], aboveNum3=myDict[3]['above'], belowNum3=myDict[3]['below'],
        num4=myDict[4]['num'], aboveNum4=myDict[4]['above'], belowNum4=myDict[4]['below'],)
  else:
    qs=map.objects.values()
    below=0
    above=0
    qs=qs.filter(city=area)
    record=handleParam(qs,label,minvalue,maxvalue)
    print(len(record))
    if len(record)!=0:
      for i in range(len(qs)):
        if qs[i]['ret']<0:
          below+=1
        else:
          above+=1
      print('below:',below,'above:',above)
      myDict['all']={'num':above+below,'above':above,'below':below}
      # if above!=0:
      #   rate=below/above
      # else:
      #   rate=1
    # print('rate:',rate)
    for i in range(len(record)):
      info=record[i]
      year=info['date'][:4]
      if year not in myDict.keys():
        myDict[year]={'num':0,'above':0,'below':0}
      myDict[year]['num']+=1
      if info['ret']<0:
        myDict[year]['below']+=1
      else:
        myDict[year]['above']+=1
    # for i in myDict.keys():
    #   if myDict[i]['above']!=0:
    #     myDict[i]['below']/=(rate*myDict[i]['above'])
    #     myDict[i]['above']=1
    #   else:
    #     myDict[i]['below']=1
    print(myDict)

  return JsonResponse({'ret': 0, 'cities':'#'.join(cities) ,'data':myDict})
def listRet(request,city):
  print('list ret')
  qs=map.objects.values()
  record = qs.filter(city=city)
  myDict={'date':[],'ret':[]}
  for i in range(len(record)):
    if record[i]['ret']==-100:
      continue
    myDict['date'].append(record[i]['date'])
    myDict['ret'].append(record[i]['ret'])
  return JsonResponse({'ret': 0, 'data':myDict})

def listStkDate(request,stkcd):
  pmp = predictModelPath.objects.values().filter(stkcd=stkcd)
  if len(pmp)==0:
    return JsonResponse({'ret': 1, 'msg': 'not have model'})
  else: 
    # T = time.localtime(time.time())
    # enddate=str(T.tm_year)+'0'+str(T.tm_mon) if T.tm_mon<10 else str(T.tm_year)+str(T.tm_mon)
    # enddate=str(enddate)+'0'+str(T.tm_mday) if T.tm_mday<10 else str(enddate)+str(T.tm_mday)
    
    T = datetime.datetime.now()
    enddate = T.strftime('%Y-%m-%d')
    # thisweek = str(int(T.tm_wday) + 1)
    # if thisweek=='6':
    #   T += datetime.timedelta(days=2)
    # elif thisweek=='7':
    #   T += datetime.timedelta(days=2) 
    # # T = time.localtime(time.time())
    # print(T)
    stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date='20000101', end_date=enddate, adjust="")
    begindate = stock_zh_a_hist_df['日期'].values[0].replace('-','')
    enddate = stock_zh_a_hist_df['日期'].values[len(stock_zh_a_hist_df)-1].replace('-','')
    print(stkcd,begindate,enddate)
    myDict={'begindate':begindate,'enddate':enddate}
  return JsonResponse({'ret': 0, 'data':myDict})

def weather(request,district_id): #获取实时天气与未来天气
  print('weather:',district_id)
  url = 'https://api.map.baidu.com/weather/v1/?district_id='+district_id+'&data_type=all&ak=z29V2EL1hlYaD0XOXOp1xmq3DM9sjtCW'
  try:
    request = urllib.request.Request(url)
    response = urllib.request.urlopen(request)
  except urllib.request.HTTPError as error:    # HTTP错误
    print('HTTPError')
    print('ErrorCode: %s' % error.code)
  except urllib.request.URLError as error:     # URL错误
      print(error.reason)
  html = response.read().decode('utf-8')
  # print(html)
  html=eval(html)
  for i in html.keys():
      print(i)

  myDict={}
  myDict['city']=html['result']['location']['city']
  myDict['now']={
      'text':html['result']['now']['text'],
      'temp':html['result']['now']['temp'],
      'wind_class':html['result']['now']['wind_class'],
      'wind_dir':html['result']['now']['wind_dir']
  }
  myDict['day']=[]
  for i in range(3):
      dayInfo=html['result']['forecasts'][i]
      myDict['day'].append(
        {
          'date':dayInfo['date'],
          'text':dayInfo['text_day'],
          'high':dayInfo['high'],
          'low':dayInfo['low'],
          'wind_class':dayInfo['wc_day'],
          'wind_dir':dayInfo['wd_day'],
          'week':dayInfo['week']
        }
      )
  print(myDict)
  return JsonResponse({'ret': 0, 'data':myDict})

def stock365(request,stkcd):
  print('history 30:', stkcd)
  myDict = {}
  stock_individual_info_em_df = ak.stock_individual_info_em(symbol=stkcd)
  myDict['name'] = stock_individual_info_em_df['value'].values[5]#股票简称
  myDict['industry'] = stock_individual_info_em_df['value'].values[2]#行业
  myDict['TTM'] = stock_individual_info_em_df['value'].values[3]#上市时间
  myDict['MarCap'] = stock_individual_info_em_df['value'].values[0]#总市值
  myDict['tradedCap'] = stock_individual_info_em_df['value'].values[1]#流通市值
  myDict['stkIssue'] = stock_individual_info_em_df['value'].values[6]#总股本
  myDict['tradedIssue'] = stock_individual_info_em_df['value'].values[7]#流通股
  myDict['data'] = []
  T1 = datetime.datetime.now()
  T1 = T1-datetime.timedelta(days=1)
  T2 = T1-datetime.timedelta(days=365)
  stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date=T2.strftime('%Y%m%d'), end_date=T1.strftime('%Y%m%d'), adjust="")
  print(stock_zh_a_hist_df.iloc[0]) 
  # stock_zh_a_hist_min_em_df = ak.stock_zh_a_hist_min_em(symbol=stkcd, start_date=T2.strftime('%Y-%m-%d %H:%M:%S'), end_date=T1.strftime('%Y-%m-%d %H:%M:%S'), period='1', adjust='')
  for i in range(len(stock_zh_a_hist_df)):
    a=list(stock_zh_a_hist_df.iloc[i])
    a[5]=int(a[5])
    myDict['data'].append(a)
  return JsonResponse({'ret': 0, 'data':myDict})


def stock(request,stkcd):
  print('real stock:', stkcd)
  myDict = {}
  stock_individual_info_em_df = ak.stock_individual_info_em(symbol=stkcd)
  myDict['name'] = stock_individual_info_em_df['value'].values[5]#股票简称
  myDict['industry'] = stock_individual_info_em_df['value'].values[2]#行业
  myDict['TTM'] = stock_individual_info_em_df['value'].values[3]#上市时间
  myDict['MarCap'] = stock_individual_info_em_df['value'].values[0]#总市值
  myDict['tradedCap'] = stock_individual_info_em_df['value'].values[1]#流通市值
  myDict['stkIssue'] = stock_individual_info_em_df['value'].values[6]#总股本
  myDict['tradedIssue'] = stock_individual_info_em_df['value'].values[7]#流通股

  myDict['data'] = []
  T1 = datetime.datetime.now()
  # T2 = T1-datetime.timedelta(days=7)
  T2 = datetime.date(T1.year,T1.month,T1.day)
  # print('时间：(%Y-%m-%d %H:%M:%S %f): ' , T1.strftime( '%Y-%m-%d %H:%M:%S %f' ) ) 
  # print('时间：(%Y-%m-%d %H:%M:%S %p): ' , T1.strftime( '%y-%m-%d %I:%M:%S %p' ))
  stock_zh_a_hist_min_em_df = ak.stock_zh_a_hist_min_em(symbol=stkcd, start_date=T2.strftime('%Y-%m-%d %H:%M:%S'), end_date=T1.strftime('%Y-%m-%d %H:%M:%S'), period='1', adjust='')
  for i in range(len(stock_zh_a_hist_min_em_df)):
    a=list(stock_zh_a_hist_min_em_df.iloc[i])
    a[5]=int(a[5])
    myDict['data'].append(a)
  return JsonResponse({'ret': 0, 'data':myDict})


def LSTMpredict(model,data):
  continuous_sample_point_num = 20
  sc = MinMaxScaler(feature_range=(0, 1))

  if isinstance(data, list):
      data_array = np.array(data)
  elif isinstance(data, np.ndarray):
      data_array = data
  else:
      raise Exception("数据格式错误")

  # 对一维数据进行升维处理
  if len(data_array.shape) == 1:
    # history_data_array = history_data_array.reshape(1, continuous_sample_point_num)
    data_array = data_array.reshape(data_array.shape[0], 1)

  # 对数据形状进行效验
  if data_array.shape[1] != 1:
    raise Exception("数据形状有误")

  # 求得训练集的最大值，最小值这些训练集固有的属性，并在训练集上进行归一化
  train_set_scaled = sc.fit_transform(data_array)
  # 利用训练集的属性对测试集进行归一化
  data_array = sc.transform(data_array)

  test=[]
  for i in range(continuous_sample_point_num, len(data_array)+1):
    test.append(data_array[i - continuous_sample_point_num:i, 0])
  test=np.array(test)
  test = np.reshape(test, (test.shape[0], continuous_sample_point_num, 1))
  
  predicted_stock_price = model.predict(test)
  predicted_stock_price = sc.inverse_transform(predicted_stock_price)
  # real = sc.inverse_transform(real)
  result=[]
  for i in predicted_stock_price:
    result.append(str(i[0]))
  print(result)
  return result
def stkLstm(request):
  stkcd=request.POST.get('stkcd',default='1')
  begindate=request.POST.get('begindate',default='1')
  enddate=request.POST.get('enddate',default='1')
  name='收盘'
  print('LSTM begin',stkcd,begindate,enddate,name)
  
  pmp = predictModelPath.objects.values().filter(stkcd=stkcd)
  if len(pmp)!=0:
    path = pmp[0]['path']
    try:
      new_model = load_model(path)
    except IOError:
      print('load error')
      return JsonResponse({'ret': 1, 'msg': 'load error'})
    data = []
    dates = []

    T = datetime.datetime(int(begindate[:4]),int(begindate[4:6]),int(begindate[6:8]))
    T -= datetime.timedelta(days=60)
    # enddate2 = str(T.year)+'0'+str(T.month) if T.month<10 else str(T.year)+str(T.month)
    # enddate2 = enddate2+'0'+str(T.day) if T.day < 10 else enddate2+str(T.day)
    enddate2 = T.strftime('%Y-%m-%d')
    stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date=enddate2, end_date=begindate, adjust="")
    print(len(stock_zh_a_hist_df))
    if len(stock_zh_a_hist_df)<20:
      return JsonResponse({'ret':1,'msg':'选择时间段前数据不满20，不足以训练'})
    for i in range(len(stock_zh_a_hist_df)-20,len(stock_zh_a_hist_df)):
      data.append(stock_zh_a_hist_df[name].values[i])
      dates.append(stock_zh_a_hist_df['日期'].values[i])

    stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date=begindate, end_date=enddate, adjust="")
    print(len(stock_zh_a_hist_df))
    for i in stock_zh_a_hist_df[name].values:
      data.append(i)
    for i in stock_zh_a_hist_df['日期'].values:
      dates.append(i)
    predict = LSTMpredict(new_model,data)

    T = datetime.datetime(int(enddate[:4]),int(enddate[4:6]),int(enddate[6:8]))
    T += datetime.timedelta(days=1)
    while is_workday(T.date())==False:
      T+=datetime.timedelta(days=1)
    dates.append(str(T.date()))
    myDict={'num':len(data)-20, 'date': dates[20:], 'predict':predict,'real':[str(x) for x in data[20:]]}
    print(len(myDict['predict']),len(myDict['real']),len(myDict['date']))
    return JsonResponse({'ret': 0, 'data':myDict})
  else:
    return JsonResponse({'ret': 1, 'msg': 'have no model'})

def stkLstm2(request,stkcd,begindate,enddate,name,predictbegin,predictend):
  print('LSTM begin',stkcd,begindate,enddate,name)
  try:
    new_model = load_model('/Users/rumeng/testModel/'+stkcd+'_'+begindate+'_'+enddate)
  except IOError:
    print('model not exist')
    data = []
    stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date=begindate, end_date=enddate, adjust="")
    for i in stock_zh_a_hist_df[name].values:
      data.append(i)
    print('总长：',len(data))
    data_list = data 
    # 初始化模型
    model = CgcpLSTM(name="股价预测")
    # 获取训练和测试的相关参数
    train_set, test_set, x_train, y_train, x_test, y_test = model.make_x_y_train_and_test(data_list=data_list)
    # 训练模型
    model.train(x_train, y_train, x_test, y_test)
    new_model = model.model
    new_model.save('/Users/rumeng/testModel/'+stkcd+'_'+begindate+'_'+enddate,save_format="h5")
  data = []
  stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date=predictbegin, end_date=predictend, adjust="")
  for i in stock_zh_a_hist_df[name].values:
    data.append(i)
  predict = LSTMpredict(new_model,data)
  myDict={'num':len(data)-20,'predict':predict,'real':[str(x) for x in data[20:]]}
  print(len(myDict['predict']),len(myDict['real']))
  return JsonResponse({'ret': 0, 'data':myDict})

def listWeatherDistribution(request,city,x,y):
  print('list weather distribution:',city)
  qs=map.objects.values()
  record = qs.filter(city=city)
  myDict={x:[],y:[]}
  for i in range(len(record)):
    myDict[x].append(record[i][x])
    myDict[y].append(record[i][y])
  dataDf = DataFrame(myDict)
  dataDf = dataDf[dataDf!=-100].dropna()
  return JsonResponse({'ret': 0, 'data':{x:list(dataDf[x]),y:list(dataDf[y])}})
def handleTemp(x):
  return x-273.15
def listWeatherRegression(request):
  print('list weather regression')
  T1=time.time()
  # 获取传入数据
  label=request.POST.get('label',default='1')
  model=request.POST.get('model',default='1')
  weatherList=request.POST.get('weather',default='1').split('#')
  area=request.POST.get('area',default='1').split('#')
  print(label,model,weatherList,area)

  myDict={}
  # 控制变量内容
  if label=='tur':
    variableList=['propertion','MarCap','tur(-1)','ret(-1)','ret']
  elif label=='ret':
    variableList=['ret(-1)', 'ris','smb','hml']
  else:
    return JsonResponse({'ret': 1, 'msg': 'label数据错误'})
  
  # 查表
  rq = regQuery.objects.values()
  # 获取城市名单
  cities = []
  rqCities = rq.filter(area=area)
  if len(rqCities)!=0:
    cities = rqCities[0]['cities'].split('#')
  else:
    for name in area:
      cities=cities+getCities(name)[1:]
  myDict['cities']=cities

  # 分布图
  myInfo=regressionInfo(cities)
  for i in weatherList:
    myDict[i]={}
    myDf = myInfo.dataDf[[i,label]]
    myDf = myDf[myDf!=-100].dropna()
    myDict[i][0]=list(myDf[i])
    if i=='min' or i=='max':
      myDict[i][0] = [i-273.15 for i in myDict[i][0]]
    myDict[i][1] = list(myDf[label])

  # 查看是否具有所有查询区域的总数据
  myDict['all']={}
  print('all')
  # flag1=False
  for weather in weatherList:
    print(weather)
    myDict['all'][weather]={}
    conditions={
      'area': '#'.join(area),
      'label': label,
      'model': model,
      'weather': weather
    }
    rqall = rq.filter(**conditions)
    if len(rqall)!=0:
      myDict['all'][weather]['weights']=rqall[0]['weights']
      myDict['all'][weather]['score']=rqall[0]['score']
      myDict['all'][weather]['num']=rqall[0]['num']
    else:
      print('no data')
      if model=='linear':
        score,num=myInfo.myRegression([weather]+variableList, label)
        print(score,num)
        myDict['all'][weather]={'weights':myInfo.result[weather],'score':score,'num':num}
      elif model=='OLS':
        score,num=myInfo.myOLSRegression([weather]+variableList, label)
        print(score,num)
        myDict['all'][weather]={'weights':myInfo.result[weather],'score':score,'num':num}
      else:
        return JsonResponse({'ret': 1, 'msg': 'model数据错误'})
      regQuery.objects.create(
        area='#'.join(area), label=label, cities='#'.join(cities),
        weather=weather,model=model,weights=myInfo.result[weather],
        score=score,num=num)
  # 单个城市的回归
  if len(cities)==1:
    return JsonResponse({'ret': 0, 'data':myDict})
  for city in cities:
    print(city)
    myDict[city]={}
    flag1=False
    for weather in weatherList:
      conditions={
        'area': city,
        'label': label,
        'model': model,
        'weather': weather
      }
      rqone = rq.filter(**conditions)
      if len(rqone)!=0:
        myDict[city][weather]={'weights':rqone[0]['weights'],'score':rqone[0]['score'],'num':rqone[0]['num']}
      else:
        print('no data')
        if flag1==False:
          myInfo=regressionInfo(city)
          flag1=True
        if model=='linear':
          score,num=myInfo.myRegression([weather]+variableList, label)
          print(score,num)
          myDict[city][weather]={'weights':myInfo.result[weather],'score':score,'num':num}
        elif model=='OLS':
          score,num=myInfo.myOLSRegression([weather]+variableList, label)
          print(score,num)
          myDict[city][weather]={'weights':myInfo.result[weather],'score':score,'num':num}
        else:
          return JsonResponse({'ret': 1, 'msg': 'model数据错误'})
        record = regQuery.objects.create(
          area=city, label=label, cities=city,
          weather=weather,model=model,weights=myInfo.result[weather],
          score=score,num=num)
  T2=time.time()
  print('用时：',T2-T1)
  return JsonResponse({'ret': 0, 'data':myDict})


  # 根据session判断用户是否登录
  # if 'usertype' not in request.session:
  #   return JsonResponse({
  #     'ret': 302,
  #     'msg': '未登录',
  #     'redirect': '/map/sign.html'}, 
  #     status=302)
  # if request.session['usertype'] != 'mgr' :
  #   return JsonResponse({
  #     'ret': 302,
  #     'msg': '用户非mgr类型',
  #     'redirect': '/mgr/sign.html'} ,
  #     status=302)

    # name=request.GET.get('name',default='snow')
  # value=request.GET.get('value',default='1')
  # data = request.params['data']
