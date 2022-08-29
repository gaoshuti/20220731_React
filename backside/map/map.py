from django.http import JsonResponse
from map.models import map
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
def listInfo(request,city,name,minvalue,maxvalue):
  # 根据session判断用户是否登录
  if 'usertype' not in request.session:
    return JsonResponse({
      'ret': 302,
      'msg': '未登录',
      'redirect': '/map/sign.html'}, 
      status=302)
  # if request.session['usertype'] != 'mgr' :
  #   return JsonResponse({
  #     'ret': 302,
  #     'msg': '用户非mgr类型',
  #     'redirect': '/mgr/sign.html'} ,
  #     status=302)
  qs=map.objects.values()
  myDict={}
  below=0
  above=0
  # name=request.GET.get('name',default='snow')
  # value=request.GET.get('value',default='1')
  print(city,name,minvalue,maxvalue)
  # data = request.params['data']
  qs=qs.filter(city=city)
  
  if maxvalue=='-1':
    for i in range(len(qs)):
      if qs[i]['ret']<0:
        below+=1
      else:
        above+=1
    rate=below/above
    print('all  rate:',rate)
    length=100
    k=0
    while k<5:
      record = handleParam(qs,name,k,k)
      length = len(record)
      if length==0:
        k+=1
        continue
      myDict[k] = {'num':0,'above':0,'below':0}
      for i in range(length):
        info=record[i]
        myDict[k]['num']+=1
        if info['ret']<0:
          myDict[k]['below']+=1
        else:
          myDict[k]['above']+=1
      k+=1
    for i in myDict.keys():
      if myDict[i]['above']!=0:
        myDict[i]['below']/=(rate*myDict[i]['above'])
        myDict[i]['above']=1
      else:
        myDict[i]['below']=1
  else:
    record=handleParam(qs,name,minvalue,maxvalue)
    print(len(record))
    if len(record)!=0:
      for i in range(len(qs)):
        if qs[i]['ret']<0:
          below+=1
        else:
          above+=1
      print('below:',below,'above:',above)
      if above!=0:
        rate=below/above
      else:
        rate=1
    print('rate:',rate)
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
    for i in myDict.keys():
      if myDict[i]['above']!=0:
        myDict[i]['below']/=(rate*myDict[i]['above'])
        myDict[i]['above']=1
      else:
        myDict[i]['below']=1
    print(myDict)

  return JsonResponse({'ret': 0, 'num':len(record), 'data':myDict})

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

def listWeatherRegression(request,city):
  print('list weather regression:',city)
  myDict={}
  myInfo=regressionInfo(city)
  weatherList=['snow', 'rain', 'cloud', 'max', 'min', 'wind', 'tempDiff7', 'API', 'AQI']
  variableList=['ret(-1)', 'ris','smb','hml']
  label='tur'
  for w in weatherList:
    # score=myInfo.myRegression(variableList+[w], label)
    score=myInfo.myOLSRegression(variableList+[w], label)
    print(score)
    myDict[w]={'weights':myInfo.result[w],'score':score}
  # myDict={'weights':myInfo.result,'score':score}
  return JsonResponse({'ret': 0, 'data':myDict})


