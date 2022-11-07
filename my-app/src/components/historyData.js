//城市组合收益率的历史数据
import React from "react";
import "../index.css";
import EChartsReact from 'echarts-for-react';

function HistoryData(props) {
  if(props.data.length<7 ||  props.data[0].length===0){
    console.log('history ret is null');
    return(
      <div><p>暂无数据</p></div>
    );
  }
  let days = props.data[1];
  let rets = props.data[0];
  var myDict = {};
  for(let i = 0; i<days.length; i++) {
    myDict[days[i]]=[props.data[2][i],props.data[3][i],props.data[4][i],props.data[5][i],props.data[6][i]];
  }
  let options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: function (params, ticket, callback) {
        var htmlStr = '';
        for(var i=0;i<params.length;i++){
          var param = params[i];
          var xName = param.name;//x轴的名称
          // var seriesName = param.seriesName;//图例名称
          var value = param.value;//y轴值
          // var color = param.color;//图例颜色
          if(i===0){
            htmlStr += xName + '<br/>';//x轴的名称
          }
          htmlStr +='<div>';
          htmlStr += '收益率：' + value.toFixed(4) + '<br/>';
          var otherInfo = myDict[xName];
          htmlStr += '天气：' + otherInfo[0] + '<br/>';
          htmlStr += '温度：' + (otherInfo[2]-273.15).toFixed(0) + '­°C～' + (otherInfo[1]-273.15).toFixed(0) +'­°C<br/>';
          if(!!otherInfo[3] && otherInfo[3]!==-100)htmlStr += 'API：' + otherInfo[3] + '<br/>';
          if(!!otherInfo[4] && otherInfo[4]!==-100)htmlStr += 'AQI：' + otherInfo[4] + '<br/>';
          htmlStr += '</div>';
        }
        return htmlStr;
      },
      position: function(pt, params, dom, rect, size) {
        // var tipWidth = pt[0]+size.contentSize[0];
        // if(tipWidth>size.viewSize[0]) {
        if(pt[0]>size.viewSize[0]/2) {
          return [pt[0]-size.contentSize[0],'10%'];
        }
        return [pt[0], '10%'];
      }
    },
    title: {
      left: 'center',
      text: '历史组合收益率'
    },
    toolbox: {
      feature: {
        // dataZoom: {
        //   yAxisIndex: 'none'
        // },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      // type: 'time',
      boundaryGap: false,
      type: 'category',
      data: days,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '20%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 80,
        end: 100
      },
      {
        start: 80,
        end: 100
      }
    ],
    series: [
      {
        name: '收益率',
        type: 'line',
        symbol: 'none',
        // areaStyle: {},
        data: rets
      }
    ]
  };

  return (
    <div className='scrollItem'>
      <EChartsReact option={options}/>
    </div>
  );
}

export default HistoryData;