from webbrowser import get
from django.http import JsonResponse
from map.models import map,mapQuery,stkcdInCity
from map.stkLSTM import CgcpLSTM
from map.weatherRegression import regressionInfo
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from pandas import DataFrame

import json
import akshare as ak



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
  stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date='20000101', end_date='20220822', adjust="")

  begindate = stock_zh_a_hist_df['日期'].values[0].replace('-','')
  enddate = stock_zh_a_hist_df['日期'].values[len(stock_zh_a_hist_df)-1].replace('-','')
  print(stkcd,begindate,enddate)
  myDict={'begindate':begindate,'enddate':enddate}
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
def stkLstm(request,stkcd,begindate,enddate,name,predictbegin,predictend):
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
  label=request.POST.get('label',default='1')
  model=request.POST.get('model',default='1')
  weatherList=request.POST.get('weather',default='1').split('#')
  area=request.POST.get('area',default='1').split('#')
  print(label,model,weatherList,area)
  cities = []
  for name in area:
    cities=cities+getCities(name)[1:]
  myDict={}
  myDict['cities']=cities
  myInfo=regressionInfo(cities)
  # 分布图
  # myDf = myInfo.dataDf[weatherList+[label]]
  # myDf = myDf[myDf!=-100].dropna()
  for i in weatherList:
    myDict[i]={}
    myDf = myInfo.dataDf[[i,label]]
    myDf = myDf[myDf!=-100].dropna()
    myDict[i][0]=list(myDf[i])
    if i=='min' or i=='max':
      myDict[i][0] = [i-273.15 for i in myDict[i][0]]
    myDict[i][1] = list(myDf[label])
    # myDict[i]=list(myDf[i])
  # 所有城市数据的回归
  myDict['all']={}
  if label=='tur':
    variableList=['propertion','MarCap','tur(-1)','ret(-1)','ret']
  elif label=='ret':
    variableList=['ret(-1)', 'ris','smb','hml']
  else:
    return JsonResponse({'ret': 1, 'msg': 'label数据错误'})
  
  if model=='linear':
    for w in weatherList:
      score,num=myInfo.myRegression([w]+variableList, label)
      print(score,num)
      myDict['all'][w]={'weights':myInfo.result[w],'score':score}
  elif model=='OLS':
    for w in weatherList:
      score,num=myInfo.myOLSRegression([w]+variableList, label)
      print(score,num)
      myDict['all'][w]={'weights':myInfo.result[w],'score':score}
  else:
    return JsonResponse({'ret': 1, 'msg': 'model数据错误'})
  # myDict['all']={'weights':myInfo.result,'score':score}
  # 单个城市的回归
  if len(cities)==1:
    return JsonResponse({'ret': 0, 'data':myDict})
  for city in cities:
    myInfo=regressionInfo(city)
    myDict[city]={}
    if label=='tur':
      variableList=['propertion','MarCap','tur(-1)','ret(-1)','ret']
    elif label=='ret':
      variableList=['ret(-1)', 'ris','smb','hml']
    else:
      return JsonResponse({'ret': 1, 'msg': 'label数据错误'})
    
    if model=='linear':
      for w in weatherList:
        score,num=myInfo.myRegression([w]+variableList, label)
        print(score,num)
        myDict[city][w]={'weights':myInfo.result[w],'score':score,'num':num}
    elif model=='OLS':
      for w in weatherList:
        score,num=myInfo.myOLSRegression([w]+variableList, label)
        print(score,num)
        myDict[city][w]={'weights':myInfo.result[w],'score':score,'num':num}
    else:
      return JsonResponse({'ret': 1, 'msg': 'model数据错误'})
    # myDict[city]={'weights':myInfo.result,'score':score,'num':num}
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
