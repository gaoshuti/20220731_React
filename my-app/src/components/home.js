import React, { useState } from "react";
import "../index.css";
import {
  Button,
  Cascader,
  Collapse,
  Checkbox,
  Col, 
  DatePicker,
  Divider,
  // Dropdown,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tag,
  Tabs,
  TreeSelect,
  Upload,
  
} from "antd";
import EChartsReact from 'echarts-for-react';

const axios = require('axios');
const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';

const city2districtId={
  '北京': 110100, '天津': 120100, '石家庄': 130100, '唐山': 130200, '保定': 130600, '太原': 140100, '呼和浩特': 150100, '包头': 150200, '沈阳': 210100, '大连': 210200, '鞍山': 210300, '长春': 220100, '吉林': 220200, '哈尔滨': 230100, '上海': 310100, '南京': 320100, '无锡': 320200, '徐州': 320300, '常州': 320400, '苏州': 320500, '南通': 320600, '连云港': 320700, '盐城': 320900, '扬州': 321000, '镇江': 321100, '泰州': 321200, '宿迁': 321300, '杭州': 330100, '宁波': 330200, '温州': 330300, '嘉兴': 330400, '湖州': 330500, '绍兴': 330600, '金华': 330700, '衢州': 330800, '台州': 331000, '合肥': 340100, '芜湖': 340200, '铜陵': 340700, '滁州': 341100, '福州': 350100, '厦门': 350200, '泉州': 350500, '漳州': 350600, '龙岩': 350800, '南昌': 360100, '赣州': 360700, '济南': 370100, '青岛': 370200, '淄博': 370300, '烟台': 370600, '潍坊': 370700, '济宁': 370800, '威海': 371000, '德州': 371400, '滨州': 371600, '郑州': 410100, '洛阳': 410300, '新乡': 410700, '焦作': 410800, '许昌': 411000, '南阳': 411300, '武汉': 420100, '宜昌': 420500, '襄阳': 420600, '荆门': 420800, '长沙': 430100, '株洲': 430200, '衡阳': 430400, '岳阳': 430600, '益阳': 430900, '广州': 440100, '深圳': 440300, '珠海': 440400, '汕头': 440500, '佛山': 440600, '江门': 440700, '肇庆': 441200, '惠州': 441300, '梅州': 441400, '东莞': 441900, '潮州': 445100, '揭阳': 445200, '南宁': 450100, '柳州': 450200, '桂林': 450300, '海口': 460100, '重庆': 500100, '成都': 510100, '德阳': 510600, '绵阳': 510700, '乐山': 511100, '贵阳': 520100, '昆明': 530100, '拉萨': 540100, '西安': 610100, '宝鸡': 610300, '兰州': 620100, '西宁': 630100, '银川': 640100, '乌鲁木齐': 650100
}

// 实时股价+天气预报
class Weather extends React.Component{
  constructor(props) {
    super(props);
    // var result;
    this.state = {
      city: '北京',
      nowWeather: '', // 实时天气数据
      dayWeather: [], // 今天向后的三天天气数据
    };
    axios.get("http://localhost:3000/weather/"+city2districtId['北京']).then((res)=>{
      console.log(res.data['data']['city']);
      this.setState({
        nowWeather: res.data['data']['now'],
        dayWeather: res.data['data']['day'],
      })
    },(err)=>{
      console.log(err);
    });
  }
  
  onChange(value, selectedOptions) {
    axios.get("http://localhost:3000/weather/"+city2districtId[value[1]]).then((res)=>{
      console.log(res.data['data']['now']);
      console.log(res.data['data']['day']);

      this.setState({
        city: value[1],
        nowWeather: res.data['data']['now'],
        dayWeather: res.data['data']['day'],
      })
    },(err)=>{
      console.log(err);
    });
  };
  render(){
    const options=[
      { label: "黑龙江省", value: "黑龙江省", key: "黑龙江省",
        children: [
          {label: "哈尔滨", value: "哈尔滨", key: "哈尔滨"}
        ]
      },
      { label: "吉林省", value: "吉林省", key: "吉林省",
        children: [
          {label: "长春", value: "长春", key: "长春"},
          {label: "吉林", value: "吉林", key: "吉林"}
        ]
      },
      { label: "辽宁省", value: "辽宁省", key: "辽宁省",
        children: [
          {label: "沈阳", value: "沈阳", key: "沈阳"},
          {label: "鞍山", value: "鞍山", key: "鞍山"},
          {label: "大连", value: "大连", key: "大连"}
        ]
      }, 
      { label: "北京市", value: "北京市", key: "北京市",
        children: [
          {label: "北京", value: "北京", key: "北京"},
        ]
      },
      { label: "天津市", value: "天津市", key: "天津市",
        children: [
          {label: "天津", value: "天津", key: "天津"},
        ]
      },
      { label: "河北省", value: "河北省", key: "河北省",
        children: [
          {label: "石家庄", value: "石家庄", key: "石家庄"},
          {label: "保定", value: "保定", key: "保定"},
          {label: "唐山", value: "唐山", key: "唐山"},
        ]
      },
      { label: "山西省", value: "山西省", key: "山西省",
        children: [
          {label: "太原", value: "太原", key: "太原"},
        ]
      },
      { label: "内蒙古", value: "内蒙古", key: "内蒙古",
        children: [
          {label: "呼和浩特", value: "呼和浩特", key: "呼和浩特"},
          {label: "包头", value: "包头", key: "包头"}
        ]
      },
      { label: "河南省", value: "河南省", key: "河南省",
        children: [
          {label: "郑州", value: "郑州", key: "郑州"},
          {label: "焦作", value: "焦作", key: "焦作"},
          {label: "洛阳", value: "洛阳", key: "洛阳"},
          {label: "南阳", value: "南阳", key: "南阳"},
          {label: "新乡", value: "新乡", key: "新乡"},
          {label: "许昌", value: "许昌", key: "许昌"},
        ]
      },
      { label: "湖北省", value: "湖北省", key: "湖北省",
        children: [
          {label: "武汉", value: "武汉", key: "武汉"},
          {label: "荆门", value: "荆门", key: "荆门"},
          {label: "襄阳", value: "襄阳", key: "襄阳"},
          {label: "宜昌", value: "宜昌", key: "宜昌"},
        ]
      },
      { label: "湖南省", value: "湖南省", key: "湖南省",
        children: [
          {label: "长沙", value: "长沙", key: "长沙"},
          {label: "衡阳", value: "衡阳", key: "衡阳"},
          {label: "益阳", value: "益阳", key: "益阳"},
          {label: "岳阳", value: "岳阳", key: "岳阳"},
          {label: "株洲", value: "株洲", key: "株洲"},
        ]
      }, 
      { label: "山东省", value: "山东省", key: "山东省",
        children: [
          {label: "济南", value: "济南", key: "济南"},
          {label: "滨州", value: "滨州", key: "滨州"},
          {label: "德州", value: "德州", key: "德州"},
          {label: "济宁", value: "济宁", key: "济宁"},
          {label: "青岛", value: "青岛", key: "青岛"},
          {label: "威海", value: "威海", key: "威海"},
          {label: "潍坊", value: "潍坊", key: "潍坊"},
          {label: "烟台", value: "烟台", key: "烟台"},
          {label: "淄博", value: "淄博", key: "淄博"},
        ]
      },
      { label: "江苏省", value: "江苏省", key: "江苏省",
        children: [
          {label: "南京", value: "南京", key: "南京"},
          {label: "常州", value: "常州", key: "常州"},
          {label: "连云港", value: "连云港", key: "连云港"},
          {label: "南通", value: "南通", key: "南通"},
          {label: "苏州", value: "苏州", key: "苏州"},
          {label: "宿迁", value: "宿迁", key: "宿迁"},
          {label: "泰州", value: "泰州", key: "泰州"},
          {label: "无锡", value: "无锡", key: "无锡"},
          {label: "徐州", value: "徐州", key: "徐州"},
          {label: "盐城", value: "盐城", key: "盐城"},
          {label: "扬州", value: "扬州", key: "扬州"},
          {label: "镇江", value: "镇江", key: "镇江"},
        ]
      },
      { label: "安徽省", value: "安徽省", key: "安徽省",
        children: [
          {label: "合肥", value: "合肥", key: "合肥"},
          {label: "滁州", value: "滁州", key: "滁州"},
          {label: "铜陵", value: "铜陵", key: "铜陵"},
          {label: "芜湖", value: "芜湖", key: "芜湖"},
        ]
      },
      { label: "上海市", value: "上海市", key: "上海市",
        children: [
          {label: "上海", value: "上海", key: "上海"},
        ]
      },
      { label: "浙江省", value: "浙江省", key: "浙江省",
        children: [
          {label: "杭州", value: "杭州", key: "杭州"},
          {label: "嘉兴", value: "嘉兴", key: "嘉兴"},
          {label: "湖州", value: "湖州", key: "湖州"},
          {label: "金华", value: "金华", key: "金华"},
          {label: "宁波", value: "宁波", key: "宁波"},
          {label: "衢州", value: "衢州", key: "衢州"},
          {label: "绍兴", value: "绍兴", key: "绍兴"},
          {label: "台州", value: "台州", key: "台州"},
          {label: "温州", value: "温州", key: "温州"},
        ]
      },
      { label: "江西省", value: "江西省", key: "江西省",
        children: [
          {label: "南昌", value: "南昌", key: "南昌"},
          {label: "赣州", value: "赣州", key: "赣州"},
        ]
      },
      { label: "福建省", value: "福建省", key: "福建省",
        children: [
          {label: "福州", value: "福州", key: "福州"},
          {label: "龙岩", value: "龙岩", key: "龙岩"},
          {label: "泉州", value: "泉州", key: "泉州"},
          {label: "厦门", value: "厦门", key: "厦门"},
          {label: "漳州", value: "漳州", key: "漳州"},
        ]
      },
      { label: "台湾", value: "台湾", key: "台湾", disabled:true },
      { label: "广东省", value: "广东省", key: "广东省",
        children: [
          {label: "广州", value: "广州", key: "广州"},
          {label: "潮州", value: "潮州", key: "潮州"},
          {label: "东莞", value: "东莞", key: "东莞"},
          {label: "佛山", value: "佛山", key: "佛山"},
          {label: "惠州", value: "惠州", key: "惠州"},
          {label: "江门", value: "江门", key: "江门"},
          {label: "揭阳", value: "揭阳", key: "揭阳"},
          {label: "梅州", value: "梅州", key: "梅州"},
          {label: "汕头", value: "汕头", key: "汕头"},
          {label: "深圳", value: "深圳", key: "深圳"},
          {label: "肇庆", value: "肇庆", key: "肇庆"},
          {label: "珠海", value: "珠海", key: "珠海"},
        ]
      },
      { label: "广西省", value: "广西省", key: "广西省",
        children: [
          {label: "南宁", value: "南宁", key: "南宁"},
          {label: "桂林", value: "桂林", key: "桂林"},
          {label: "柳州", value: "柳州", key: "柳州"},
        ]
      },
      { label: "海南省", value: "海南省", key: "海南省",
        children: [
          {label: "海口", value: "海口", key: "海口"},
        ]
      },
      { label: "香港", value: "香港", key: "香港", disabled:true },
      { label: "澳门", value: "澳门", key: "澳门", disabled:true },
      { label: "陕西省", value: "陕西省", key: "陕西省",
        children: [
          {label: "西安", value: "西安", key: "西安"},
          {label: "宝鸡", value: "宝鸡", key: "宝鸡"},
        ]
      },
      { label: "甘肃省", value: "甘肃省", key: "甘肃省",
        children: [
          {label: "兰州", value: "兰州", key: "兰州"},
        ]
      },
      { label: "宁夏", value: "宁夏", key: "宁夏",
        children: [
          {label: "银川", value: "银川", key: "银川"},
        ]
      },
      { label: "青海省", value: "青海省", key: "青海省",
        children: [
          {label: "西宁", value: "西宁", key: "西宁"},
        ]
      },
      { label: "新疆", value: "新疆", key: "新疆",
        children: [
          {label: "乌鲁木齐", value: "乌鲁木齐", key: "乌鲁木齐"},
        ]
      },
      { label: "四川省", value: "四川省", key: "四川省",
        children: [
          {label: "成都", value: "成都", key: "成都"},
          {label: "德阳", value: "德阳", key: "德阳"},
          {label: "乐山", value: "乐山", key: "乐山"},
          {label: "绵阳", value: "绵阳", key: "绵阳"},
        ]
      },
      { label: "贵州省", value: "贵州省", key: "贵州省",
        children: [
          {label: "贵阳", value: "贵阳", key: "贵阳"},
        ]
      },
      { label: "云南省", value: "云南省", key: "云南省",
        children: [
          {label: "昆明", value: "昆明", key: "昆明"},
        ]
      },
      { label: "重庆市", value: "重庆市", key: "重庆市",
        children: [
          {label: "重庆", value: "重庆", key: "重庆"},
        ]
      },
      { label: "西藏", value: "西藏", key: "西藏",
        children: [
          {label: "拉萨", value: "拉萨", key: "拉萨"},
        ]
      },
    ];
    const filter=(inputValue, path)=> {
      path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }
    return(
      <div
        style={{textAlign:'center'}}
      >
        <Cascader
          options={options}
          bordered={false}
          allowClear={false}
          onChange={this.onChange.bind(this)}
          expandTrigger="hover"
          placeholder="Please select"
          defaultValue={['北京市','北京']}
          showSearch={{
            filter,
          }}
          onSearch={(value) => console.log(value)}
        />
        <p></p>
        <div>
          <p>实时温度</p>
          <p>{this.state.nowWeather['temp']}­°C</p>
          <p>{this.state.nowWeather['text']}</p>
          <p>{this.state.nowWeather['wind_dir']} {this.state.nowWeather['wind_class']}</p>
        </div>
        <Divider></Divider>
        <div>
          <Row>
            {this.state.dayWeather.map((item) => {
              console.log(item);
              return (
                <Col span={8} key={item['date']}>
                  <p>{item['date'].slice(5)}</p>
                  <p>{item['week']}</p>
                  <p>{item['text']}</p>
                  <p>{item['low']}­°C-{item['high']}­°C</p>
                  <p>{item['wind_dir']} {item['wind_class']}</p>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}
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
        <Form.Item name='stkcd' label="实时报价"
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
                defaultValue={props.stkcd}	
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
  console.log('history:',props.historyData[0]);//日期, 开盘, 收盘, 最高, 最低, 成交量, 成交额, 涨跌幅, 涨跌额, 换手率 
  let data0 = props.splitData(props.historyData);
  // console.log(data0.values);
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
          var seriesName = param.seriesName;//图例名称
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
          htmlStr += '股价' + '<br/>';
          var point2 = '<span style="margin-left:3px;margin-right:8px;display:inline-block;width:4px;height:4px;border-radius:2px;background-color:'+color+';"></span>';
          htmlStr += point2 + 'open：' + value[1] + '<br/>';
          htmlStr += point2 + 'close：' + value[2] + '<br/>';
          htmlStr += point2 + 'lowest：' + value[3] + '<br/>';
          htmlStr += point2 + 'highest：' + value[4] + '<br/>';
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
              return param != null ? Math.round(param.value) + '' : '';
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
        if(result['ret']===0)  {//成功
          if(res.data['data']['data'][res.data['data']['data'].length-1][0]!==this.props.data[this.props.data.length-1][0]){
            this.props.setData(result);
          }
          // console.log('loading:',result['data']['data'][0][0])
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
                return param != null ? Math.round(param.value) + '' : '';
              }
            },
            data: [
              // {
              //   name: 'Mark',
              //   coord: ['2013/5/31', 2300],
              //   value: 2300,
              //   itemStyle: {
              //     color: 'rgb(41,60,85)'
              //   }
              // },
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
    this.state = {
      stkcd: '000001',    //证券代码
      info: {             //股票相关信息
        'name':'',        //股票简称
        'industry':'',    //行业
        'TTM':'',         //上市时间
        'MarCap':0.0,     //总市值
        'tradedCap':0.0,  //流通市值
        'stkIssue':0.0,   //总股本
        'tradedIssue':0.0,//流通股本
      },
      data: [],           //股票实时数据
      historyData: [],    //股票历史数据
      buttonFlag: false,  //控制按钮是否可用
    };
  }
  splitData(rawData) {
    const categoryData = [];
    const values = [];
    console.log('rawdata length:',rawData[0].length);
    if(rawData.length!==0 && rawData[0].length===11){
      var myDict = {};
      // const tradingNum = [];//成交量
      // const tradingValue = [];//成交额
      // const amplitude = [];//振幅
      // const changePercent = [];//涨跌幅
      // const changeAmount = [];//涨跌额
      // const turnoverRate = [];//换手率
      for (var i = 0; i < rawData.length; i++) {
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
      // console.log(myDict);
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
    for (var i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].slice(0, 1)[0]);
      values.push(rawData[i].slice(1,5));
    }
    return {
      categoryData: categoryData,
      values: values
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
  render() {
    // console.log('parent data',this.state.data[0]);
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
class Home extends React.Component {
  render(){
    return(
      <div 
      >
        <p></p>
        <Row>
          <Col span={7}>
            <Weather/>
          </Col>
          <Col span={1}></Col>
          <Col span={16}>
            <StockDemo/>
          </Col>
        </Row>
        {/* <Weather/>
        <Stock/> */}
      </div>
    )
  }
}
export default Home;