import React, { useState } from "react";
import "../index.css";
import {
  Collapse,
  Col, 
  Row,
  
} from "antd";
import Weather from "../components/weather";
import { useParams, useNavigate } from "react-router-dom";

import DataSource from "../components/dataSource";
import HistoryPercentile from "../components/historyPercentile";
import HistoryData from "../components/historyData";

const axios = require('axios');
const { Panel } = Collapse;
const cities = [
  '镇江', '杭州', '徐州', '潍坊', '西宁', '嘉兴', '保定', '许昌', '柳州', '株洲', 
  '广州', '东莞', '铜陵', '南阳', '桂林', '包头', '龙岩', '重庆', '哈尔滨', '淄博', 
  '洛阳', '荆门', '兰州', '温州', '湖州', '常州', '绵阳', '石家庄', '银川', '南宁', 
  '衢州', '滨州', '鞍山', '德州', '无锡', '南通', '襄阳', '武汉', '长沙', '大连', 
  '梅州', '沈阳', '乐山', '西安', '南昌', '惠州', '连云港', '福州', '北京', '德阳', 
  '济宁', '郑州', '珠海', '乌鲁木齐', '岳阳', '呼和浩特', '宁波', '拉萨', '赣州', '新乡',
  '天津', '江门', '南京', '长春', '吉林', '济南', '汕头', '太原', '海口', '台州',
  '宝鸡', '青岛', '威海', '昆明', '贵阳', '上海', '益阳', '深圳', '揭阳', '滁州', 
  '绍兴', '唐山', '合肥', '厦门', '苏州', '焦作', '金华', '泉州', '泰州', '衡阳', 
  '漳州', '成都', '芜湖', '扬州', '盐城', '佛山', '烟台', '潮州', '宿迁', '肇庆', 
  '宜昌'
];

function CityInfo(props) {
  const params = useParams();
  const city = params.city;
  const navigate = useNavigate();
  // 历史组合收益率
  const [hrCity,sethrCity] = useState(0);
  const [hisRet,setHisRet] = useState(0);
  // 历史百分位
  const [hpCity,sethpCity] = useState(0);
  const [hisPercentile,setHisPercentile] = useState(0);
  // 数据源
  const [dsCity,setdsCity] = useState(0);
  const [dataSour,setDataSour] = useState(0);

  if(cities.indexOf(city)===-1) {
    navigate('/error');
    return;
  }

  console.log('cityInfo:',city);
  const getHistoryRet = async (area) => {//获取历史组合收益率
    // console.log('get history ret',area, hrCity);
    if(hisRet!==0 && hrCity===area) return;
    var data1=[],result;
    await axios.get("http://localhost:3000/historyret/"+area).then((res)=>{
      result=res.data['data'];
    });
    data1.push(result['ret']);
    data1.push(result['date']);
    setHisRet(data1);
    sethrCity(area);
  }
  const getHistoryPercentile = async (area,minValue=-1,maxValue=-1) => {//获取历史百分位
    // console.log('get history percentile',area,hpCity);
    if(hisPercentile!==0 && hpCity===area) return;
    var labels = ['rain','cloud','snow'];
    var data1=[], datas={}, tempdata={},result,label;
    for(let i = 0; i < labels.length; i++) {
      data1=[]
      label = labels[i];
      await axios.get("http://localhost:3000/history/"+area+'/'+label+'/'+minValue+'/'+maxValue).then((res)=>{
        result=res.data['data'];
        // citiesInArea=res.data['cities'];
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
  getHistoryPercentile(city);
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
            <Panel header="历史组合收益率" key="1">
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