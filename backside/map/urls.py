from django.conf.urls import url
from map import map
from map import sign_in_out
# from map.views import listmap


urlpatterns = [
    # url('map/',map.listInfo),
    url(r'^map/(?P<city>[\u4e00-\u9fa5]+)/(?P<name>\w+)/(?P<minvalue>-?\d+)/(?P<maxvalue>-?\d+)$',map.listInfo),
    url('signin', sign_in_out.signin),
    url('signout', sign_in_out.signout),
]
