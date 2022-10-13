//城市组合回报率的历史数据
import React from "react";
import "../index.css";
import EChartsReact from 'echarts-for-react';

function HistoryData(props) {
  if(props.data.length<2 ||  props.data[0].length===0){
    console.log('history ret is null');
    return(
      <div><p>暂无数据</p></div>
      
    );
  }
  let days = props.data[1];
  let rets = props.data[0];
  var data = [];
  for(let i = 0; i<days.length; i++) {
    let date = days[i].split('-');
    let base = new Date(date[0], date[1], 0);
    base.setDate(date[2]);
    data.push([base, rets[i]]);
  }
  let options = {
    tooltip: {
      trigger: 'axis',
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
      text: '历史回归率'
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
      type: 'time',
      boundaryGap: false
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
        name: 'ret',
        type: 'line',
        // smooth: true,
        symbol: 'none',
        // areaStyle: {},
        data: data
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