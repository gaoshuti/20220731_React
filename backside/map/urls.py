from django.urls import re_path
from map import map
from map import sign_in_out
# from map.views import listmap


urlpatterns = [
    # url('map/',map.listInfo),
    re_path(r'^weather/(?P<city>[\u4e00-\u9fa5]+)$',map.weather),#获取实时天气与未来天气
    re_path(r'^stockInfo/(?P<stkcd>\d+)$',map.stockInfo),#股票代码对应的简称、行业、上市时间、市值等信息
    re_path(r'^stock/(?P<stkcd>\d+)$',map.stock),#获取实时股票信息
    re_path(r'^stock365/(?P<stkcd>\d+)$',map.stock365),#获取历史一年的股票价格
    re_path(r'^history/(?P<area>[\u4e00-\u9fa5]+)/(?P<label>\w+)/(?P<minvalue>-?\d+)/(?P<maxvalue>-?\d+)$',map.listInfo),
    re_path(r'^historyret/(?P<city>[\u4e00-\u9fa5]+)$',map.listRet),
    re_path(r'^datasource/(?P<area>[\u4e00-\u9fa5]+)$',map.getDataSource),
    re_path(r'^stockpredict$',map.stkLstm),#股票预测
    # re_path(r'^stock/(?P<stkcd>\d+)/(?P<begindate>\d+)/(?P<enddate>\d+)/(?P<name>[\u4e00-\u9fa5]+)/(?P<predictbegin>\d+)/(?P<predictend>\d+)$',map.stkLstm),

    re_path(r'^liststkdate/(?P<stkcd>\d+)$',map.listStkDate),
    # re_path(r'^weatherdistribution/(?P<city>[\u4e00-\u9fa5]+)/(?P<x>\w+)/(?P<y>\w+)$',map.listWeatherDistribution),
    # re_path(r'^weatherregression/(?P<city>[\u4e00-\u9fa5]+)$',map.listWeatherRegression),
    re_path(r'^weatherregression$',map.listWeatherRegression),

    re_path(r'^gettip$',map.getTip),#根据当前城市、天气，给出建议

    re_path(r'^backtestresult/(?P<stkcd>\d+)$',map.getBacktestResult),#给出某只股票回测的结果
    re_path(r'^inout/(?P<stkcd>\d+)/(?P<city>[\u4e00-\u9fa5]+)$',map.predictInOut),#根据策略预测今日应买/卖/不变
    re_path(r'^inout2/(?P<city>[\u4e00-\u9fa5]+)$',map.predictInOut2),#根据策略预测今日应买/卖/不变
    
    re_path('signin', sign_in_out.signin),
    re_path('signout', sign_in_out.signout),
]
