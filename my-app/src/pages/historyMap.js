import React from "react";
import "../index.css";
import {
  Menu,
  // Table,
  // Tabs,
  // Tooltip,
  Layout,
} from "antd";
import {
  Map,
  Marker,
  Label,
  // InfoWindow,
  ScaleControl,
  ZoomControl,
} from "react-bmapgl";
import MyInfoWindow from "../components/myInfoWindow";


const axios = require('axios');

// const {QuestionCircleOutlined} = icons;
// const { TabPane } = Tabs;
const { Content, Sider } = Layout;
// const { Column, ColumnGroup } = Table;
const city2districtId={
  '北京': 110100, '天津': 120100, '石家庄': 130100, '唐山': 130200, '保定': 130600, '太原': 140100, '呼和浩特': 150100, '包头': 150200, '沈阳': 210100, '大连': 210200, '鞍山': 210300, '长春': 220100, '吉林': 220200, '哈尔滨': 230100, '上海': 310100, '南京': 320100, '无锡': 320200, '徐州': 320300, '常州': 320400, '苏州': 320500, '南通': 320600, '连云港': 320700, '盐城': 320900, '扬州': 321000, '镇江': 321100, '泰州': 321200, '宿迁': 321300, '杭州': 330100, '宁波': 330200, '温州': 330300, '嘉兴': 330400, '湖州': 330500, '绍兴': 330600, '金华': 330700, '衢州': 330800, '台州': 331000, '合肥': 340100, '芜湖': 340200, '铜陵': 340700, '滁州': 341100, '福州': 350100, '厦门': 350200, '泉州': 350500, '漳州': 350600, '龙岩': 350800, '南昌': 360100, '赣州': 360700, '济南': 370100, '青岛': 370200, '淄博': 370300, '烟台': 370600, '潍坊': 370700, '济宁': 370800, '威海': 371000, '德州': 371400, '滨州': 371600, '郑州': 410100, '洛阳': 410300, '新乡': 410700, '焦作': 410800, '许昌': 411000, '南阳': 411300, '武汉': 420100, '宜昌': 420500, '襄阳': 420600, '荆门': 420800, '长沙': 430100, '株洲': 430200, '衡阳': 430400, '岳阳': 430600, '益阳': 430900, '广州': 440100, '深圳': 440300, '珠海': 440400, '汕头': 440500, '佛山': 440600, '江门': 440700, '肇庆': 441200, '惠州': 441300, '梅州': 441400, '东莞': 441900, '潮州': 445100, '揭阳': 445200, '南宁': 450100, '柳州': 450200, '桂林': 450300, '海口': 460100, '重庆': 500100, '成都': 510100, '德阳': 510600, '绵阳': 510700, '乐山': 511100, '贵阳': 520100, '昆明': 530100, '拉萨': 540100, '西安': 610100, '宝鸡': 610300, '兰州': 620100, '西宁': 630100, '银川': 640100, '乌鲁木齐': 650100
}
const cityInProvince = [
  ["北京市","北京"],
  ["上海市","上海"],
  ["天津市","天津"],
  ["重庆市","重庆"],
  ["安徽省","合肥","滁州","铜陵","芜湖"],
  ["福建省","福州","龙岩","泉州","厦门","漳州"],
  ["甘肃省","兰州"],
  ["广东省","广州","潮州","东莞","佛山","惠州","江门","揭阳","梅州","汕头","深圳","肇庆","珠海"],
  ["广西省","南宁","桂林","柳州"],
  ["贵州省","贵阳"],
  ["海南省","海口"],
  ["河北省","石家庄","保定","唐山"],
  ["河南省","郑州","焦作","洛阳","南阳","新乡","许昌"],
  ["黑龙江省","哈尔滨"],
  ["湖北省","武汉","荆门","襄阳","宜昌"],
  ["湖南省","长沙","衡阳","益阳","岳阳","株洲"],
  ["江苏省","南京","常州","连云港","南通","苏州","宿迁","泰州","无锡","徐州","盐城","扬州","镇江"],
  ["江西省","南昌","赣州"],
  ["吉林省","长春","吉林"],
  ["辽宁省","沈阳","鞍山","大连"],
  ["内蒙古","呼和浩特","包头"],
  ["宁夏","银川"],
  ["青海省","西宁"],
  ["山东省","济南","滨州","德州","济宁","青岛","威海","潍坊","烟台","淄博"],
  ["山西省","太原"],
  ["陕西省","西安","宝鸡"],
  ["四川省","成都","德阳","乐山","绵阳"],
  ["西藏","拉萨"],
  ["新疆","乌鲁木齐"],
  ["云南省","昆明"],
  ["浙江省","杭州","湖州","嘉兴","金华","宁波","衢州","绍兴","台州","温州"]
];
const cities = [
  { name: "北京", key: "北京", lng: "116.3956", lat: "39.9300" },
  { name: "上海", key: "上海", lng: "121.4879", lat: "31.2492" },
  { name: "天津", key: "天津", lng: "117.2108", lat: "39.1439" },
  { name: "重庆", key: "重庆", lng: "106.5306", lat: "29.5446" },
  { name: "合肥", key: "合肥", lng: "117.2827", lat: "31.8669" },
  { name: "滁州", key: "滁州", lng: "118.3246", lat: "32.3174" },
  { name: "铜陵", key: "铜陵", lng: "117.8194", lat: "30.9409" },
  { name: "芜湖", key: "芜湖", lng: "118.3841", lat: "31.3660" },
  { name: "福州", key: "福州", lng: "119.3302", lat: "26.0471" },
  { name: "龙岩", key: "龙岩", lng: "117.0180", lat: "25.0787" },
  { name: "泉州", key: "泉州", lng: "118.6004", lat: "24.9017" },
  { name: "厦门", key: "厦门", lng: "118.1039", lat: "24.4892" },
  { name: "漳州", key: "漳州", lng: "117.6762", lat: "24.5171" },
  { name: "兰州", key: "兰州", lng: "103.8233", lat: "36.0642" },
  { name: "广州", key: "广州", lng: "113.3077", lat: "23.1200" },
  { name: "潮州", key: "潮州", lng: "116.6301", lat: "23.6618" },
  { name: "东莞", key: "东莞", lng: "113.7634", lat: "23.0430" },
  { name: "佛山", key: "佛山", lng: "113.1340", lat: "23.0351" },
  { name: "惠州", key: "惠州", lng: "114.4107", lat: "23.1135" },
  { name: "江门", key: "江门", lng: "113.0781", lat: "22.5751" },
  { name: "揭阳", key: "揭阳", lng: "116.3795", lat: "23.5480" },
  { name: "梅州", key: "梅州", lng: "116.1264", lat: "24.3046" },
  { name: "汕头", key: "汕头", lng: "116.7287", lat: "23.3839" },
  { name: "深圳", key: "深圳", lng: "114.0260", lat: "22.5461" },
  { name: "肇庆", key: "肇庆", lng: "112.4797", lat: "23.0787" },
  { name: "珠海", key: "珠海", lng: "113.5624", lat: "22.2569" },
  { name: "南宁", key: "南宁", lng: "108.2972", lat: "22.8065" },
  { name: "桂林", key: "桂林", lng: "110.2609", lat: "25.2629" },
  { name: "柳州", key: "柳州", lng: "109.4224", lat: "24.3291" },
  { name: "贵阳", key: "贵阳", lng: "106.7092", lat: "26.6299" },
  { name: "海口", key: "海口", lng: "110.3308", lat: "20.0221" },
  { name: "石家庄", key: "石家庄", lng: "114.5221", lat: "38.0490" },
  { name: "保定", key: "保定", lng: "115.4948", lat: "38.8866" },
  { name: "唐山", key: "唐山", lng: "118.1835", lat: "39.6505" },
  { name: "郑州", key: "郑州", lng: "113.6496", lat: "34.7566" },
  { name: "焦作", key: "焦作", lng: "113.2118", lat: "35.2346" },
  { name: "洛阳", key: "洛阳", lng: "112.4475", lat: "34.6574" },
  { name: "南阳", key: "南阳", lng: "112.5428", lat: "33.0114" },
  { name: "新乡", key: "新乡", lng: "113.9127", lat: "35.3073" },
  { name: "许昌", key: "许昌", lng: "113.8353", lat: "34.0267" },
  { name: "哈尔滨", key: "哈尔滨", lng: "126.6577", lat: "45.7732" },
  { name: "武汉", key: "武汉", lng: "114.3162", lat: "30.5811" },
  { name: "荆门", key: "荆门", lng: "112.2173", lat: "31.0426" },
  { name: "襄阳", key: "襄阳", lng: "112.1763", lat: "32.0949" },
  { name: "宜昌", key: "宜昌", lng: "111.3110", lat: "30.7328" },
  { name: "长沙", key: "长沙", lng: "112.9794", lat: "28.2135" },
  { name: "衡阳", key: "衡阳", lng: "112.5838", lat: "26.8982" },
  { name: "益阳", key: "益阳", lng: "112.3665", lat: "28.5881" },
  { name: "岳阳", key: "岳阳", lng: "113.1462", lat: "29.3780" },
  { name: "株洲", key: "株洲", lng: "113.1317", lat: "27.8274" },
  { name: "南京", key: "南京", lng: "118.7781", lat: "32.0572" },
  { name: "常州", key: "常州", lng: "119.9819", lat: "31.7714" },
  { name: "连云港", key: "连云港", lng: "119.1739", lat: "34.6015" },
  { name: "南通", key: "南通", lng: "120.8738", lat: "32.0147" },
  { name: "苏州", key: "苏州", lng: "120.6199", lat: "31.3180" },
  { name: "宿迁", key: "宿迁", lng: "118.2969", lat: "33.9521" },
  { name: "泰州", key: "泰州", lng: "119.9196", lat: "32.4761" },
  { name: "无锡", key: "无锡", lng: "120.3055", lat: "31.5700" },
  { name: "徐州", key: "徐州", lng: "117.1881", lat: "34.2716" },
  { name: "盐城", key: "盐城", lng: "120.1489", lat: "33.3799" },
  { name: "扬州", key: "扬州", lng: "119.4278", lat: "32.4085" },
  { name: "镇江", key: "镇江", lng: "119.4558", lat: "32.2044" },
  { name: "南昌", key: "南昌", lng: "115.8935", lat: "28.6896" },
  { name: "赣州", key: "赣州", lng: "114.9359", lat: "25.8453" },
  { name: "长春", key: "长春", lng: "125.3136", lat: "43.8983" },
  { name: "吉林", key: "吉林", lng: "126.5645", lat: "43.8720" },
  { name: "沈阳", key: "沈阳", lng: "123.4328", lat: "41.8086" },
  { name: "鞍山", key: "鞍山", lng: "123.0078", lat: "41.1187" },
  { name: "大连", key: "大连", lng: "121.5935", lat: "38.9487" },
  { name: "呼和浩特", key: "呼和浩特", lng: "111.6604", lat: "40.8283" },
  { name: "包头", key: "包头", lng: "109.8462", lat: "40.6471" },
  { name: "银川", key: "银川", lng: "106.2065", lat: "38.5026" },
  { name: "西宁", key: "西宁", lng: "101.7679", lat: "36.6407" },
  { name: "济南", key: "济南", lng: "117.0250", lat: "36.6828" },
  { name: "滨州", key: "滨州", lng: "117.9683", lat: "37.4053" },
  { name: "德州", key: "德州", lng: "116.3282", lat: "37.4608" },
  { name: "济宁", key: "济宁", lng: "116.6008", lat: "35.4021" },
  { name: "青岛", key: "青岛", lng: "120.3844", lat: "36.1052" },
  { name: "威海", key: "威海", lng: "122.0940", lat: "37.5288" },
  { name: "潍坊", key: "潍坊", lng: "119.1426", lat: "36.7161" },
  { name: "烟台", key: "烟台", lng: "121.3096", lat: "37.5366" },
  { name: "淄博", key: "淄博", lng: "118.0591", lat: "36.8047" },
  { name: "太原", key: "太原", lng: "112.5509", lat: "37.8903" },
  { name: "西安", key: "西安", lng: "108.9531", lat: "34.2778" },
  { name: "宝鸡", key: "宝鸡", lng: "107.1706", lat: "34.3641" },
  { name: "成都", key: "成都", lng: "104.0679", lat: "30.6799" },
  { name: "德阳", key: "德阳", lng: "104.4024", lat: "31.1311" },
  { name: "乐山", key: "乐山", lng: "103.7608", lat: "29.6010" },
  { name: "绵阳", key: "绵阳", lng: "104.7055", lat: "31.5047" },
  { name: "拉萨", key: "拉萨", lng: "91.1119", lat: "29.6626" },
  { name: "乌鲁木齐", key: "乌鲁木齐", lng: "87.5650", lat: "43.8404" },
  { name: "昆明", key: "昆明", lng: "102.7146", lat: "25.0492" },
  { name: "杭州", key: "杭州", lng: "120.2194", lat: "30.2592" },
  { name: "湖州", key: "湖州", lng: "120.1372", lat: "30.8779" },
  { name: "嘉兴", key: "嘉兴", lng: "120.7604", lat: "30.7740" },
  { name: "金华", key: "金华", lng: "119.6526", lat: "29.1029" },
  { name: "宁波", key: "宁波", lng: "121.5790", lat: "29.8853" },
  { name: "衢州", key: "衢州", lng: "118.8758", lat: "28.9569" },
  { name: "绍兴", key: "绍兴", lng: "120.5925", lat: "30.0024" },
  { name: "台州", key: "台州", lng: "121.4406", lat: "28.6683" },
  { name: "温州", key: "温州", lng: "120.6906", lat: "28.0028" },
];
const provinces = [
  { name: "北京市", key: "北京市", lng: "116.3956", lat: "39.9300" },
  { name: "天津市", key: "天津市", lng: "117.2108", lat: "39.1439" },
  { name: "河北省", key: "河北省", lng: "114.5221", lat: "38.0490" },
  { name: "山西省", key: "山西省", lng: "112.5509", lat: "37.8903" },
  { name: "内蒙古", key: "内蒙古", lng: "111.6604", lat: "40.8283" },
  { name: "黑龙江省", key: "黑龙江省", lng: "126.6577", lat: "45.7700" },
  { name: "吉林省", key: "吉林省", lng: "125.3136", lat: "43.8983" },
  { name: "辽宁省", key: "辽宁省", lng: "123.4328", lat: "41.8086" },
  { name: "河南省", key: "河南省", lng: "113.6496", lat: "34.7566" },
  { name: "湖北省", key: "湖北省", lng: "114.3162", lat: "30.5811" },
  { name: "湖南省", key: "湖南省", lng: "112.9794", lat: "28.2135" },
  { name: "山东省", key: "山东省", lng: "117.0250", lat: "36.6828" },
  { name: "江苏省", key: "江苏省", lng: "118.7781", lat: "32.0572" },
  { name: "安徽省", key: "安徽省", lng: "117.2827", lat: "31.8669" },
  { name: "上海市", key: "上海市", lng: "121.4879", lat: "31.2492" },
  { name: "浙江省", key: "浙江省", lng: "120.2194", lat: "30.2592" },
  { name: "江西省", key: "江西省", lng: "115.8935", lat: "28.6896" },
  { name: "福建省", key: "福建省", lng: "119.3302", lat: "26.0471" },
  { name: "台湾", key: "台湾", lng: "121.5201", lat: "25.0307" },
  { name: "广东省", key: "广东省", lng: "113.3077", lat: "23.1200" },
  { name: "广西省", key: "广西省", lng: "108.2972", lat: "22.8065" },
  { name: "海南省", key: "海南省", lng: "110.3308", lat: "20.0221" },
  { name: "香港", key: "香港", lng: "114.1734", lat: "22.3200" },
  { name: "澳门", key: "澳门", lng: "113.5491", lat: "22.1990" },
  { name: "陕西省", key: "陕西省", lng: "108.9531", lat: "34.2778" },
  { name: "甘肃省", key: "甘肃省", lng: "103.8233", lat: "36.0642" },
  { name: "宁夏", key: "宁夏", lng: "106.2065", lat: "38.5026" },
  { name: "青海省", key: "青海省", lng: "101.7679", lat: "36.6407" },
  { name: "新疆", key: "新疆", lng: "87.5650", lat: "43.8404" },
  { name: "四川省", key: "四川省", lng: "104.0679", lat: "30.6799" },
  { name: "贵州省", key: "贵州省", lng: "106.7092", lat: "26.6299" },
  { name: "云南省", key: "云南省", lng: "102.7146", lat: "25.0492" },
  { name: "重庆市", key: "重庆市", lng: "106.5306", lat: "29.5446" },
  { name: "西藏", key: "西藏", lng: "91.1119", lat: "29.6626" },
];
const areas= [
  { name: "东北地区", key: "东北地区", lng: "126.5645", lat: "43.8720" },
  { name: "华北地区", key: "华北地区", lng: "116.3956", lat: "39.9300" },
  { name: "华中地区", key: "华中地区", lng: "112.2173", lat: "31.0426" },
  { name: "华东地区", key: "华东地区", lng: "118.7781", lat: "32.0572" },
  { name: "华南地区", key: "华南地区", lng: "112.4797", lat: "23.0787" },
  { name: "西北地区", key: "西北地区", lng: "101.7679", lat: "36.6407" },
  { name: "西南地区", key: "西南地区", lng: "103.7608", lat: "29.6010" },
];
function MySider(props) {
  const items = [
    // { label: "全图", key: "all" },
    {
      label: "东北地区",
      key: "东北地区",
      children: [
        { label: "黑龙江省", key: "黑龙江省" },
        { label: "吉林省", key: "吉林省" },
        { label: "辽宁省", key: "辽宁省" },
      ],
    },
    {
      label: "华北地区",
      key: "华北地区",
      children: [
        { label: "北京市", key: "北京市" },
        { label: "天津市", key: "天津市" },
        { label: "河北省", key: "河北省" },
        { label: "山西省", key: "山西省" },
        { label: "内蒙古", key: "内蒙古" },
      ],
    },
    {
      label: "华中地区",
      key: "华中地区",
      children: [
        { label: "河南省", key: "河南省" },
        { label: "湖北省", key: "湖北省" },
        { label: "湖南省", key: "湖南省" },
      ],
    },
    {
      label: "华东地区",
      key: "华东地区",
      children: [
        { label: "山东省", key: "山东省" },
        { label: "江苏省", key: "江苏省" },
        { label: "安徽省", key: "安徽省" },
        { label: "上海市", key: "上海市" },
        { label: "浙江省", key: "浙江省" },
        { label: "江西省", key: "江西省" },
        { label: "福建省", key: "福建省" },
        { label: "台湾", key: "台湾", disabled: true, },
      ],
    },
    {
      label: "华南地区",
      key: "华南地区",
      children: [
        { label: "广东省", key: "广东省" },
        { label: "广西省", key: "广西省" },
        { label: "海南省", key: "海南省" },
        { label: "香港", key: "香港", disabled: true, },
        { label: "澳门", key: "澳门", disabled: true, },
      ],
    },
    {
      label: "西北地区",
      key: "西北地区",
      children: [
        { label: "陕西省", key: "陕西省" },
        { label: "甘肃省", key: "甘肃省" },
        { label: "宁夏", key: "宁夏" },
        { label: "青海省", key: "青海省" },
        { label: "新疆", key: "新疆" },
      ],
    },
    {
      label: "西南地区",
      key: "西南地区",
      children: [
        { label: "四川省", key: "四川省" },
        { label: "贵州省", key: "贵州省" },
        { label: "云南省", key: "云南省" },
        { label: "重庆市", key: "重庆市" },
        { label: "西藏", key: "西藏" },
      ],
    },
  ];
  return (
    <Sider 
      collapsible 
      collapsed={props.collapsed} 
      onCollapse={(value) => props.setCollapsed(value)}
      style={{
        overflowY: 'auto',
        background: '#fff',
        // height: '100vh',
        // position: 'fixed',
        // left: 0,
        // top: 60,
        // bottom: 0,
      }}
    >
      <Menu
        className="site-layout-background"
        items={items}
        onClick={props.onClick}
        onOpenChange={props.menuChange}
        mode="inline"
        openKeys={props.openKeys}
        style={{ borderRight: 0}}
        // style={{ height: "120%", borderRight: 0}}
      />
    </Sider>
  );
}
function MyMarker(props) {
  let candidate = areas;
  if (props.zoom >= 7) {
    candidate = cities;
  } else if (props.zoom >= 6) {
    candidate = provinces;
  } else {
    candidate = areas;
  }
  // let valueTitle = (
  //   <div>{props.selectPosition.name+' '+props.selectWeather}
  //     <Tooltip placement="right" title="值(气象等级)：0—无雨，1-小雨，2-中雨，3-大雨，4-暴雨" arrowPointAtCenter>
  //       <LockOutlined/>
  //     </Tooltip>
  //   </div>);
  return (
    <div>
      {candidate.map((item) => {
        // console.log(item.name,item.lng,item.lat);
        return (
            <Marker
              key={item.name}
              name={item.name}
              position={{ lng: item.lng, lat: item.lat }}
              onClick={props.clickMarker}
              onMouseover={props.moveInMarker}
              
              // fillColor={'#1abc9c'}
              // onMouseout={this.moveOutMarker.bind(this)}
              // icon={"loc_blue"}
              icon={"simple_blue"}
            />
           
        );
      })}
      {candidate.map((item) => {
        // console.log(item.name,item.lng,item.lat);
        return (
          <Label
            key={item.name}
            text={item.name}
            style={{
              color: "#fff",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              padding: "0 10px",
              fontSize: "14px",
              lineHeight: "20px",
              border :"0",
              transform:'translateX(-50%)'

            }}
            position={{ lng: item.lng, lat: item.lat }}
            offset={new window.BMapGL.Size(0, 10)}
          />
        );
      })}
      {/* <InfoWindow
        position={{
          lng: props.selectPosition.lng,
          lat: props.selectPosition.lat,
        }}
        height={300}
        width={450}
        offset={new window.BMapGL.Size(0, -10)}
        title={props.selectPosition.name+' '+props.selectWeather}
        onClose={props.closeInfoWindow}
      >
       
        <Board 
          name={props.selectPosition.name} 
          selectWeather={props.selectWeather}
          level={props.selectWeather===''?1:0}
        />
      </InfoWindow> */}
      <MyInfoWindow
        selectPosition={props.selectPosition}
        selectWeather={props.selectWeather}
        isOpen={props.isOpen}
        isLocked={props.isLocked}
        closeInfoWindow={props.closeInfoWindow}
      />
    </div>
  );
}
class MyOverlay extends React.Component {
  constructor(props) {
    super(props);
    // var plys = [];
    var plys = [];
    var bdary = new window.BMapGL.Boundary();
    var area = [
      "北京市",
      "天津市",
      "河北省",
      "山西省",
      "内蒙古",
      "黑龙江省",
      "吉林省",
      "辽宁省",
      "河南省",
      "湖北省",
      "湖南省",
      "山东省",
      "江苏省",
      "安徽省",
      "上海市",
      "浙江省",
      "江西省",
      "福建省",
      "台湾",
      "广东省",
      "广西省",
      "海南省",
      "香港",
      "澳门",
      "陕西省",
      "甘肃省",
      "宁夏",
      "青海省",
      "新疆",
      "四川省",
      "贵州省",
      "云南省",
      "重庆市",
      "西藏",
    ];
    // for (let k = 0; k < props.area.length; k++) {
    for (let k = 0; k < area.length; k++) {
      plys[area[k]] = [];
      // bdary.get(props.area[k], function (rs) {
      bdary.get(area[k], function (rs) {
        var count = rs.boundaries.length;
        // console.log(area[k], count);

        //建立多边形覆盖物
        for (var i = 0; i < count; i++) {
          var ply = new window.BMapGL.Polygon(rs.boundaries[i], {
            // strokeWeight: 1,
            strokeOpacity: 0,
            // StrokeStyle: "solid",
            // strokeColor: props.fillColor,
            fillColor: props.fillColor,
            fillOpacity: 0.2,
          });
          plys[area[k]].push(ply);
          // plys.push(ply);
          props.map.addOverlay(ply); //添加覆盖物
          if (props.area.indexOf(area[k])===-1) {
            // console.log(area[k]);
            ply.hide();
            // continue;
          } //else ply.hide();
        }
      });
    }
    this.state = {
      plys: plys,
    };
  }
  render() {
    // console.log(this.props.area);
    // console.log(this.props.lastArea);
    if (this.props.area===this.props.lastArea) return null;
    for (let k = 0; k < this.props.lastArea.length; k++) {
      for (let i = 0; i < this.state.plys[this.props.lastArea[k]].length; i++) {
        this.state.plys[this.props.lastArea[k]][i].hide();
      }
    }
    for (let k = 0; k < this.props.area.length; k++) {
      for (let i = 0; i < this.state.plys[this.props.area[k]].length; i++) {
        this.state.plys[this.props.area[k]][i].show();
      }
    }
    return null;
  }
}
class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ["历史百分位", "换手率", "收益率"],
      result: [],
      // selectPosition: props.selectPosition,
      // lastPosition: "",
      setPosition: props.setPosition,
      // setLastPosition: props.setLastPosition,
      isLocked: false,//infowindow是否锁定
      zoomLevel: 5,
    };
  }
  clickMarker(e) {
    let name;
    let lng = e.target.latLng.lng.toFixed(4);
    let lat = e.target.latLng.lat.toFixed(4);
    let candidate =
      this.state.zoomLevel >= 7
        ? cities
        : this.state.zoomLevel >= 6
        ? provinces
        : areas;
    for (let i = 0; i < candidate.length; i++) {
      let item = candidate[i];
      if (item.lng === lng && item.lat === lat) {
        name = item.name;
      }
    }
    console.log("click",name);
    if (this.state.isLocked===false)
      this.setState({
        isLocked: true,
      });
    if(this.props.selectPosition.name!==name){
      // this.state.setLastPosition(this.props.selectPosition.name);
      this.state.setPosition(name, e.target.latLng.lng, e.target.latLng.lat);
    }
    
  }
  moveInMarker(e) {
    if(this.state.isLocked) return; 
    let name;
    let lng = e.target.latLng.lng.toFixed(4);
    let lat = e.target.latLng.lat.toFixed(4);
    let candidate =
      this.state.zoomLevel >= 7
        ? cities
        : this.state.zoomLevel >= 6
        ? provinces
        : areas;
    for (let i = 0; i < candidate.length; i++) {
      let item = candidate[i];
      if (item.lng === lng && item.lat === lat) {
        name = item.name;
      }
    }
    if (!name) {
      console.log(lng, lat);
    }
    console.log("move in",name);
    if(this.props.selectPosition.name!==name || this.props.isOpen===false){
      // this.state.setLastPosition(this.props.selectPosition.name);
      this.state.setPosition(name, e.target.latLng.lng, e.target.latLng.lat);
      this.props.setIsOpen(true);
    }
  }
  closeInfoWindow() {
    // console.log("close");
    if (this.state.isLocked) {
      this.setState({
        isLocked: false,
      });
    }else{
      this.props.setIsOpen(false);
    }
  }
  zoomChange(e) {
    // console.log('zoom change:',this.props.mapZoom,this.state.zoom,e.target.getZoom());
    this.setState({
        zoomLevel: this.props.mapZoom,
      });
    if ((Math.floor(this.state.zoomLevel)===Math.floor(e.target.getZoom())) || (Math.floor(this.state.zoomLevel)===7 && Math.floor(e.target.getZoom())===8)){
      return;
    }
    // console.log('zoomlevel:',Math.floor(this.state.zoomLevel));
    // console.log('mapzoom:',this.props.mapZoom);
    // console.log('getzoom():',Math.floor(e.target.getZoom()),e.target.getZoom());

    this.props.setMapZoom(e.target.getZoom());
    this.setState({
      zoomLevel: e.target.getZoom(),
    });
  }
  getArea(name) {
    // var name = this.props.selectPosition.name;
    if (name === "") return [];
    else if (name.endsWith("地区")){
      if (name === "东北地区") return ["黑龙江省", "吉林省", "辽宁省"];
      else if (name === "华北地区")
        return ["北京市", "天津市", "河北省", "山西省", "内蒙古"];
      else if (name === "华中地区") return ["河南省", "湖北省", "湖南省"];
      else if (name === "华东地区")
        return [
          "山东省",
          "江苏省",
          "安徽省",
          "上海市",
          "浙江省",
          "江西省",
          "福建省",
          "台湾",
        ];
      else if (name === "华南地区")
        return ["广东省", "广西省", "海南省", "香港", "澳门"];
      else if (name === "西北地区")
        return ["陕西省", "甘肃省", "宁夏", "青海省", "新疆"];
      else if (name === "西南地区")
        return ["四川省", "贵州省", "云南省", "重庆市", "西藏"];
      else return [];
    }
    else{
      for(let i = 0; i<cityInProvince.length; i++) {
        if(cityInProvince[i].indexOf(name)!==-1){
          return [cityInProvince[i][0]];
        }
      }
      return [name];
    }
  }
  render() {
    return (
      <Map
        // ref={ref => {this.map = ref.map}}
        style={{ height: '100%' }}
        center={{ lng: 112, lat: 44 }}
        zoom={this.props.mapZoom}
        minZoom={5}
        maxZoom={8}
        onZoomend={this.zoomChange.bind(this)}
        mapStyleV2={{ styleId: "88491c76638c3b433dc645550a9a5935" }}
        enableScrollWheelZoom
      >
        <MyMarker
          clickMarker={this.clickMarker.bind(this)}
          zoom={this.state.zoomLevel}
          moveInMarker={this.moveInMarker.bind(this)}
          selectPosition={this.props.selectPosition}
          selectWeather={this.props.selectWeather}
          closeInfoWindow={this.closeInfoWindow.bind(this)}
          isOpen={this.props.isOpen}
          isLocked={this.state.isLocked}
        />
        {/* <NavigationControl /> */}
        <ScaleControl />
        <ZoomControl />
        {/* <MyOverlay
          area={this.getArea(this.props.selectPosition.name)}
          lastArea={this.getArea(this.props.lastPosition)}
          // strokeColor={"#1abc9c"}
          fillColor={"#16a085"}
        /> */}
      </Map>
    );
  }
}
class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: ["华北地区"],
      selectPosition: { name: "华北地区", lng: "116.395645", lat: "39.929986" },
      selectWeather: '',
      // lastPosition: "",
      collapsed: false,//是否折叠sider
      mapZoom: 5,//地图缩放等级
      isOpen: false,//infowindow是否打开
    };
  }
  setMapZoom(i) {
    this.setState({
      mapZoom:i
    });
  }
  setPosition(name, lng, lat) {
    this.setState({
      selectPosition: { name: name, lng: lng, lat: lat },
    });
    this.getWeather(name);
  }
  setIsOpen(flag) {
    this.setState({
      isOpen: flag,
    });
  }
  // setLastPosition(name) {
  //   this.setState({
  //     lastPosition: name,
  //   });
  // }
  async getWeather(name) {
    // console.log(name);
    let result;
    if((name in city2districtId)===false) result = '';
    else{
      await axios.get(process.env.REACT_APP_API + "/weather/"+name).then((res)=>{
        let weatherInfo = res.data['data']['day'][0];
        // console.log(res.data['data']['day']);
        // console.log(weatherInfo['text']+' '+weatherInfo['low']+'­°C-'+weatherInfo['high']+'­°C');
        result = weatherInfo['text']+' '+weatherInfo['low']+'­°C-'+weatherInfo['high']+'­°C';

      },(err)=>{
        console.log(err);
        result = '';
      });
    }
    this.setState({
      selectWeather: result,
    });
  }
  menuOnClick(e) {
    console.log("menu click ", e, e.key);
    let lng, lat;
    for (let i = 0; i < provinces.length; i++) {
      let item = provinces[i];
      if (item.name === e.key) {
        lng = item.lng;
        lat = item.lat;
        break;
      }
    }
    // console.log(lng, lat);
    if (this.state.selectPosition.name!==e.key)
      this.setState({
        // selectName: e.key,
        // lastPosition: this.state.selectPosition.name,
        selectPosition: { name: e.key, lng: lng, lat: lat },
        selectWeather: '',
        mapZoom: 6.5,
        isOpen: true,
      });
  }
  menuChange(e) {
    // console.log(e);
    console.log('menu change:',e[e.length - 1]);
    let lng, lat;
    for (let i = 0; i < areas.length; i++) {
      let item = areas[i];
      if (item.name === e[e.length - 1]) {
        lng = item.lng;
        lat = item.lat;
        break;
      }
    }
    if (e.length >= 1) {
      // console.log(lng, lat);
      this.setState({
        // selectName: e.key,
        openKeys: [e[e.length - 1]],
        // lastPosition: this.state.selectPosition.name,
        selectPosition: { name: e[e.length - 1], lng: lng, lat: lat },
        selectWeather: '',
        mapZoom: 5,
        isOpen: true,
      });
    } else {
      this.setState({
        openKeys: e,
      });
    }
  }
  setCollapsed(value) {
    this.setState({
      collapsed: value
    })
  }
  render() {
    return (
      <Layout className="historymap">
        <MySider
          width={200}
          onClick={this.menuOnClick.bind(this)}
          menuChange={this.menuChange.bind(this)}
          openKeys={this.state.openKeys}
          collapsed={this.state.collapsed}
          setCollapsed={this.setCollapsed.bind(this)}
        />
        <Layout >
          <Content>
            <MyMap
              selectPosition={this.state.selectPosition}
              selectWeather={this.state.selectWeather}
              // lastPosition={this.state.lastPosition}
              setPosition={this.setPosition.bind(this)}
              // setLastPosition={this.setLastPosition.bind(this)}
              mapZoom={this.state.mapZoom}
              setMapZoom={this.setMapZoom.bind(this)}
              isOpen={this.state.isOpen}
              setIsOpen={this.setIsOpen.bind(this)}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default History;