from django.conf.urls import url
from map import map
from map import sign_in_out
# from map.views import listmap


urlpatterns = [
    # url('map/',map.listInfo),
    url(r'^history/(?P<area>[\u4e00-\u9fa5]+)/(?P<label>\w+)/(?P<minvalue>-?\d+)/(?P<maxvalue>-?\d+)$',map.listInfo),
    url(r'^historyret/(?P<city>[\u4e00-\u9fa5]+)/(?P<begindate>\d+)/(?P<enddate>\d+)$',map.listRet),
    url(r'^stkcdincity/(?P<city>[\u4e00-\u9fa5]+)$',map.getStkcdInCity),
    url(r'^stock/(?P<stkcd>\d+)/(?P<begindate>\d+)/(?P<enddate>\d+)/(?P<name>[\u4e00-\u9fa5]+)/(?P<predictbegin>\d+)/(?P<predictend>\d+)$',map.stkLstm),
    url(r'^liststkdate/(?P<stkcd>\d+)$',map.listStkDate),
    url(r'^weatherdistribution/(?P<city>[\u4e00-\u9fa5]+)/(?P<x>\w+)/(?P<y>\w+)$',map.listWeatherDistribution),
    url(r'^weatherregression/(?P<city>[\u4e00-\u9fa5]+)$',map.listWeatherRegression),
    url('signin', sign_in_out.signin),
    url('signout', sign_in_out.signout),
]
