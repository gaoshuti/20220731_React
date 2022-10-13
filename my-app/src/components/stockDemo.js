//当日实时股价与历史一年股价
import React from "react";
import "../index.css";
import {
  Button,
  Col, 
  Divider,
  Form,
  Input,
  Row,
  
} from "antd";
import EChartsReact from 'echarts-for-react';

const axios = require('axios');
const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';



// 实时股价+天气预报
function SelectDemo(props) {
  const onInputChange = (e) => {
    props.setStkcd(e.target.value);
  };
  const onFinish = async (values) => {
    props.setButtonFlag(true);
    console.log('submit:',values.stkcd);
    let stkcd = values.stkcd;
    await axios.get("http://localhost:3000/stock365/"+stkcd).then((res)=>{
      var result=res.data;
      if(result['ret']===0)  {//成功
        console.log('stock365:',result['data'])
        props.setResult(result);
        axios.get("http://localhost:3000/stock/"+stkcd).then((res2)=>{
          var result1=res2.data;
          if(result['ret']===0)  {//成功
            console.log('stock:',result1['data'])
            props.setData(result1);
            props.setButtonFlag(false);
          } else { //失败
            console.log(result['msg'])
            props.setButtonFlag(false);
          }
        },err2=>{
          console.log(err2);
          props.setButtonFlag(false);
        });
      } else { //失败
        console.log(result['msg'])
        props.setButtonFlag(false);
      }
    },err=>{
      console.log(err);
      props.setButtonFlag(false);
    });

    
  };
  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{stkcd: props.stkcd}}
        onFinish={onFinish}
      >
        <Form.Item name='stkcd' label="股票代码"
          rules={[
            {
              required: true,
              message: 'Please enter the stock code!',
            },
            {
              len: 6,
              message: 'Please enter six characters!',
            },
          ]}
        >
          <Row>
            <Col span={6}>
              <Input maxLength={6}
                bordered={false}
                value={props.stkcd}	
                // pattern={'\d+'}
                onPressEnter={onInputChange}
                onChange={onInputChange}
              />
            </Col>
            <Col span={4}>
              <Form.Item>
                <Button size="small" shape="round" type="ghost" htmlType="submit" disabled={props.buttonFlag}>查询</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

function StockInfo(props) {
  return(
    <div>
      <Row>
        <Col span={12}>
          <h3>{props.info['name']}</h3>
        </Col>
        <Col span={4}>
          <p>{props.info['industry']}</p>
        </Col>
        <Col span={8}>
          <p>上市时间：{props.info['TTM']}</p>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <p>总 市 值 ：{props.info['MarCap']}</p>
        </Col>
        <Col span={12}>
          <p>总 股 本 ：{props.info['stkIssue']}</p>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <p>流通市值：{props.info['tradedCap']}</p>
        </Col>
        <Col span={12}>
          <p>流通股本：{props.info['tradedIssue']}</p>
        </Col>
      </Row>
    </div>
  );
}
function StockHistoryPrice(props) {
  // console.log('history:',props.historyData[0]);//日期, 开盘, 收盘, 最高, 最低, 成交量, 成交额, 涨跌幅, 涨跌额, 换手率 
  let data0 = props.splitData(props.historyData);
  let option = {
    title: {
      text: '历史价格',
      left: 0
    },
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
          var color = param.color;//图例颜色
          if(i===0){
            htmlStr += xName + '<br/>';//x轴的名称
          }
          htmlStr +='<div>';
          const point1 = (color) => {
            return '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';
          };
          htmlStr += point1(color);
          // htmlStr += seriesName+ '<br/>';
          htmlStr += '股价<br/>';
          var point2 = '<span style="margin-left:3px;margin-right:8px;display:inline-block;width:4px;height:4px;border-radius:2px;background-color:'+color+';"></span>';
          htmlStr += point2 + 'open：' + value[1] + '<br/>';
          htmlStr += point2 + 'close：' + value[2] + '<br/>';
          htmlStr += point2 + 'highest：' + value[3] + '<br/>';
          htmlStr += point2 + 'lowest：' + value[4] + '<br/>';
          var otherInfo = data0.otherInfo[xName];
          let color1 = '#888888'
          htmlStr += point1(color1) + '成交量：' + otherInfo[0] + '<br/>';
          htmlStr += point1(color1) + '成交额：' + otherInfo[1] + '<br/>';
          htmlStr += point1(color1) + '振幅：' + otherInfo[2] + '%<br/>';
          htmlStr += point1(color1) + '涨跌幅：' + otherInfo[3] + '%<br/>';
          htmlStr += point1(color1) + '涨跌额：' + otherInfo[4] + '<br/>';
          htmlStr += point1(color1) + '换手率：' + otherInfo[5] + '%<br/>';
          
          htmlStr += '</div>';
        }
        return htmlStr;
       }
    },
    // legend: {
    //   data: ['日K', '成交量', '成交额', '振幅', '涨跌幅', '涨跌额', '换手率']
    // },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: data0.categoryData,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 50,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        top: '90%',
        start: 50,
        end: 100
      }
    ],
    series: [
      { name: '日K',
        type: 'candlestick',
        data: data0.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor
        },
        markPoint: {
          label: {
            formatter: function (param) {
              return param != null ?param.value + '' : '';
            }
          },
          data: [
            {
              name: 'Mark',
              coord: ['2013/5/31', 2300],
              value: 2300,
              itemStyle: {
                color: 'rgb(41,60,85)'
              }
            },
            {
              name: 'highest value',
              type: 'max',
              valueDim: 'highest'
            },
            {
              name: 'lowest value',
              type: 'min',
              valueDim: 'lowest'
            },
            {
              name: 'average value on close',
              type: 'average',
              valueDim: 'close'
            }
          ],
          tooltip: {
            formatter: function (param) {
              return param.name + '<br>' + (param.data.coord || '');
            }
          }
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            [
              {
                name: 'from lowest to highest',
                type: 'min',
                valueDim: 'lowest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              },
              {
                type: 'max',
                valueDim: 'highest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              }
            ],
            {
              name: 'min line on close',
              type: 'min',
              valueDim: 'close'
            },
            {
              name: 'max line on close',
              type: 'max',
              valueDim: 'close'
            }
          ]
        }
      },
      // { name: '成交量',
      //   type: 'line',
      //   data: data0.tradingNum,
      // },
      // { name: '成交额',
      //   type: 'line',
      //   // lineStyle:{ 
      //   //   color:'red' //改变折线颜色
      //   // }, 
      //   // symbol: 'none',
      //   data: data0.tradingValue
      // },
      // { name: '振幅',
      //   type: 'line',
      //   data: data0.amplitude,
      // },
      // { name: '涨跌幅',
      //   type: 'line',
      //   data: data0.changePercent,
      // },
      // { name: '涨跌额',
      //   type: 'line',
      //   data: data0.changeAmount,
      // },
      // { name: '换手率',
      //   type: 'line',
      //   data: data0.turnoverRate,
      // },
    ]
  };
  return(
    <div>
      {/* <p>历史数据</p> */}
      <EChartsReact option={option}/>
    </div>
  );
  
  
}
class StockPrice extends React.Component {
  componentDidMount() {
    //设置定时器，5s更新一次
    this.timer = setInterval(() => {
      axios.get("http://localhost:3000/stock/"+this.props.stkcd).then((res)=>{
        console.log('loading:',res.data['data']['data'][res.data['data']['data'].length-1][0]);
        var result=res.data;
        if(res.data['data']['data'][res.data['data']['data'].length-1][0].split(' ')[1]==='15:00:00'){
          // this.props.setData(result);
          clearInterval(this.timer);
        }
        if(result['ret']===0)  {//成功
          if(res.data['data']['data'][res.data['data']['data'].length-1][0]!==this.props.data[this.props.data.length-1][0]){
            this.props.setData(result);
          }
        } else { //失败
          console.log(result['msg'])
        }
      },err=>{
        console.log(err);
      });
    }, 5000)
  };
  componentWillUnmount() { //组件卸载时清除定时器
    clearInterval(this.timer);
  }
  
  getOption() {
    // console.log('data:',this.props.data);
    let data0 = this.props.splitData(this.props.data);
    let option = {
      title: {
        text: '今日实时价格',
        left: 0
      },
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
            var color = param.color;//图例颜色
            if(i===0){
              htmlStr += xName + '<br/>';//x轴的名称
            }
            htmlStr +='<div>';
            const point1 = (color) => {
              return '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:'+color+';"></span>';
            };
            htmlStr += point1(color);
            // htmlStr += seriesName+ '<br/>';
            htmlStr += '股价<br/>';
            var point2 = '<span style="margin-left:3px;margin-right:8px;display:inline-block;width:4px;height:4px;border-radius:2px;background-color:'+color+';"></span>';
            htmlStr += point2 + 'open：' + value[1] + '<br/>';
            htmlStr += point2 + 'close：' + value[2] + '<br/>';
            htmlStr += point2 + 'highest：' + value[3] + '<br/>';
            htmlStr += point2 + 'lowest：' + value[4] + '<br/>';
            var otherInfo = data0.otherInfo[xName];
            let color1 = '#888888'
            htmlStr += point1(color1) + '成交量：' + otherInfo[0] + '<br/>';
            htmlStr += point1(color1) + '成交额：' + otherInfo[1] + '<br/>';
            htmlStr += point1(color1) + '最新价：' + otherInfo[2] + '<br/>';
            htmlStr += '</div>';
          }
          return htmlStr;
         }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: data0.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          show: true,
          type: 'slider',
          top: '90%',
          start: 0,
          end: 100
        }
      ],
      series: [
        {
          name: '日K',
          type: 'candlestick',
          data: data0.values,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor
          },
          markPoint: {
            label: {
              formatter: function (param) {
                return param != null ? param.value + '' : '';
              }
            },
            data: [
              {
                name: 'highest value',
                type: 'max',
                valueDim: 'highest'
              },
              {
                name: 'lowest value',
                type: 'min',
                valueDim: 'lowest'
              },
              {
                name: 'average value on close',
                type: 'average',
                valueDim: 'close'
              }
            ],
            tooltip: {
              formatter: function (param) {
                return param.name + '<br>' + (param.data.coord || '');
              }
            }
          },
          markLine: {
            symbol: ['none', 'none'],
            data: [
              [
                {
                  name: 'from lowest to highest',
                  type: 'min',
                  valueDim: 'lowest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    show: false
                  },
                  emphasis: {
                    label: {
                      show: false
                    }
                  }
                },
                {
                  type: 'max',
                  valueDim: 'highest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    show: false
                  },
                  emphasis: {
                    label: {
                      show: false
                    }
                  }
                }
              ],
              {
                name: 'min line on close',
                type: 'min',
                valueDim: 'close'
              },
              {
                name: 'max line on close',
                type: 'max',
                valueDim: 'close'
              }
            ]
          }
        },
        
      ]
    };
    return option;
  };
  render(){
    // console.log('child data:',this.props.data[0]);
    return(
      <div>
        <EChartsReact option={this.getOption()}/>
      </div>
    );
  }
  
}
class StockDemo extends React.Component {
  constructor(props) {
    super(props);
    // console.log('props.info:',props.info);
    let stkcd = props.stkcd;
    this.state = {
      stkcd: stkcd,       //股票代码
      stkcd2: stkcd,
      info: {             //股票相关信息
        'name':'',        //股票简称
        'industry':'',    //行业
        'TTM':'',         //上市时间
        'MarCap':0.0,     //总市值
        'tradedCap':0.0,  //流通市值
        'stkIssue':0.0,   //总股本
        'tradedIssue':0.0,//流通股本
      },
      // info: props.info,   //股票相关信息
      data: [],           //股票实时数据
      historyData: [],    //股票历史数据
      buttonFlag: false,  //控制按钮是否可用
    };
    console.log('submit:',stkcd);
    
    axios.get("http://localhost:3000/stockInfo/"+stkcd).then((res)=>{
      var result=res.data;
      if(result['ret']===0)  {//成功
        this.setState({
          info: {
            'name':result['data']['name'],               //股票简称
            'industry':result['data']['industry'],       //行业
            'TTM':result['data']['TTM'],                 //上市时间
            'MarCap':result['data']['MarCap'],           //总市值
            'tradedCap':result['data']['tradedCap'],     //流通市值
            'stkIssue':result['data']['stkIssue'],       //总股本
            'tradedIssue':result['data']['tradedIssue'], //流通股本
          }
        });
      }else{
        console.log(result['msg']);
      };
    });
    
    axios.get("http://localhost:3000/stock365/"+stkcd).then((res)=>{
      var result=res.data;
      if(result['ret']===0)  {//成功
        this.setState({
          // info: {
          //   'name':result['data']['name'],               //股票简称
          //   'industry':result['data']['industry'],       //行业
          //   'TTM':result['data']['TTM'],                 //上市时间
          //   'MarCap':result['data']['MarCap'],           //总市值
          //   'tradedCap':result['data']['tradedCap'],     //流通市值
          //   'stkIssue':result['data']['stkIssue'],       //总股本
          //   'tradedIssue':result['data']['tradedIssue'], //流通股本
          // },
          historyData: result['data']['data'],
          //日期, 开盘, 收盘, 最高, 最低, 成交量, 成交额, 涨跌幅, 涨跌额, 换手率 
        });
        axios.get("http://localhost:3000/stock/"+stkcd).then((res2)=>{
          var result1=res2.data;
          if(result1['ret']===0)  {//成功
            this.setState({
              data: result1['data']['data'],
              //时间 2022-09-09 14:59:00, 开盘 0.0, 收盘 12.71, 最高, 最低, 成交量, 成交额, 最新价 
            });
          } else { //失败
            console.log(result['msg'])
          }
        },err2=>{
          console.log(err2);
        });
      } else { //失败
        console.log(result['msg'])
      }
    },err=>{
      console.log(err);
    });
  }
  splitData(rawData) {
    const categoryData = [];
    const values = [];
    var myDict = {};
    if(rawData.length!==0 && rawData[0].length===11){
      // const tradingNum = [];//成交量
      // const tradingValue = [];//成交额
      // const amplitude = [];//振幅
      // const changePercent = [];//涨跌幅
      // const changeAmount = [];//涨跌额
      // const turnoverRate = [];//换手率
      for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].slice(0, 1)[0]);
        values.push(rawData[i].slice(1,5));
        myDict[rawData[i].slice(0, 1)[0]] = rawData[i].slice(5,12);
        // tradingNum.push(rawData[i].slice(5,6)[0]);
        // tradingValue.push(rawData[i].slice(6,7)[0]);
        // amplitude.push(rawData[i].slice(7,8)[0]);
        // changePercent.push(rawData[i].slice(8,9)[0]);
        // changeAmount.push(rawData[i].slice(9,10)[0]);
        // turnoverRate.push(rawData[i].slice(10,11)[0]);
      }
      return {
        categoryData: categoryData,
        values: values,
        otherInfo: myDict,
        // tradingNum: tradingNum,
        // tradingValue: tradingValue,
        // amplitude: amplitude,
        // changePercent: changePercent,
        // changeAmount: changeAmount,
        // turnoverRate: turnoverRate
      };
    }
    for (let i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].slice(0, 1)[0]);
      values.push(rawData[i].slice(1,5));
      myDict[rawData[i].slice(0, 1)[0]] = rawData[i].slice(5,8);
    }
    return {
      categoryData: categoryData,
      values: values,
      otherInfo: myDict,
    };
  }
  setStkcd(stkcd) {
    if(stkcd.length===6) {
      console.log(stkcd);
      this.setState({
        stkcd: stkcd,
      })
    }
  }
  setStkcd2(stkcd) {
    console.log('prop.stkcd change',stkcd);
    this.setState({
      stkcd: stkcd,
      stkcd2: stkcd
    });
    axios.get("http://localhost:3000/stockInfo/"+stkcd).then((res)=>{
      var result=res.data;
      if(result['ret']===0)  {//成功
        this.setState({
          info: {
            'name':result['data']['name'],               //股票简称
            'industry':result['data']['industry'],       //行业
            'TTM':result['data']['TTM'],                 //上市时间
            'MarCap':result['data']['MarCap'],           //总市值
            'tradedCap':result['data']['tradedCap'],     //流通市值
            'stkIssue':result['data']['stkIssue'],       //总股本
            'tradedIssue':result['data']['tradedIssue'], //流通股本
          }
        });
      }else{
        console.log(result['msg']);
      };
    });
    axios.get("http://localhost:3000/stock365/"+stkcd).then((res)=>{
      var result=res.data;
      if(result['ret']===0)  {//成功
        this.setState({
          historyData: result['data']['data'],
          //日期, 开盘, 收盘, 最高, 最低, 成交量, 成交额, 涨跌幅, 涨跌额, 换手率 
        });
        axios.get("http://localhost:3000/stock/"+stkcd).then((res2)=>{
          var result1=res2.data;
          if(result1['ret']===0)  {//成功
            this.setState({
              data: result1['data']['data'],
              //时间 2022-09-09 14:59:00, 开盘 0.0, 收盘 12.71, 最高, 最低, 成交量, 成交额, 最新价 
            });
          } else { //失败
            console.log(result['msg'])
          }
        },err2=>{
          console.log(err2);
        });
      } else { //失败
        console.log(result['msg'])
      }
    },err=>{
      console.log(err);
    });
  }
  setResult(result) {
    // console.log('result["data"]["data"]:',result['data']['data']);
    this.setState({
      info: {
        'name':result['data']['name'],               //股票简称
        'industry':result['data']['industry'],       //行业
        'TTM':result['data']['TTM'],                 //上市时间
        'MarCap':result['data']['MarCap'],           //总市值
        'tradedCap':result['data']['tradedCap'],     //流通市值
        'stkIssue':result['data']['stkIssue'],       //总股本
        'tradedIssue':result['data']['tradedIssue'], //流通股本
      },
      historyData: result['data']['data'],
      //日期, 开盘, 收盘, 最高, 最低, 成交量, 成交额, 涨跌幅, 涨跌额, 换手率 
    });
  }
  setData(result) {
    // console.log('setData:',result['data']['data'][0][0]);
    this.setState({
      data: result['data']['data'],
      //时间 2022-09-09 14:59:00, 开盘 0.0, 收盘 12.71, 最高, 最低, 成交量, 成交额, 最新价 
    });
  }
  setButtonFlag(flag) {
    this.setState({
      buttonFlag:flag,
    });
  }
  setInfo() {
    this.setState({
      info: this.state.info
    });
  }
  render() {
    // console.log('parent data',this.state.data[0]);
    if(this.state.stkcd2!==this.props.stkcd){
      this.setStkcd2(this.props.stkcd);
      this.setInfo();
    }
    return(
      <div>
        {/* <p>实时股价</p> */}
        <SelectDemo 
          stkcd={this.state.stkcd}
          setStkcd={this.setStkcd.bind(this)}
          buttonFlag={this.state.buttonFlag}
          setButtonFlag={this.setButtonFlag.bind(this)}
          setResult={this.setResult.bind(this)}
          setData={this.setData.bind(this)}
        />
        <Divider></Divider>
        {this.state.info['name']===''?<div><p>暂无数据</p></div>:
          <div>
            <StockInfo info={this.state.info}/>
            <Divider/>
            {this.state.data.length===0?<div><p>暂未开市</p></div>:
            <StockPrice
              stkcd={this.state.stkcd}
              data={this.state.data}
              setData={this.setData.bind(this)}
              setResult={this.setResult.bind(this)}
              splitData={this.splitData.bind(this)}
            />
            }
            <Divider/>
            <StockHistoryPrice
              historyData={this.state.historyData}
              splitData={this.splitData.bind(this)}
            />
            
          </div>
        }
        <div>
          <p></p>
        </div>
      </div>
    );
  }
  
}
export default StockDemo;