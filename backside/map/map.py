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
  if action == 'list_customer':
    return listcustomers(request)
  elif action == 'add_customer':
    return addcustomer(request)
  elif action == 'modify_customer':
    return modifycustomer(request)
  elif action == 'del_customer':
    return deletecustomer(request)

  else:
    return JsonResponse({'ret': 1, 'msg': '不支持该类型http请求'})

def listInfo(request):
  qs=map.objects.values()
  retlist=list(qs)
  return JsonResponse({'ret':0, 'retlist':retlist})

