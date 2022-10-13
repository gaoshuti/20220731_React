import React, { useState } from "react";
import "../index.css";
import {
  Collapse,
  Col, 
  Row,
  
} from "antd";
import Weather from "../components/weather";
import { useParams } from "react-router-dom";

import DataSource from "../components/dataSource";
import HistoryPercentile from "../components/historyPercentile";
import HistoryData from "../components/historyData";

const axios = require('axios');
const { Panel } = Collapse;

function CityInfo(props) {
  const params = useParams();
  const city = params.city;
  const [hrCity,sethrCity] = useState(0);
  const [hisRet,setHisRet] = useState(0);
  const [hpCity,sethpCity] = useState(0);
  const [hisPercentile,setHisPercentile] = useState(0);
  const [dsCity,setdsCity] = useState(0);
  const [dataSour,setDataSour] = useState(0);
  console.log('cityInfo:',city);
  const getHistoryRet = async (area) => {//获取历史组合回报率
    // console.log('get history ret',area, hrCity);
    if(hisRet!==0 && hrCity===area) return;
    var data1=[],tempdata={},result;
    await axios.get("http://localhost:3000/historyret/"+area).then((res)=>{
      result=res.data['data'];
    });
    data1.push(result['ret']);
    data1.push(result['date']);
    setHisRet(data1);
    sethrCity(area);
  }
  const getHistoryPercentile = async (area,label,minValue=-1,maxValue=-1) => {//获取历史百分位
    // console.log('get history percentile',area,hpCity);
    if(hisPercentile!==0 && hpCity===area) return;
    var labels = ['rain','cloud','snow'];
    var data1=[], datas={}, tempdata={},result,cities,label;
    for(let i = 0; i < labels.length; i++) {
      data1=[]
      label = labels[i];
      await axios.get("http://localhost:3000/history/"+area+'/'+label+'/'+minValue+'/'+maxValue).then((res)=>{
        result=res.data['data'];
        cities=res.data['cities'];
      });
      for (var key in result){
        var historyInfo={};
        historyInfo.value=key;
        historyInfo.key=key;
        historyInfo.num=Number(result[key]['num']);
        historyInfo.aboveNum=Number(result[key]['above'].toFixed(2));
        historyInfo.belowNum=Number(result[key]['below'].toFixed(2));
        tempdata[key]=historyInfo;
      }
      var rate =  tempdata['all']['belowNum']/tempdata['all']['aboveNum']
      for(let key in tempdata){
        if(tempdata[key]['num']===0) continue;
        if(tempdata[key]['aboveNum']===0){
          tempdata[key]['above']=(0).toFixed(2);
          tempdata[key]['below']=(1).toFixed(2);
        }else{
          tempdata[key]['above']=(1).toFixed(2);
          tempdata[key]['below']=(tempdata[key]['belowNum']/tempdata[key]['aboveNum']/rate).toFixed(2);
        }
        data1.push(tempdata[key]);
      }
      datas[label] = data1;
    }
    setHisPercentile(datas);
    sethpCity(area);
  }
  const getDataSource = async (area) => {//获取数据源
    // console.log('get data source',area,dsCity);
    if(dataSour!==0 && dsCity===area) return;
    var data3=[],result;
    await axios.get("http://localhost:3000/datasource/"+area).then((res)=>{
      result=res.data['data'];
    });
    var i=0;
    for (var key in result){
      var stkcdList = result[key].split('#');
      var myDict = {key:String(++i),city:key,num:stkcdList.length,stkcd:stkcdList};
      data3.push(myDict);
    }
    setDataSour(data3);
    setdsCity(area);
  }
  getHistoryRet(city);
  getHistoryPercentile(city,'rain');
  getDataSource(city);
  return(
    <div>
      <Row>
        <Col span={7}>
          <Weather city={city}/>
        </Col>
        <Col span={1}></Col>
        <Col span={16}>
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="历史组合回报率" key="1">
              {hisRet===0?<div><p>暂无数据</p></div>:<HistoryData data={hisRet}/>}
            </Panel>
            <Panel header="历史百分位" key="2">
              {hisPercentile===0?<div><p>暂无数据</p></div>:
              <Collapse defaultActiveKey={['rain']} ghost>
                <Panel header="雨" key="rain">
                  <HistoryPercentile label="rain" result={hisPercentile['rain']}/>
                </Panel>
                <Panel header="云" key="cloud">
                  <HistoryPercentile label="cloud" result={hisPercentile['cloud']}/>
                </Panel>
                <Panel header="雪" key="snow">
                  <HistoryPercentile label="snow" result={hisPercentile['snow']}/>
                </Panel>
              </Collapse>
              }
            </Panel>
            <Panel header="数据源" key="3">
              {dataSour===0?<div><p>暂无数据</p></div>:<DataSource data={dataSour}/>}
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
}

export default CityInfo;