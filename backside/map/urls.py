from django.conf.urls import url
from map import map
from map import sign_in_out
# from map.views import listmap


urlpatterns = [
    # url('map/',map.listInfo),
    url(r'^weather/(?P<district_id>\d+)$',map.weather),#获取实时天气与未来天气
    url(r'^stockInfo/(?P<stkcd>\d+)$',map.stockInfo),#股票代码对应的简称、行业、上市时间、市值等信息
    url(r'^stock/(?P<stkcd>\d+)$',map.stock),#获取实时股票信息
    url(r'^stock365/(?P<stkcd>\d+)$',map.stock365),#获取历史一年的股票价格
    url(r'^history/(?P<area>[\u4e00-\u9fa5]+)/(?P<label>\w+)/(?P<minvalue>-?\d+)/(?P<maxvalue>-?\d+)$',map.listInfo),
    url(r'^historyret/(?P<city>[\u4e00-\u9fa5]+)$',map.listRet),
    url(r'^datasource/(?P<area>[\u4e00-\u9fa5]+)$',map.getDataSource),
    url(r'^stockpredict$',map.stkLstm),#股票预测
    # url(r'^stock/(?P<stkcd>\d+)/(?P<begindate>\d+)/(?P<enddate>\d+)/(?P<name>[\u4e00-\u9fa5]+)/(?P<predictbegin>\d+)/(?P<predictend>\d+)$',map.stkLstm),

    url(r'^liststkdate/(?P<stkcd>\d+)$',map.listStkDate),
    # url(r'^weatherdistribution/(?P<city>[\u4e00-\u9fa5]+)/(?P<x>\w+)/(?P<y>\w+)$',map.listWeatherDistribution),
    # url(r'^weatherregression/(?P<city>[\u4e00-\u9fa5]+)$',map.listWeatherRegression),
    url(r'^weatherregression$',map.listWeatherRegression),

    url(r'^gettip$',map.getTip),#根据当前城市、天气，给出建议
    url('signin', sign_in_out.signin),
    url('signout', sign_in_out.signout),
]
