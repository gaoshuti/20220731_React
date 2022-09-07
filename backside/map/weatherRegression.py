import json
# from pyexcel_xlsx import get_data
from os import listdir
import pandas as pd
import math
from pandas import DataFrame,Series

import matplotlib.pyplot as plt
import matplotlib
import numpy as np
from map.models import map
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

import statsmodels.api as sm

class regressionInfo:
    
  ## 初始化，传入需要计算的城市
  ## 处理需要计算数据信息 => self.dataDf
  def __init__(self,cities):
    qs=map.objects.values()
    if type(cities)==type('a'):
      self.cities=[cities]
    elif isinstance(cities,list):
      self.cities=cities
    else:
      self.cities=[]
    
    self.result={}
    myDict={'city':[], 'date':[], 'max':[], 'min':[], 'wind':[], 
            'lrad':[], 'prec':[], 'pres':[], 'shum':[], 'srad':[], 
            'tempDiff1':[], 'tempDiff7':[], 
            'propertion':[], 'MarCap':[], 
            'ret':[], 'tur':[], 'ret(-1)':[], 'tur(-1)':[],
            'snow':[], 'rain':[], 'sand':[], 'cloud':[], 'haze':[], 
            'fog':[], 'hail':[], 'sun':[], 
            'ris':[], 'smb':[], 'hml':[], 
            'API':[], 'AQI':[], 
          }
    tempKey=['city', 'date', 'max', 'min', 'wind', 
            'lrad', 'prec', 'pres', 'shum', 'srad', 
            'tempDiff1', 'tempDiff7', 
            'propertion', 'MarCap', 'ret', 'tur', 
            'snow', 'rain', 'sand', 'cloud', 'haze', 
            'fog', 'hail', 'sun', 
            'ris', 'smb', 'hml', 
            'API', 'AQI', ]
    for city in self.cities:
      record = qs.filter(city=city)
      print(city,len(record))
      myDict['ret(-1)'].append(-100)
      myDict['tur(-1)'].append(-100)
      info=record[0]
      for name in tempKey:
        myDict[name].append(info[name])
      for i in range(1,len(record)):
        info=record[i]  
        myDict['ret(-1)'].append(record[i-1]['ret'])
        myDict['tur(-1)'].append(record[i-1]['tur'])
        for name in tempKey:
          myDict[name].append(info[name])
    self.dataDf = DataFrame(myDict)

  # 线性回归模型
  def myRegression(self, variableList, label):
    exam_df=self.dataDf[variableList+[label]]
#         exam_df = exam_df[exam_df!=''].dropna()
    exam_df = exam_df[exam_df!=-100].dropna()
    for i in variableList:
      self.result[i]=0
    if len(exam_df)==0:
      print('len==0')
      return 0
    if 'MarCap' in variableList:
      exam_df['MarCap'] = exam_df['MarCap'].apply(lambda x : math.log(x))
    exam_df=exam_df.apply(lambda x : (x-np.min(x))/(np.max(x)-np.min(x)))
    if exam_df[variableList[0]].isnull().sum()!=0:
      print(variableList[0],'has no change')
      return 0,0
    # print('1:',exam_df)
    # exam_df = exam_df[exam_df!=-100].dropna()
    # print('2:',exam_df)
    exam_X=exam_df[variableList]
    exam_Y=exam_df[label]
    model = LinearRegression()
    model.fit(exam_X,exam_Y)
    a  = model.intercept_#截距
    b = model.coef_#回归系数
    flag=0
    for i in exam_X.columns:
      self.result[i] = b[flag]
      flag+=1

    score1 = model.score(exam_X,exam_Y)
    # print('test score:',score1)
    return score1,len(exam_X)
      
  def myOLSRegression(self, variableList, label):
    exam_df=self.dataDf[variableList+[label]]
    exam_df = exam_df[exam_df!=-100].dropna()
    # print(exam_df.corr())
    for i in variableList:
      self.result[i]=0
    if len(exam_df)==0:
      print('len==0')
      return 0
    if 'MarCap' in variableList:
      exam_df['MarCap'] = exam_df['MarCap'].apply(lambda x : math.log(x))
    exam_df = exam_df.apply(lambda x : (x-np.min(x))/(np.max(x)-np.min(x)))
    if exam_df[variableList[0]].isnull().sum()!=0:
      print(variableList[0],'has no change')
      return 0
    x = exam_df[variableList]
    y = exam_df[label]
    x=sm.add_constant(x) #添加常数项
    est=sm.OLS(y,x)
    model=est.fit()#建立最小二乘回归模型
    # print(model.summary())
    b = model.params#回归系数
    flag=0
    for i in x.columns:
      self.result[i] = b[flag]
      flag+=1

    score1 = model.rsquared
    # print('test score:',score1)
    return score1,len(x)
  