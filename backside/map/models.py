# from xml.etree.ElementInclude import default_loader
from django.db import models

# Create your models here.
class map(models.Model):# 数据
  id = models.AutoField(primary_key=True,default='')
  city=models.CharField(max_length=255)
  date=models.CharField(max_length=255)
  weather=models.CharField(max_length=255,null=True,blank=True)
  class Meta:
    unique_together = ('city', 'date',)
  max=models.FloatField(null=True,blank=True)
  min=models.FloatField( null=True,blank=True)
  wind=models.FloatField(null=True,blank=True)
  lrad=models.FloatField(null=True,blank=True)
  prec=models.FloatField(null=True,blank=True)
  pres=models.FloatField(null=True,blank=True)
  shum=models.FloatField(null=True,blank=True)
  srad=models.FloatField(null=True,blank=True)
  tempDiff1=models.FloatField(null=True,blank=True )
  tempDiff7=models.FloatField( null=True,blank=True)
  proportion=models.FloatField( null=True,blank=True)
  MarCap=models.FloatField( null=True,blank=True)
  ret=models.FloatField( null=True,blank=True)
  tur=models.FloatField( null=True,blank=True)
  snow=models.IntegerField(null=True,blank=True)
  rain=models.IntegerField(null=True,blank=True)
  sand=models.IntegerField(null=True,blank=True)
  cloud=models.IntegerField(null=True,blank=True)
  haze=models.IntegerField(null=True,blank=True)
  fog=models.IntegerField(null=True,blank=True)
  hail=models.IntegerField(null=True,blank=True)
  sun=models.IntegerField(null=True,blank=True)
  ris=models.FloatField( null=True,blank=True)
  smb=models.FloatField( null=True,blank=True)
  hml=models.FloatField( null=True,blank=True)
  API=models.IntegerField(null=True,blank=True)
  AQI=models.IntegerField(null=True,blank=True)

class stock(models.Model):# 暂无用
  id = models.AutoField(primary_key=True,default='')
  stkcd=models.CharField(max_length=255)
  date=models.CharField(max_length=255)
  class Meta:
    unique_together = ('stkcd', 'date',)
  opnprc=models.FloatField(null=True,blank=True)
  hiprc=models.FloatField(null=True,blank=True)
  loprc=models.FloatField(null=True,blank=True)
  clsprc=models.FloatField(null=True,blank=True)

  dnshrtrd=models.FloatField(null=True,blank=True)#日个股交易股数
  dnvaltrd=models.FloatField(null=True,blank=True)#日个股交易金额
  dsmvosd=models.FloatField(null=True,blank=True)#日个股流通市值
  dsmvtll=models.FloatField(null=True,blank=True)#日个股总市值
  dretwd=models.FloatField(null=True,blank=True)#考虑现金红利再投资的日个股回报率
  changeRatio=models.FloatField(null=True,blank=True)#ChangeRatio

class mapQuery(models.Model): # 地图查询结果
  id = models.AutoField(primary_key=True)
  area=models.CharField(default='',max_length=255)
  label=models.CharField(default='',max_length=255)
  cities=models.CharField(default='',max_length=255)
  class Meta:
    unique_together = ('area', 'label',)
  num=models.IntegerField()
  aboveNum=models.IntegerField()
  belowNum=models.IntegerField() 
  num0=models.IntegerField()
  aboveNum0=models.IntegerField()
  belowNum0=models.IntegerField() 
  num1=models.IntegerField()
  aboveNum1=models.IntegerField()
  belowNum1=models.IntegerField() 
  num2=models.IntegerField()
  aboveNum2=models.IntegerField()
  belowNum2=models.IntegerField() 
  num3=models.IntegerField()
  aboveNum3=models.IntegerField()
  belowNum3=models.IntegerField() 
  num4=models.IntegerField()
  aboveNum4=models.IntegerField()
  belowNum4=models.IntegerField() 

class stkcdInCity(models.Model): # stkcd与city的对应关系
  city=models.CharField(primary_key=True,max_length=255)
  stkcd=models.CharField(max_length=2805)

class predictModelPath(models.Model):
  id = models.AutoField(primary_key=True,default='')
  stkcd=models.CharField(max_length=255)
  begindate=models.CharField(max_length=255)
  enddate=models.CharField(max_length=255)
  class Meta:
    unique_together = ('stkcd', 'begindate', 'enddate')
  path=models.CharField(max_length=255)

class regQuery(models.Model):
  id = models.AutoField(primary_key=True)
  area=models.CharField(default='',max_length=255)
  label=models.CharField(default='',max_length=255)
  model=models.CharField(default='',max_length=255)
  weather=models.CharField(default='',max_length=255)
  cities=models.CharField(default='',max_length=510)
  weights=models.FloatField()
  score=models.FloatField()
  num=models.IntegerField()


