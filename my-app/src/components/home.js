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

const axios = require('axios');
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
function Stock(props) {
  return(
    <div>
      <p>实时股价</p>
    </div>
  )
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
            <Stock/>
          </Col>
        </Row>
        {/* <Weather/>
        <Stock/> */}
      </div>
    )
  }
}
export default Home;