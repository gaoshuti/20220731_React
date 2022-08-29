from http.client import HTTPResponse
from django.shortcuts import render
from django.http import HttpResponse

from map.models import map

def listmap(request):

  qs=map.objects.values()
  ph = request.GET.get('snow', None)
  if ph:
    qs = qs.filter(snow=ph)
  resStr=''
  for i in range(2):
    info=qs[i]
  # for info in qs:
    for name,value in info.items():
      resStr+=f'{name} : {value} |'
    resStr+='<br>'
  return HttpResponse(resStr)



