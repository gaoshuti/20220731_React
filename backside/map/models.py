from xml.etree.ElementInclude import default_loader
from django.db import models

# Create your models here.
class map(models.Model):
  id = models.AutoField(primary_key=True,default='')
  city=models.CharField(max_length=255)
  date=models.CharField(max_length=255)
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
  propertion=models.FloatField( null=True,blank=True)
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