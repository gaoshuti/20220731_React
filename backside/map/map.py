from webbrowser import get
from django.http import JsonResponse
from map.models import map,mapQuery,stkcdInCity,regQuery,predictModelPath,stkPlace
from map.stkLSTM import CgcpLSTM
from map.weatherRegression import regressionInfo
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from pandas import DataFrame

import math
from chinese_calendar import is_workday
import json
import akshare as ak
import time
import datetime
import urllib.request
import urllib.error

city2DistrictId={'北京市': 110100, '天津市': 120100, '石家庄市': 130100, '唐山市': 130200, '秦皇岛市': 130300, '邯郸市': 130400, '邢台市': 130500, '保定市': 130600, '张家口市': 130700, '承德市': 130800, '沧州市': 130900, '廊坊市': 131000, '衡水市': 131100, '太原市': 140100, '大同市': 140200, '阳泉市': 140300, '长治市': 140400, '晋城市': 140500, '朔州市': 140600, '晋中市': 140700, '运城市': 140800, '忻州市': 140900, '临汾市': 141000, '吕梁市': 141100, '呼和浩特市': 150100, '包头市': 150200, '乌海市': 150300, '赤峰市': 150400, '通辽市': 150500, '鄂尔多斯市': 150600, '呼伦贝尔市': 150700, '巴彦淖尔市': 150800, '乌兰察布市': 150900, '兴安盟': 152200, '锡林郭勒盟': 152500, '阿拉善盟': 152900, '沈阳市': 210100, '大连市': 210200, '鞍山市': 210300, '抚顺市': 210400, '本溪市': 210500, '丹东市': 210600, '锦州市': 210700, '营口市': 210800, '阜新市': 210900, '辽阳市': 211000, '盘锦市': 211100, '铁岭市': 211200, '朝阳市': 211300, '葫芦岛市': 211400, '长春市': 220100, '吉林市': 220200, '四平市': 220300, '辽源市': 220400, '通化市': 220500, '白山市': 220600, '松原市': 220700, '白城市': 220800, '延边朝鲜族自治州': 222400, '哈尔滨市': 230100, '齐齐哈尔市': 230200, '鸡西市': 230300, '鹤岗市': 230400, '双鸭山市': 230500, '大庆市': 230600, '伊春市': 230700, '佳木斯市': 230800, '七台河市': 230900, '牡丹江市': 231000, '黑河市': 231100, '绥化市': 231200, '大兴安岭地区': 232700, '上海市': 310100, '南京市': 320100, '无锡市': 320200, '徐州市': 320300, '常州市': 320400, '苏州市': 320500, '南通市': 320600, '连云港市': 320700, '淮安市': 320800, '盐城市': 320900, '扬州市': 321000, '镇江市': 321100, '泰州市': 321200, '宿迁市': 321300, '杭州市': 330100, '宁波市': 330200, '温州市': 330300, '嘉兴市': 330400, '湖州市': 330500, '绍兴市': 330600, '金华市': 330700, '衢州市': 330800, '舟山市': 330900, '台州市': 331000, '丽水市': 331100, '合肥市': 340100, '芜湖市': 340200, '蚌埠市': 340300, '淮南市': 340400, '马鞍山市': 340500, '淮北市': 340600, '铜陵市': 340700, '安庆市': 340800, '黄山市': 341000, '滁州市': 341100, '阜阳市': 341200, '宿州市': 341300, '六安市': 341500, '亳州市': 341600, '池州市': 341700, '宣城市': 341800, '福州市': 350100, '厦门市': 350200, '莆田市': 350300, '三明市': 350400, '泉州市': 350500, '漳州市': 350600, '南平市': 350700, '龙岩市': 350800, '宁德市': 350900, '南昌市': 360100, '景德镇市': 360200, '萍乡市': 360300, '九江市': 360400, '新余市': 360500, '鹰潭市': 360600, '赣州市': 360700, '吉安市': 360800, '宜春市': 360900, '抚州市': 361000, '上饶市': 361100, '济南市': 370100, '青岛市': 370200, '淄博市': 370300, '枣庄市': 370400, '东营市': 370500, '烟台市': 370600, '潍坊市': 370700, '济宁市': 370800, '泰安市': 370900, '威海市': 371000, '日照市': 371100, '临沂市': 371300, '德州市': 371400, '聊城市': 371500, '滨州市': 371600, '菏泽市': 371700, '郑州市': 410100, '开封市': 410200, '洛阳市': 410300, '平顶山市': 410400, '安阳市': 410500, '鹤壁市': 410600, '新乡市': 410700, '焦作市': 410800, '濮阳市': 410900, '许昌市': 411000, '漯河市': 411100, '三门峡市': 411200, '南阳市': 411300, '商丘市': 411400, '信阳市': 411500, '周口市': 411600, '驻马店市': 411700, '济源市': 419001, '武汉市': 420100, '黄石市': 420200, '十堰市': 420300, '宜昌市': 420500, '襄阳市': 420600, '鄂州市': 420700, '荆门市': 420800, '孝感市': 420900, '荆州市': 421000, '黄冈市': 421100, '咸宁市': 421200, '随州市': 421300, '恩施土家族苗族自治州': 422800, '仙桃市': 429004, '潜江市': 429005, '天门市': 429006, '神农架林区': 429021, '长沙市': 430100, '株洲市': 430200, '湘潭市': 430300, '衡阳市': 430400, '邵阳市': 430500, '岳阳市': 430600, '常德市': 430700, '张家界市': 430800, '益阳市': 430900, '郴州市': 431000, '永州市': 431100, '怀化市': 431200, '娄底市': 431300, '湘西土家族苗族自治州': 433100, '广州市': 440100, '韶关市': 440200, '深圳市': 440300, '珠海市': 440400, '汕头市': 440500, '佛山市': 440600, '江门市': 440700, '湛江市': 440800, '茂名市': 440900, '肇庆市': 441200, '惠州市': 441300, '梅州市': 441400, '汕尾市': 441500, '河源市': 441600, '阳江市': 441700, '清远市': 441800, '东莞市': 441900, '中山市': 442000, '潮州市': 445100, '揭阳市': 445200, '云浮市': 445300, '南宁市': 450100, '柳州市': 450200, '桂林市': 450300, '梧州市': 450400, '北海市': 450500, '防城港市': 450600, '钦州市': 450700, '贵港市': 450800, '玉林市': 450900, '百色市': 451000, '贺州市': 451100, '河池市': 451200, '来宾市': 451300, '崇左市': 451400, '海口市': 460100, '三亚市': 460200, '三沙市': 460300, '儋州市': 460400, '五指山市': 469001, '琼海市': 469002, '文昌市': 469005, '万宁市': 469006, '东方市': 469007, '定安县': 469021, '屯昌县': 469022, '澄迈县': 469023, '临高县': 469024, '白沙黎族自治县': 469025, '昌江黎族自治县': 469026, '乐东黎族自治县': 469027, '陵水黎族自治县': 469028, '保亭黎族苗族自治县': 469029, '琼中黎族苗族自治县': 469030, '重庆市': 500100, '成都市': 510100, '自贡市': 510300, '攀枝花市': 510400, '泸州市': 510500, '德阳市': 510600, '绵阳市': 510700, '广元市': 510800, '遂宁市': 510900, '内江市': 511000, '乐山市': 511100, '南充市': 511300, '眉山市': 511400, '宜宾市': 511500, '广安市': 511600, '达州市': 511700, '雅安市': 511800, '巴中市': 511900, '资阳市': 512000, '阿坝藏族羌族自治州': 513200, '甘孜藏族自治州': 513300, '凉山彝族自治州': 513400, '贵阳市': 520100, '六盘水市': 520200, '遵义市': 520300, '安顺市': 520400, '毕节市': 520500, '铜仁市': 520600, '黔西南布依族苗族自治州': 522300, '黔东南苗族侗族自治州': 522600, '黔南布依族苗族自治州': 522700, '昆明市': 530100, '曲靖市': 530300, '玉溪市': 530400, '保山市': 530500, '昭通市': 530600, '丽江市': 530700, '普洱市': 530800, '临沧市': 530900, '楚雄彝族自治州': 532300, '红河哈尼族彝族自治州': 532500, '文山壮族苗族自治州': 532600, '西双版纳傣族自治州': 532800, '大理白族自治州': 532900, '德宏傣族景颇族自治州': 533100, '怒江傈僳族自治州': 533300, '迪庆藏族自治州': 533400, '拉萨市': 540100, '日喀则市': 540200, '昌都市': 540300, '林芝市': 540400, '山南市': 540500, '那曲市': 540600, '阿里地区': 542500, '西安市': 610100, '铜川市': 610200, '宝鸡市': 610300, '咸阳市': 610400, '渭南市': 610500, '延安市': 610600, '汉中市': 610700, '榆林市': 610800, '安康市': 610900, '商洛市': 611000, '兰州市': 620100, '嘉峪关市': 620200, '金昌市': 620300, '白银市': 620400, '天水市': 620500, '武威市': 620600, '张掖市': 620700, '平凉市': 620800, '酒泉市': 620900, '庆阳市': 621000, '定西市': 621100, '陇南市': 621200, '临夏回族自治州': 622900, '甘南藏族自治州': 623000, '西宁市': 630100, '海东市': 630200, '海北藏族自治州': 632200, '黄南藏族自治州': 632300, '海南藏族自治州': 632500, '果洛藏族自治州': 632600, '玉树藏族自治州': 632700, '海西蒙古族藏族自治州': 632800, '银川市': 640100, '石嘴山市': 640200, '吴忠市': 640300, '固原市': 640400, '中卫市': 640500, '乌鲁木齐市': 650100, '克拉玛依市': 650200, '吐鲁番市': 650400, '哈密市': 650500, '昌吉回族自治州': 652300, '博尔塔拉蒙古自治州': 652700, '巴音郭楞蒙古自治州': 652800, '阿克苏地区': 652900, '克孜勒苏柯尔克孜自治州': 653000, '喀什地区': 653100, '和田地区': 653200, '伊犁哈萨克自治州': 654000, '塔城地区': 654200, '阿勒泰地区': 654300, '石河子市': 659001, '阿拉尔市': 659002, '图木舒克市': 659003, '五家渠市': 659004, '北屯市': 659005, '铁门关市': 659006, '双河市': 659007, '可克达拉市': 659008, '昆玉市': 659009, '香港': 810000, '澳门': 820001, '台北市': 710113, '高雄市': 710239, '新北市': 710330, '台中市': 710430, '台南市': 710538, '桃园市': 710616, '基隆市': 719001, '新竹市': 719002, '嘉义市': 719003, '新竹县': 719004, '宜兰县': 719005, '苗栗县': 719006, '彰化县': 719007, '云林县': 719008, '南投县': 719009, '嘉义县': 719010, '屏东县': 719011, '台东县': 719012, '花莲县': 719013, '澎湖县': 719014}

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

def getCities(name):#给出该地区所包含的城市列表
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
def getDataSource(request,area):#给出该地区所包含的stkcd列表
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
def listInfo(request,area,label,minvalue,maxvalue):#给出该地区的历史百分位
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
def listRet(request,city):#历史组合收益率
  print('list ret')
  qs=map.objects.values()
  record = qs.filter(city=city)
  myDict={'date':[],'ret':[],'weather':[],'max':[],'min':[],'API':[],'AQI':[]}
  for i in range(len(record)):
    if record[i]['ret']==-100:
      continue
    myDict['date'].append(record[i]['date'])
    myDict['ret'].append(record[i]['ret'])
    myDict['weather'].append(record[i]['weather'])
    myDict['max'].append(record[i]['max'])
    myDict['min'].append(record[i]['min'])
    myDict['API'].append(record[i]['API'])
    myDict['AQI'].append(record[i]['AQI'])
  return JsonResponse({'ret': 0, 'data':myDict})

def listStkDate(request,stkcd):
  pmp = predictModelPath.objects.values().filter(stkcd=stkcd)
  if len(pmp)==0:
    return JsonResponse({'ret': 1, 'msg': 'not have model'})
  else: 
    # T = time.localtime(time.time())
    # enddate=str(T.tm_year)+'0'+str(T.tm_mon) if T.tm_mon<10 else str(T.tm_year)+str(T.tm_mon)
    # enddate=str(enddate)+'0'+str(T.tm_mday) if T.tm_mday<10 else str(enddate)+str(T.tm_mday)
    
    T = datetime.datetime.now()
    begindate = '20000104'
    enddate = T.strftime('%Y%m%d')
    stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date=begindate, end_date=enddate, adjust="")

    begindate = stock_zh_a_hist_df['日期'].values[0].replace('-','')
    enddate = stock_zh_a_hist_df['日期'].values[len(stock_zh_a_hist_df)-1].replace('-','')
    print(stkcd,begindate,enddate)
    myDict={'begindate':begindate,'enddate':enddate}
  return JsonResponse({'ret': 0, 'data':myDict})

def weather(request,city): #获取实时天气与未来天气
  print('weather:',city)
  if city not in city2DistrictId:
    if city+'市' in city2DistrictId:
      city=city+'市'
    else:
      return JsonResponse({'ret': 1, 'msg':'未查询到'+city+'的天气信息。'})
  district_id=str(city2DistrictId[city])
  url = 'https://api.map.baidu.com/weather/v1/?district_id='+district_id+'&data_type=all&ak=z29V2EL1hlYaD0XOXOp1xmq3DM9sjtCW'
  try:
    request = urllib.request.Request(url)
    response = urllib.request.urlopen(request)
  except urllib.request.HTTPError as error:    # HTTP错误
    print('HTTPError')
    print('ErrorCode: %s' % error.code)
  except urllib.request.URLError as error:     # URL错误
      print(error.reason)
  html = response.read().decode('utf-8')
  # print(html)
  html=eval(html)
  # for i in html.keys():
  #     print(i)
  # print(html)
  myDict={}
  myDict['city']=html['result']['location']['city']
  myDict['now']={
      'text':html['result']['now']['text'],
      'temp':html['result']['now']['temp'],
      'wind_class':html['result']['now']['wind_class'],
      'wind_dir':html['result']['now']['wind_dir']
  }
  myDict['day']=[]
  for i in range(3):
      dayInfo=html['result']['forecasts'][i]
      myDict['day'].append(
        {
          'date':dayInfo['date'],
          'text':dayInfo['text_day'],
          'high':dayInfo['high'],
          'low':dayInfo['low'],
          'wind_class':dayInfo['wc_day'],
          'wind_dir':dayInfo['wd_day'],
          'week':dayInfo['week']
        }
      )
  # print(myDict)
  return JsonResponse({'ret': 0, 'data':myDict})

def stockInfo(request,stkcd): #股票代码对应的简称、行业、上市时间、市值等信息
  print('history info:', stkcd)
  myDict = {}
  qs=stkPlace.objects.values()
  qs=qs.filter(stkcd=stkcd)
  if len(qs)!=0:
    myDict['name2']=qs[0]['name2']
    myDict['place1']=qs[0]['place1']
    myDict['place2']=qs[0]['place2']
  else:
    myDict['name2']='-'
    myDict['place1']='-'
    myDict['place2']='-'

  try:
    stock_individual_info_em_df = ak.stock_individual_info_em(symbol=stkcd)
    myDict['name'] = stock_individual_info_em_df['value'].values[5]#股票简称
    myDict['industry'] = stock_individual_info_em_df['value'].values[2]#行业
    ttm=str(stock_individual_info_em_df['value'].values[3])#上市时间
    myDict['TTM'] = ttm[0:4]+'-'+ttm[4:6]+'-'+ttm[6:8]
    myDict['MarCap'] = stock_individual_info_em_df['value'].values[0]#总市值
    myDict['tradedCap'] = stock_individual_info_em_df['value'].values[1]#流通市值
    myDict['stkIssue'] = stock_individual_info_em_df['value'].values[6]#总股本
    myDict['tradedIssue'] = stock_individual_info_em_df['value'].values[7]#流通股
    return JsonResponse({'ret': 0, 'data':myDict})
  except KeyError as e:
    print(stkcd,' error')
    return JsonResponse({'ret': 1, 'msg': stkcd+' error'})
def stock365(request,stkcd): #历史一年的股价信息
  print('history 365:', stkcd)
  myDict = {}
  myDict['data'] = []
  T1 = datetime.datetime.now()
  T1 = T1-datetime.timedelta(days=1)
  T2 = T1-datetime.timedelta(days=365)
  try:
    stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date=T2.strftime('%Y%m%d'), end_date=T1.strftime('%Y%m%d'), adjust="")
    # print(stock_zh_a_hist_df.iloc[0]) 
    # stock_zh_a_hist_min_em_df = ak.stock_zh_a_hist_min_em(symbol=stkcd, start_date=T2.strftime('%Y-%m-%d %H:%M:%S'), end_date=T1.strftime('%Y-%m-%d %H:%M:%S'), period='1', adjust='')
    for i in range(len(stock_zh_a_hist_df)):
      a=list(stock_zh_a_hist_df.iloc[i])
      a[5]=int(a[5])
      myDict['data'].append(a)
    return JsonResponse({'ret': 0, 'data':myDict})
  except KeyError as e:
    print(stkcd,' error')
    return JsonResponse({'ret': 1, 'msg': stkcd+' error'})
  except Exception as e:
    print("except:",e)
def stock(request,stkcd): #当日的实时股价信息
  print('real stock:', stkcd)
  myDict = {}
  myDict['data'] = []
  T1 = datetime.datetime.now()
  # T2 = T1-datetime.timedelta(days=7)
  T2 = datetime.date(T1.year,T1.month,T1.day)
  # print('时间：(%Y-%m-%d %H:%M:%S %f): ' , T1.strftime( '%Y-%m-%d %H:%M:%S %f' ) ) 
  # print('时间：(%Y-%m-%d %H:%M:%S %p): ' , T1.strftime( '%y-%m-%d %I:%M:%S %p' ))
  stock_zh_a_hist_min_em_df = ak.stock_zh_a_hist_min_em(symbol=stkcd, start_date=T2.strftime('%Y-%m-%d %H:%M:%S'), end_date=T1.strftime('%Y-%m-%d %H:%M:%S'), period='1', adjust='')
  # print(stock_zh_a_hist_min_em_df.iloc[0])
  for i in range(len(stock_zh_a_hist_min_em_df)):
    a=list(stock_zh_a_hist_min_em_df.iloc[i])
    a[5]=int(a[5])
    myDict['data'].append(a)
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
def stkLstm(request): #LSTM股价预测
  stkcd=request.POST.get('stkcd',default='1')
  begindate=request.POST.get('begindate',default='1')
  enddate=request.POST.get('enddate',default='1')
  name='收盘'
  print('LSTM begin',stkcd,begindate,enddate,name)
  
  pmp = predictModelPath.objects.values().filter(stkcd=stkcd)
  if len(pmp)!=0:
    path = pmp[0]['path']
    try:
      new_model = load_model(path)
    except IOError:
      print('load error')
      return JsonResponse({'ret': 1, 'msg': 'load error'})
    data = []
    dates = []

    T = datetime.datetime(int(begindate[:4]),int(begindate[4:6]),int(begindate[6:8]))
    T -= datetime.timedelta(days=60)
    # enddate2 = str(T.year)+'0'+str(T.month) if T.month<10 else str(T.year)+str(T.month)
    # enddate2 = enddate2+'0'+str(T.day) if T.day < 10 else enddate2+str(T.day)
    enddate2 = T.strftime('%Y-%m-%d')
    stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date=enddate2, end_date=begindate, adjust="")
    print(len(stock_zh_a_hist_df))
    if len(stock_zh_a_hist_df)<20:
      return JsonResponse({'ret':1,'msg':'选择时间段前数据不满20，不足以训练'})
    for i in range(len(stock_zh_a_hist_df)-20,len(stock_zh_a_hist_df)):
      data.append(stock_zh_a_hist_df[name].values[i])
      dates.append(stock_zh_a_hist_df['日期'].values[i])

    stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol=stkcd, period="daily", start_date=begindate, end_date=enddate, adjust="")
    print(len(stock_zh_a_hist_df))
    for i in stock_zh_a_hist_df[name].values:
      data.append(i)
    for i in stock_zh_a_hist_df['日期'].values:
      dates.append(i)
    predict = LSTMpredict(new_model,data)

    T = datetime.datetime(int(enddate[:4]),int(enddate[4:6]),int(enddate[6:8]))
    T += datetime.timedelta(days=1)
    while is_workday(T.date())==False:
      T+=datetime.timedelta(days=1)
    dates.append(str(T.date()))
    myDict={'stkcd':stkcd, 'num':len(data)-20, 'date': dates[20:], 'predict':predict,'real':[str(x) for x in data[20:]]}
    print(len(myDict['predict']),len(myDict['real']),len(myDict['date']))
    predictCorret = 0
    mae = 0
    rmse = 0
    mape = 0
    for i in range(1,len(myDict['real'])):
      mae += abs(float(myDict['real'][i])-float(myDict['predict'][i]))
      rmse += (float(myDict['real'][i])-float(myDict['predict'][i]))**2
      mape += abs((float(myDict['predict'][i])-float(myDict['real'][i]))/float(myDict['real'][i]))
      if (float(myDict['real'][i])-float(myDict['real'][i-1]))*(float(myDict['predict'][i])-float(myDict['predict'][i-1]))>=0:
        predictCorret+=1
    mae = mae/len(myDict['real'])
    rmse = math.sqrt(rmse/len(myDict['real']))
    mape = mape/len(myDict['real'])*100
    myDict['MAE'] = mae
    myDict['RMSE'] = rmse
    myDict['MAPE'] = mape
    myDict['predictCorrect'] = predictCorret
    return JsonResponse({'ret': 0, 'data':myDict})
  else:
    return JsonResponse({'ret': 1, 'msg': 'have no model'})

def stkLstm2(request,stkcd,begindate,enddate,name,predictbegin,predictend):
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
def handleTemp(x):#开氏度->摄氏度
  return x-273.15
def listWeatherRegression(request):
  print('list weather regression')
  T1=time.time()
  # 获取传入数据
  label=request.POST.get('label',default='1')
  model=request.POST.get('model',default='1')
  weatherList=request.POST.get('weather',default='1').split('#')
  area=request.POST.get('area',default='1').split('#')
  print(label,model,weatherList,area)

  myDict={}
  # 控制变量内容
  if label=='tur':
    variableList=['proportion','MarCap','tur(-1)','ret(-1)','ret']
  elif label=='ret':
    variableList=['ret(-1)', 'ris','smb','hml']
  else:
    return JsonResponse({'ret': 1, 'msg': 'label数据错误'})
  
  # 查表
  rq = regQuery.objects.values()
  # 获取城市名单
  cities = []
  rqCities = rq.filter(area=area)
  if len(rqCities)!=0:
    cities = rqCities[0]['cities'].split('#')
  else:
    for name in area:
      cities=cities+getCities(name)[1:]
  myDict['cities']=cities

  # 分布图
  myInfo=regressionInfo(cities)
  for i in weatherList:
    myDict[i]={}
    myDf = myInfo.dataDf[[i,label]]
    myDf = myDf[myDf!=-100].dropna()
    myDict[i][0]=list(myDf[i])
    if i=='min' or i=='max':
      myDict[i][0] = [i-273.15 for i in myDict[i][0]]
    myDict[i][1] = list(myDf[label])

  # 查看是否具有所有查询区域的总数据
  myDict['all']={}
  print('all')
  # flag1=False
  for weather in weatherList:
    print(weather)
    myDict['all'][weather]={}
    conditions={
      'area': '#'.join(area),
      'label': label,
      'model': model,
      'weather': weather
    }
    rqall = rq.filter(**conditions)
    if len(rqall)!=0:
      myDict['all'][weather]['weights']=rqall[0]['weights']
      myDict['all'][weather]['score']=rqall[0]['score']
      myDict['all'][weather]['num']=rqall[0]['num']
    else:
      print('no data')
      if model=='linear':
        score,num=myInfo.myRegression([weather]+variableList, label)
        print(score,num)
        myDict['all'][weather]={'weights':myInfo.result[weather],'score':score,'num':num}
      elif model=='OLS':
        score,num=myInfo.myOLSRegression([weather]+variableList, label)
        print(score,num)
        myDict['all'][weather]={'weights':myInfo.result[weather],'score':score,'num':num}
      else:
        return JsonResponse({'ret': 1, 'msg': 'model数据错误'})
      regQuery.objects.create(
        area='#'.join(area), label=label, cities='#'.join(cities),
        weather=weather,model=model,weights=myInfo.result[weather],
        score=score,num=num)
  # 单个城市的回归
  if len(cities)==1:
    return JsonResponse({'ret': 0, 'data':myDict})
  for city in cities:
    print(city)
    myDict[city]={}
    flag1=False
    for weather in weatherList:
      conditions={
        'area': city,
        'label': label,
        'model': model,
        'weather': weather
      }
      rqone = rq.filter(**conditions)
      if len(rqone)!=0:
        myDict[city][weather]={'weights':rqone[0]['weights'],'score':rqone[0]['score'],'num':rqone[0]['num']}
      else:
        print('no data')
        if flag1==False:
          myInfo=regressionInfo(city)
          flag1=True
        if model=='linear':
          score,num=myInfo.myRegression([weather]+variableList, label)
          print(score,num)
          myDict[city][weather]={'weights':myInfo.result[weather],'score':score,'num':num}
        elif model=='OLS':
          score,num=myInfo.myOLSRegression([weather]+variableList, label)
          print(score,num)
          myDict[city][weather]={'weights':myInfo.result[weather],'score':score,'num':num}
        else:
          return JsonResponse({'ret': 1, 'msg': 'model数据错误'})
        record = regQuery.objects.create(
          area=city, label=label, cities=city,
          weather=weather,model=model,weights=myInfo.result[weather],
          score=score,num=num)
  T2=time.time()
  print('用时：',T2-T1)
  return JsonResponse({'ret': 0, 'data':myDict})

def handleWeather(weather):#将具体天气转化为[rain,snow,cloud]
  state=[0,0,0]#雨、雪、云
  weather=weather.replace('~','')
  if '暴雪' in weather:
    state[0]=4
    state[2]=4
  elif '大雪' in weather:
    state[0]=3
    state[2]=4
  elif '中雪' in weather:
    state[0]=2
    state[2]=4
  elif '雪' in weather:
    state[0]=1
    state[2]=3

  if '暴雨' in weather:
    state[1]=4
    state[2]=4
  elif '大雨' in weather:
    state[1]=3
    state[3]=4
  elif '中雨' in weather:
    state[1]=2
    state[2]=4
  elif '雨' in weather:
    state[1]=1
    state[2]=3

  if state[2]==0:
    if '阴' in weather:
      state[2]=3 
    elif '多云' in weather:
      state[2]=2
    elif '少云' in weather:
      state[2]=1
  return state
def getTipData(city,state):#根据当前城市、天气状态，给出历史百分位、系数（还没加
  myDict={}
  myDict['state']=state
  print(state)
  labels=['rain','snow','cloud']
  mQs=map.objects.values()
  maQs = mapQuery.objects.values()
  for j in range(len(labels)):
    label=labels[j]
    myDict[label]={}
    conditions={
      'area':city,
      'label':label
    }
    qs2 =maQs.filter(**conditions)
    if(len(qs2)!=0):
      myDict[label]={
        'num': qs2[0]['num'+str(state[j])], 
        'above': qs2[0]['aboveNum'+str(state[j])],
        'below': qs2[0]['belowNum'+str(state[j])],
        'rate': round(qs2[0]['belowNum']/qs2[0]['aboveNum'],2)
      }
      myDict[label]['abovePro']=1.00
      myDict[label]['belowPro']=round(myDict[label]['below']/(myDict[label]['above']*myDict[label]['rate']),2)

    else:
      qs2=mQs.filter(city=city)
      above=0
      below=0
      myDict2={}
      for i in range(len(qs2)):
        if qs2[i]['ret']<0:
          below+=1
        else:
          above+=1
      myDict2['all']={'num':above+below,'above':above,'below':below}
      length=100
      for i in range(5):
        myDict2[i] = {'num':0,'above':0,'below':0}
      k=0
      while k<5:
        record = handleParam(qs2,label,k,k)
        length = len(record)
        if length==0:
          k+=1
          continue
        for i in range(length):
          info=record[i]
          myDict2[k]['num']+=1
          if info['ret']<0:
            myDict2[k]['below']+=1
          else:
            myDict2[k]['above']+=1
        k+=1
      record = mapQuery.objects.create(area=city, label=label, cities=city+'#'+city,
        num=myDict2['all']['num'], aboveNum=myDict2['all']['above'], belowNum=myDict2['all']['below'],
        num0=myDict2[0]['num'], aboveNum0=myDict2[0]['above'], belowNum0=myDict2[0]['below'],
        num1=myDict2[1]['num'], aboveNum1=myDict2[1]['above'], belowNum1=myDict2[1]['below'],
        num2=myDict2[2]['num'], aboveNum2=myDict2[2]['above'], belowNum2=myDict2[2]['below'],
        num3=myDict2[3]['num'], aboveNum3=myDict2[3]['above'], belowNum3=myDict2[3]['below'],
        num4=myDict2[4]['num'], aboveNum4=myDict2[4]['above'], belowNum4=myDict2[4]['below'],)
      myDict[label]=myDict2[state[j]]
      myDict[label]['rate']=round(myDict2['all']['below']/myDict2['all']['above'],2)
      myDict[label]['abovePro']=1.00
      myDict[label]['belowPro']=round(myDict[label]['below']/(myDict[label]['above']*myDict[label]['rate']),2)
  return myDict

def getTip(request):#根据当前城市、天气，给出建议
  city=request.POST.get('city',default='1')
  weather=request.POST.get('weather',default='1')
  print('get tip:',city,weather)
  myDict={'state':[],'rain':[],'snow':[],'cloud':[],'tip':""}
  if len(weather)==0:
    return JsonResponse({'ret': 0, 'data':myDict})
  weatherInfo=weather.split(' ')
  state=handleWeather(weatherInfo[0])
  myDict=getTipData(city,state)
  labels=['rain','snow','cloud']
  above=0
  below=0
  if sum(state)==0:
    for label in labels:
      above+=(myDict[label]['num'])
      below+=(myDict[label]['num']*myDict[label]['belowPro'])
  else:
    for i in range(len(state)):
      if state[i]!=0:
        label=labels[i]
        above+=(myDict[label]['num'])
        below+=(myDict[label]['num']*myDict[label]['belowPro'])
  print(above,below,round(below/above,2))
  if above>below:
    tip="在该天气下，收益率为正的概率较高，不建议加仓。"
  elif above<below:
    tip="在该天气下，收益率为正的概率较低，建议加仓。"
  else:
    tip="因数据量不足，难以判断。"
  myDict['tip']=tip
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
