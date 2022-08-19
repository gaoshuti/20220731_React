from django.conf.urls import url


from map import map

urlpatterns = [
    
    url('map/',map.dispatcher),
]
