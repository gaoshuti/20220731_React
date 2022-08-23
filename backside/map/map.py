from django.http import JsonResponse
from map.models import map
import json

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


