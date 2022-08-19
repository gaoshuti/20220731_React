import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  // Button,
  // Dropdown,
  Menu,
  Space,
  Table,
  Tag,
  Tabs,
  Input,
  Layout,
  Collapse,
} from "antd";
// import { CompassOutlined } from "@ant-design/icons";
import {
  Map,
  Marker,
  NavigationControl,
  InfoWindow,
  ScaleControl,
  // Polyline,
  // Polygon,
  ZoomControl,
} from "react-bmapgl";
import SizeContext from "antd/lib/config-provider/SizeContext";
import { getKeyThenIncreaseKey } from "antd/lib/message";

const { TabPane } = Tabs;
const { Search } = Input;
const { Header, Content, Sider } = Layout;
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;

const onSearch = (value) => console.log(value);
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

function MyHeader(props) {
  const items = [
    { label: "主页", key: "home" }, // 菜单项务必填写 key
    // { label: '菜单项二', key: 'item-2' },
    {
      label: "功能",
      key: "function",
      children: [
        { label: "历史百分比", key: "function-1" },
        { label: "回归", key: "function-2" },
        { label: "股价预测", key: "function-3" },
      ],
    },
  ];

  return (
    <Header>
      <div className="logo" />
      <div className="search">
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
        />
      </div>
      <Menu
        theme="dark"
        items={items}
        mode="horizontal"
        onClick={props.onClick}
      />
    </Header>
  );
}
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
        { label: "台湾", key: "台湾" },
      ],
    },
    {
      label: "华南地区",
      key: "华南地区",
      children: [
        { label: "广东省", key: "广东省" },
        { label: "广西省", key: "广西省" },
        { label: "海南省", key: "海南省" },
        { label: "香港", key: "香港" },
        { label: "澳门", key: "澳门" },
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
function SubPage(props) {
  const data = [
    {
      key: '1',
      year: '2011',
      num1: 11.00,
      average1: 12.00,
      percentage1: 1,
      num2: 13.00,
      average2: 14.00,
      percentage2: 1,
    },
    {
      key: '2',
      year: '2012',
      num1: 21.00,
      average1: 22.00,
      percentage1: 2,
      num2: 23.00,
      average2: 24.00,
      percentage2: 2,
    },
    {
      key: '3',
      year: '2013',
      num1: 31.00,
      average1: 32.00,
      percentage1: 3,
      num2: 33.00,
      average2: 34.00,
      percentage2: 3,
    },
  ];
  
  return (
    <Table dataSource={data}>
      <Column title="Year" dataIndex="year" key="year" />
      <ColumnGroup title="Snow">
        <Column title="Num" dataIndex="num1" key="num1" />
        <Column title="Average" dataIndex="average1" key="average1" />
        <Column title="Percentage" dataIndex="percentage1" key="percentage1" />
      </ColumnGroup>
      <ColumnGroup title="NoSnow">
        <Column title="Num" dataIndex="num2" key="num2" />
        <Column title="Average" dataIndex="average2" key="average2" />
        <Column title="Percentage" dataIndex="percentage2" key="percentage2" />
      </ColumnGroup>
      {/* <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags) => (
          <>
            {tags.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        )}
      /> */}
      {/* <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <a>Invite {record.lastName}</a>
            <a>Delete</a>
          </Space>
        )}
      /> */}
    </Table>
  );
  
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ["历史百分位", "换手率", "回报率"],
      cixu: [1, 2, 3],
      result: [],
    };
  }
  render() {
    return (
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab={this.state.name[0]} key="1">
            <SubPage cixu={this.state.cixu[0]} />
          </TabPane>
          <TabPane tab={this.state.name[1]} key="2">
            <SubPage cixu={this.state.cixu[1]} />
          </TabPane>
          <TabPane tab={this.state.name[2]} key="3">
            <SubPage cixu={this.state.cixu[2]} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
function MyMarker(props) {
  let candidate = props.areas;
  if (props.zoom >= 7) {
    candidate = props.cities;
  } else if (props.zoom >= 6) {
    candidate = props.provinces;
  } else {
    candidate = props.areas;
  }
  return (
    <div>
      {/* {(zoom >= 7? props.cities:(zoom >= 6? props.provinces:props.areas)) */}
      {candidate.map((item) => {
        // console.log(item.name,item.lng,item.lat);
        return (
          // <div>
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
          // </div>
        );
      })}
      <InfoWindow
        position={{
          lng: props.selectPosition.lng,
          lat: props.selectPosition.lat,
        }}
        height={350}
        width={700}
        offset={new window.BMapGL.Size(0, -10)}
        title={props.selectPosition.name}
        onClose={props.closeInfoWindow}
      >
        <Board />
      </InfoWindow>
    </div>
  );
}
class MyOverlay extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.area,"北京市" in props.area);
    // var plys = [];
    var plys = new Array();
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
        console.log(area[k], count);

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
    // var fso=new ActiveXObject(Scripting.FileSystemObject);
    // var f=fso.createtextfile("/Users/rumeng/Downloads/qingzang/map/辽宁省.txt",2,true);
    // f.writeLine("helloworld");
    // f.close();
    this.state = {
      name: ["历史百分位", "换手率", "回归率"],
      cities: props.cities,
      provinces: props.provinces,
      areas: props.areas,
      result: [],
      // selectPosition: props.selectPosition,
      lastPosition: "",
      setPosition: props.setPosition,
      setLastPosition: props.setLastPosition,
      isLocked: false,
      zoomLevel: 5,
    };
  }
  clickMarker(e) {
    let name;
    let lng = e.target.latLng.lng.toFixed(4);
    let lat = e.target.latLng.lat.toFixed(4);
    let candidate =
      this.state.zoomLevel >= 7
        ? this.state.cities
        : this.state.zoomLevel >= 6
        ? this.state.provinces
        : this.state.areas;
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
      this.state.setLastPosition(this.props.selectPosition.name);
      this.state.setPosition(name, e.target.latLng.lng, e.target.latLng.lat);
    }
    
  }
  moveInMarker(e) {
    let name;
    let lng = e.target.latLng.lng.toFixed(4);
    let lat = e.target.latLng.lat.toFixed(4);
    let candidate =
      this.state.zoomLevel >= 7
        ? this.state.cities
        : this.state.zoomLevel >= 6
        ? this.state.provinces
        : this.state.areas;
    for (let i = 0; i < candidate.length; i++) {
      let item = candidate[i];
      if (item.lng === lng && item.lat === lat) {
        name = item.name;
      }
    }
    if (!name) {
      console.log(lng, lat);
    }
    if (!this.state.isLocked) {
      console.log("move in",name);
      if(this.props.selectPosition.name!==name){
        this.state.setLastPosition(this.props.selectPosition.name);
        this.state.setPosition(name, e.target.latLng.lng, e.target.latLng.lat);
      }
    }
  }
  // moveOutMarker() {
  //   console.log("move out");
  //   this.setState({
  //     selectCity: ""
  //   });
  // }
  closeInfoWindow() {
    console.log("close");
    if (this.state.isLocked) {
      this.setState({
        isLocked: false,
      });
    }
  }
  zoomChange(e) {
    // console.log(this);
    // console.log(e.target.getZoom());
    if (Math.floor(this.state.zoomLevel)===Math.floor(e.target.getZoom())) return;
    if (Math.floor(this.state.zoomLevel)===7 && Math.floor(e.target.getZoom())===8) return;
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
        center={{ lng: 104, lat: 37 }}
        zoom={5}
        minZoom={5}
        maxZoom={8}
        onZoomend={this.zoomChange.bind(this)}
        mapStyleV2={{ styleId: "88491c76638c3b433dc645550a9a5935" }}
        enableScrollWheelZoom
      >
        <MyMarker
          cities={this.state.cities}
          provinces={this.state.provinces}
          areas={this.state.areas}
          clickMarker={this.clickMarker.bind(this)}
          zoom={this.state.zoomLevel}
          moveInMarker={this.moveInMarker.bind(this)}
          selectPosition={this.props.selectPosition}
          closeInfoWindow={this.closeInfoWindow.bind(this)}
        />
        <NavigationControl />
        <ScaleControl />
        <ZoomControl />
        <MyOverlay
          area={this.getArea(this.props.selectPosition.name)}
          lastArea={this.getArea(this.props.lastPosition)}
          // strokeColor={"#1abc9c"}
          fillColor={"#16a085"}
        />
      </Map>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        { name: "北京", lng: "116.3956", lat: "39.9300" },
        { name: "上海", lng: "121.4879", lat: "31.2492" },
        { name: "天津", lng: "117.2108", lat: "39.1439" },
        { name: "重庆", lng: "106.5306", lat: "29.5446" },
        { name: "合肥", lng: "117.2827", lat: "31.8669" },
        { name: "滁州", lng: "118.3246", lat: "32.3174" },
        { name: "铜陵", lng: "117.8194", lat: "30.9409" },
        { name: "芜湖", lng: "118.3841", lat: "31.3660" },
        { name: "福州", lng: "119.3302", lat: "26.0471" },
        { name: "龙岩", lng: "117.0180", lat: "25.0787" },
        { name: "泉州", lng: "118.6004", lat: "24.9017" },
        { name: "厦门", lng: "118.1039", lat: "24.4892" },
        { name: "漳州", lng: "117.6762", lat: "24.5171" },
        { name: "兰州", lng: "103.8233", lat: "36.0642" },
        { name: "广州", lng: "113.3077", lat: "23.1200" },
        { name: "潮州", lng: "116.6301", lat: "23.6618" },
        { name: "东莞", lng: "113.7634", lat: "23.0430" },
        { name: "佛山", lng: "113.1340", lat: "23.0351" },
        { name: "惠州", lng: "114.4107", lat: "23.1135" },
        { name: "江门", lng: "113.0781", lat: "22.5751" },
        { name: "揭阳", lng: "116.3795", lat: "23.5480" },
        { name: "梅州", lng: "116.1264", lat: "24.3046" },
        { name: "汕头", lng: "116.7287", lat: "23.3839" },
        { name: "深圳", lng: "114.0260", lat: "22.5461" },
        { name: "肇庆", lng: "112.4797", lat: "23.0787" },
        { name: "珠海", lng: "113.5624", lat: "22.2569" },
        { name: "南宁", lng: "108.2972", lat: "22.8065" },
        { name: "桂林", lng: "110.2609", lat: "25.2629" },
        { name: "柳州", lng: "109.4224", lat: "24.3291" },
        { name: "贵阳", lng: "106.7092", lat: "26.6299" },
        { name: "海口", lng: "110.3308", lat: "20.0221" },
        { name: "石家庄", lng: "114.5221", lat: "38.0490" },
        { name: "保定", lng: "115.4948", lat: "38.8866" },
        { name: "唐山", lng: "118.1835", lat: "39.6505" },
        { name: "郑州", lng: "113.6496", lat: "34.7566" },
        { name: "焦作", lng: "113.2118", lat: "35.2346" },
        { name: "洛阳", lng: "112.4475", lat: "34.6574" },
        { name: "南阳", lng: "112.5428", lat: "33.0114" },
        { name: "新乡", lng: "113.9127", lat: "35.3073" },
        { name: "许昌", lng: "113.8353", lat: "34.0267" },
        { name: "哈尔滨", lng: "126.6577", lat: "45.7732" },
        { name: "武汉", lng: "114.3162", lat: "30.5811" },
        { name: "荆门", lng: "112.2173", lat: "31.0426" },
        { name: "襄阳", lng: "112.1763", lat: "32.0949" },
        { name: "宜昌", lng: "111.3110", lat: "30.7328" },
        { name: "长沙", lng: "112.9794", lat: "28.2135" },
        { name: "衡阳", lng: "112.5838", lat: "26.8982" },
        { name: "益阳", lng: "112.3665", lat: "28.5881" },
        { name: "岳阳", lng: "113.1462", lat: "29.3780" },
        { name: "株洲", lng: "113.1317", lat: "27.8274" },
        { name: "南京", lng: "118.7781", lat: "32.0572" },
        { name: "常州", lng: "119.9819", lat: "31.7714" },
        { name: "连云港", lng: "119.1739", lat: "34.6015" },
        { name: "南通", lng: "120.8738", lat: "32.0147" },
        { name: "苏州", lng: "120.6199", lat: "31.3180" },
        { name: "宿迁", lng: "118.2969", lat: "33.9521" },
        { name: "泰州", lng: "119.9196", lat: "32.4761" },
        { name: "无锡", lng: "120.3055", lat: "31.5700" },
        { name: "徐州", lng: "117.1881", lat: "34.2716" },
        { name: "盐城", lng: "120.1489", lat: "33.3799" },
        { name: "扬州", lng: "119.4278", lat: "32.4085" },
        { name: "镇江", lng: "119.4558", lat: "32.2044" },
        { name: "南昌", lng: "115.8935", lat: "28.6896" },
        { name: "赣州", lng: "114.9359", lat: "25.8453" },
        { name: "长春", lng: "125.3136", lat: "43.8983" },
        { name: "吉林", lng: "126.5645", lat: "43.8720" },
        { name: "沈阳", lng: "123.4328", lat: "41.8086" },
        { name: "鞍山", lng: "123.0078", lat: "41.1187" },
        { name: "大连", lng: "121.5935", lat: "38.9487" },
        { name: "呼和浩特", lng: "111.6604", lat: "40.8283" },
        { name: "包头", lng: "109.8462", lat: "40.6471" },
        { name: "银川", lng: "106.2065", lat: "38.5026" },
        { name: "西宁", lng: "101.7679", lat: "36.6407" },
        { name: "济南", lng: "117.0250", lat: "36.6828" },
        { name: "滨州", lng: "117.9683", lat: "37.4053" },
        { name: "德州", lng: "116.3282", lat: "37.4608" },
        { name: "济宁", lng: "116.6008", lat: "35.4021" },
        { name: "青岛", lng: "120.3844", lat: "36.1052" },
        { name: "威海", lng: "122.0940", lat: "37.5288" },
        { name: "潍坊", lng: "119.1426", lat: "36.7161" },
        { name: "烟台", lng: "121.3096", lat: "37.5366" },
        { name: "淄博", lng: "118.0591", lat: "36.8047" },
        { name: "太原", lng: "112.5509", lat: "37.8903" },
        { name: "西安", lng: "108.9531", lat: "34.2778" },
        { name: "宝鸡", lng: "107.1706", lat: "34.3641" },
        { name: "成都", lng: "104.0679", lat: "30.6799" },
        { name: "德阳", lng: "104.4024", lat: "31.1311" },
        { name: "乐山", lng: "103.7608", lat: "29.6010" },
        { name: "绵阳", lng: "104.7055", lat: "31.5047" },
        { name: "拉萨", lng: "91.1119", lat: "29.6626" },
        { name: "乌鲁木齐", lng: "87.5650", lat: "43.8404" },
        { name: "昆明", lng: "102.7146", lat: "25.0492" },
        { name: "杭州", lng: "120.2194", lat: "30.2592" },
        { name: "湖州", lng: "120.1372", lat: "30.8779" },
        { name: "嘉兴", lng: "120.7604", lat: "30.7740" },
        { name: "金华", lng: "119.6526", lat: "29.1029" },
        { name: "宁波", lng: "121.5790", lat: "29.8853" },
        { name: "衢州", lng: "118.8758", lat: "28.9569" },
        { name: "绍兴", lng: "120.5925", lat: "30.0024" },
        { name: "台州", lng: "121.4406", lat: "28.6683" },
        { name: "温州", lng: "120.6906", lat: "28.0028" },
      ],
      provinces: [
        { name: "北京市", lng: "116.3956", lat: "39.9300" },
        { name: "天津市", lng: "117.2108", lat: "39.1439" },
        { name: "河北省", lng: "114.5221", lat: "38.0490" },
        { name: "山西省", lng: "112.5509", lat: "37.8903" },
        { name: "内蒙古", lng: "111.6604", lat: "40.8283" },
        { name: "黑龙江省", lng: "126.6577", lat: "45.7700" },
        { name: "吉林省", lng: "125.3136", lat: "43.8983" },
        { name: "辽宁省", lng: "123.4328", lat: "41.8086" },
        { name: "河南省", lng: "113.6496", lat: "34.7566" },
        { name: "湖北省", lng: "114.3162", lat: "30.5811" },
        { name: "湖南省", lng: "112.9794", lat: "28.2135" },
        { name: "山东省", lng: "117.0250", lat: "36.6828" },
        { name: "江苏省", lng: "118.7781", lat: "32.0572" },
        { name: "安徽省", lng: "117.2827", lat: "31.8669" },
        { name: "上海市", lng: "121.4879", lat: "31.2492" },
        { name: "浙江省", lng: "120.2194", lat: "30.2592" },
        { name: "江西省", lng: "115.8935", lat: "28.6896" },
        { name: "福建省", lng: "119.3302", lat: "26.0471" },
        { name: "台湾", lng: "121.5201", lat: "25.0307" },
        { name: "广东省", lng: "113.3077", lat: "23.1200" },
        { name: "广西省", lng: "108.2972", lat: "22.8065" },
        { name: "海南省", lng: "110.3308", lat: "20.0221" },
        { name: "香港", lng: "114.1734", lat: "22.3200" },
        { name: "澳门", lng: "113.5491", lat: "22.1990" },
        { name: "陕西省", lng: "108.9531", lat: "34.2778" },
        { name: "甘肃省", lng: "103.8233", lat: "36.0642" },
        { name: "宁夏", lng: "106.2065", lat: "38.5026" },
        { name: "青海省", lng: "101.7679", lat: "36.6407" },
        { name: "新疆", lng: "87.5650", lat: "43.8404" },
        { name: "四川省", lng: "104.0679", lat: "30.6799" },
        { name: "贵州省", lng: "106.7092", lat: "26.6299" },
        { name: "云南省", lng: "102.7146", lat: "25.0492" },
        { name: "重庆市", lng: "106.5306", lat: "29.5446" },
        { name: "西藏", lng: "91.1119", lat: "29.6626" },
      ],
      areas: [
        { name: "东北地区", lng: "126.5645", lat: "43.8720" },
        { name: "华北地区", lng: "116.3956", lat: "39.9300" },
        { name: "华中地区", lng: "112.2173", lat: "31.0426" },
        { name: "华东地区", lng: "118.7781", lat: "32.0572" },
        { name: "华南地区", lng: "112.4797", lat: "23.0787" },
        { name: "西北地区", lng: "101.7679", lat: "36.6407" },
        { name: "西南地区", lng: "103.7608", lat: "29.6010" },
      ],
      openKeys: ["华北地区"],
      selectLevel: 1,
      selectPosition: { name: "华北地区", lng: "116.395645", lat: "39.929986" },
      lastPosition: "",
    };
  }
  setPosition(name, lng, lat) {
    this.setState({
      selectPosition: { name: name, lng: lng, lat: lat },
    });
  }
  setLastPosition(name) {
    this.setState({
      lastPosition: name,
    });
  }
  menuOnClick(e) {
    console.log("click ", e, e.key);
    let lng, lat;
    for (let i = 0; i < this.state.provinces.length; i++) {
      let item = this.state.provinces[i];
      if (item.name === e.key) {
        lng = item.lng;
        lat = item.lat;
        break;
      }
    }
    console.log(lng, lat);
    if (this.state.selectPosition.name!==e.key)
      this.setState({
        // selectName: e.key,
        lastPosition: this.state.selectPosition.name,
        selectPosition: { name: e.key, lng: lng, lat: lat },
      });
  }
  menuChange(e) {
    // console.log(e);
    console.log(e[e.length - 1]);
    let lng, lat;
    for (let i = 0; i < this.state.areas.length; i++) {
      let item = this.state.areas[i];
      if (item.name === e[e.length - 1]) {
        lng = item.lng;
        lat = item.lat;
        break;
      }
    }
    if (e.length >= 1) {
      console.log(lng, lat);
      this.setState({
        // selectName: e.key,
        openKeys: [e[e.length - 1]],
        lastPosition: this.state.selectPosition.name,
        selectPosition: { name: e[e.length - 1], lng: lng, lat: lat },
      });
    } else {
      this.setState({
        openKeys: e,
      });
    }
  }
  render() {
    return (
      <Layout className="container">
        <MyHeader className="header" onClick={this.menuOnClick} />
        <Layout className="content">
          <MySider
            width={200}
            onClick={this.menuOnClick.bind(this)}
            menuChange={this.menuChange.bind(this)}
            openKeys={this.state.openKeys}
          />
          <Layout >
            <Content>
              <MyMap
                cities={this.state.cities}
                provinces={this.state.provinces}
                areas={this.state.areas}
                selectPosition={this.state.selectPosition}
                lastPosition={this.state.lastPosition}
                setPosition={this.setPosition.bind(this)}
                setLastPosition={this.setLastPosition.bind(this)}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
// const root = createRoot(document.getElementById("root"));
// root.render(<MyMap />);
// const spawn = require('child_process').spawn
// root.get("process_data", (req, res) => {
//   const msg = "北京"
//   spawn('python3', ['/Users/rumeng/Downloads/未命名1.py', msg])
//   console.log(req)
//   console.log(res)
// })
// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

// class Board extends React.Component {

//   renderSquare(i) {
//     return (
//       <Square
//         value={this.props.squares[i]}
//         onClick={() => this.props.onClick(i)}
//       />
//     );
//   }

//   render() {
//     return (
//       <div>
//         {/* <div className="status">{status}</div> */}
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{
//         squares: Array(9).fill(null),
//       }],
//       xIsNext: true,
//       stepNumber: 0,
//     }
//   }
//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length-1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O';
//     this.setState({
//       history: history.concat([{
//         squares: squares,
//       }]),
//       xIsNext: !this.state.xIsNext,
//       stepNumber: history.length,
//     });
//   }
//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step % 2) === 0,
//     });
//   }
//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares);
//     const moves = history.map((step,move)=>{
//       const desc = move ?
//         'Go to move #'+move :
//         'Go to game start';
//       return(
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>{desc}</button>
//         </li>
//       )
//     })

//     let status;
//     if (winner) {
//       status = 'Winner: ' + winner;
//     } else {
//       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//     }
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board
//             squares = {current.squares}
//             onClick = {(i) => this.handleClick(i)}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// // ========================================

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }
      // cities: [
      //   { name: "北京", lng: "116.395645", lat: "39.929986" },
      //   { name: "上海", lng: "121.487899", lat: "31.249162" },
      //   { name: "天津", lng: "117.210813", lat: "39.143930" },
      //   { name: "重庆", lng: "106.530635", lat: "29.544606" },
      //   { name: "合肥", lng: "117.282699", lat: "31.866942" },
      //   { name: "滁州", lng: "118.324570", lat: "32.317351" },
      //   { name: "铜陵", lng: "117.819429", lat: "30.940930" },
      //   { name: "芜湖", lng: "118.384108", lat: "31.366020" },
      //   { name: "福州", lng: "119.330221", lat: "26.047125" },
      //   { name: "龙岩", lng: "117.017997", lat: "25.078685" },
      //   { name: "泉州", lng: "118.600362", lat: "24.901652" },
      //   { name: "厦门", lng: "118.103886", lat: "24.489231" },
      //   { name: "漳州", lng: "117.676205", lat: "24.517065" },
      //   { name: "兰州", lng: "103.823305", lat: "36.064226" },
      //   { name: "广州", lng: "113.307650", lat: "23.120049" },
      //   { name: "潮州", lng: "116.630076", lat: "23.661812" },
      //   { name: "东莞", lng: "113.763434", lat: "23.043024" },
      //   { name: "佛山", lng: "113.134026", lat: "23.035095" },
      //   { name: "惠州", lng: "114.410658", lat: "23.113540" },
      //   { name: "江门", lng: "113.078125", lat: "22.575117" },
      //   { name: "揭阳", lng: "116.379501", lat: "23.547999" },
      //   { name: "梅州", lng: "116.126403", lat: "24.304571" },
      //   { name: "汕头", lng: "116.728650", lat: "23.383908" },
      //   { name: "深圳", lng: "114.025974", lat: "22.546054" },
      //   { name: "肇庆", lng: "112.479653", lat: "23.078663" },
      //   { name: "珠海", lng: "113.562447", lat: "22.256915" },
      //   { name: "南宁", lng: "108.297234", lat: "22.806493" },
      //   { name: "桂林", lng: "110.260920", lat: "25.262901" },
      //   { name: "柳州", lng: "109.422402", lat: "24.329053" },
      //   { name: "贵阳", lng: "106.709177", lat: "26.629907" },
      //   { name: "海口", lng: "110.330802", lat: "20.022071" },
      //   { name: "石家庄", lng: "114.522082", lat: "38.048958" },
      //   { name: "保定", lng: "115.494810", lat: "38.886565" },
      //   { name: "唐山", lng: "118.183451", lat: "39.650531" },
      //   { name: "郑州", lng: "113.649644", lat: "34.756610" },
      //   { name: "焦作", lng: "113.211836", lat: "35.234608" },
      //   { name: "洛阳", lng: "112.447525", lat: "34.657368" },
      //   { name: "南阳", lng: "112.542842", lat: "33.011420" },
      //   { name: "新乡", lng: "113.912690", lat: "35.307258" },
      //   { name: "许昌", lng: "113.835312", lat: "34.026740" },
      //   { name: "哈尔滨", lng: "126.657720", lat: "45.773217" },
      //   { name: "武汉", lng: "114.316200", lat: "30.581084" },
      //   { name: "荆门", lng: "112.217330", lat: "31.042611" },
      //   { name: "襄阳", lng: "112.176326", lat: "32.094934" },
      //   { name: "宜昌", lng: "111.310981", lat: "30.732758" },
      //   { name: "长沙", lng: "112.979353", lat: "28.213478" },
      //   { name: "衡阳", lng: "112.583819", lat: "26.898164" },
      //   { name: "益阳", lng: "112.366547", lat: "28.588088" },
      //   { name: "岳阳", lng: "113.146196", lat: "29.378007" },
      //   { name: "株洲", lng: "113.131695", lat: "27.827433" },
      //   { name: "南京", lng: "118.778074", lat: "32.057236" },
      //   { name: "常州", lng: "119.981861", lat: "31.771397" },
      //   { name: "连云港", lng: "119.173872", lat: "34.601549" },
      //   { name: "南通", lng: "120.873801", lat: "32.014665" },
      //   { name: "苏州", lng: "120.619907", lat: "31.317987" },
      //   { name: "宿迁", lng: "118.296893", lat: "33.952050" },
      //   { name: "泰州", lng: "119.919606", lat: "32.476053" },
      //   { name: "无锡", lng: "120.305456", lat: "31.570037" },
      //   { name: "徐州", lng: "117.188107", lat: "34.271553" },
      //   { name: "盐城", lng: "120.148872", lat: "33.379862" },
      //   { name: "扬州", lng: "119.427778", lat: "32.408505" },
      //   { name: "镇江", lng: "119.455835", lat: "32.204409" },
      //   { name: "南昌", lng: "115.893528", lat: "28.689578" },
      //   { name: "赣州", lng: "114.935909", lat: "25.845296" },
      //   { name: "长春", lng: "125.313642", lat: "43.898338" },
      //   { name: "吉林", lng: "126.564544", lat: "43.871988" },
      //   { name: "沈阳", lng: "123.432791", lat: "41.808645" },
      //   { name: "鞍山", lng: "123.007763", lat: "41.118744" },
      //   { name: "大连", lng: "121.593478", lat: "38.948710" },
      //   { name: "呼和浩特", lng: "111.660351", lat: "40.828319" },
      //   { name: "包头", lng: "109.846239", lat: "40.647119" },
      //   { name: "银川", lng: "106.206479", lat: "38.502621" },
      //   { name: "西宁", lng: "101.767921", lat: "36.640739" },
      //   { name: "济南", lng: "117.024967", lat: "36.682785" },
      //   { name: "滨州", lng: "117.968292", lat: "37.405314" },
      //   { name: "德州", lng: "116.328161", lat: "37.460826" },
      //   { name: "济宁", lng: "116.600798", lat: "35.402122" },
      //   { name: "青岛", lng: "120.384428", lat: "36.105215" },
      //   { name: "威海", lng: "122.093958", lat: "37.528787" },
      //   { name: "潍坊", lng: "119.142634", lat: "36.716115" },
      //   { name: "烟台", lng: "121.309555", lat: "37.536562" },
      //   { name: "淄博", lng: "118.059134", lat: "36.804685" },
      //   { name: "太原", lng: "112.550864", lat: "37.890277" },
      //   { name: "西安", lng: "108.953098", lat: "34.277800" },
      //   { name: "宝鸡", lng: "107.170645", lat: "34.364081" },
      //   { name: "成都", lng: "104.067923", lat: "30.679943" },
      //   { name: "德阳", lng: "104.402398", lat: "31.131140" },
      //   { name: "乐山", lng: "103.760824", lat: "29.600958" },
      //   { name: "绵阳", lng: "104.705519", lat: "31.504701" },
      //   { name: "拉萨", lng: "91.111891", lat: "29.662557" },
      //   { name: "乌鲁木齐", lng: "87.564988", lat: "43.840380" },
      //   { name: "昆明", lng: "102.714601", lat: "25.049153" },
      //   { name: "杭州", lng: "120.219375", lat: "30.259244" },
      //   { name: "湖州", lng: "120.137243", lat: "30.877925" },
      //   { name: "嘉兴", lng: "120.760428", lat: "30.773992" },
      //   { name: "金华", lng: "119.652576", lat: "29.102899" },
      //   { name: "宁波", lng: "121.579006", lat: "29.885259" },
      //   { name: "衢州", lng: "118.875842", lat: "28.956910" },
      //   { name: "绍兴", lng: "120.592467", lat: "30.002365" },
      //   { name: "台州", lng: "121.440613", lat: "28.668283" },
      //   { name: "温州", lng: "120.690635", lat: "28.002838" },
      // ],
      // provinces: [
      //   { name: "北京市", lng: "116.395645", lat: "39.929986" },
      //   { name: "天津市", lng: "117.210813", lat: "39.143930" },
      //   { name: "河北省", lng: "114.522082", lat: "38.048958" },
      //   { name: "山西省", lng: "112.550864", lat: "37.890277" },
      //   { name: "内蒙古", lng: "111.660351", lat: "40.828319" },
      //   { name: "黑龙江省", lng: "126.657720", lat: "45.500000" },
      //   { name: "吉林省", lng: "125.313642", lat: "43.898338" },
      //   { name: "辽宁省", lng: "123.432791", lat: "41.808645" },
      //   { name: "河南省", lng: "113.649644", lat: "34.756610" },
      //   { name: "湖北省", lng: "114.316200", lat: "30.581084" },
      //   { name: "湖南省", lng: "112.979353", lat: "28.213478" },
      //   { name: "山东省", lng: "117.024967", lat: "36.682785" },
      //   { name: "江苏省", lng: "118.778074", lat: "32.057236" },
      //   { name: "安徽省", lng: "117.282699", lat: "31.866942" },
      //   { name: "上海市", lng: "121.487899", lat: "31.249162" },
      //   { name: "浙江省", lng: "120.219375", lat: "30.259244" },
      //   { name: "江西省", lng: "115.893528", lat: "28.689578" },
      //   { name: "福建省", lng: "119.330221", lat: "26.047125" },
      //   { name: "台湾", lng: "121.520076", lat: "25.030724" },
      //   { name: "广东省", lng: "113.307650", lat: "23.120049" },
      //   { name: "广西省", lng: "108.297234", lat: "22.806493" },
      //   { name: "海南省", lng: "110.330802", lat: "20.022071" },
      //   { name: "香港", lng: "114.173355", lat: "22.320048" },
      //   { name: "澳门", lng: "113.549090", lat: "22.198951" },
      //   { name: "陕西省", lng: "108.953098", lat: "34.277800" },
      //   { name: "甘肃省", lng: "103.823305", lat: "36.064226" },
      //   { name: "宁夏", lng: "106.206479", lat: "38.502621" },
      //   { name: "青海省", lng: "101.767921", lat: "36.640739" },
      //   { name: "新疆", lng: "87.564988", lat: "43.840380" },
      //   { name: "四川省", lng: "104.067923", lat: "30.679943" },
      //   { name: "贵州省", lng: "106.709177", lat: "26.629907" },
      //   { name: "云南省", lng: "102.714601", lat: "25.049153" },
      //   { name: "重庆市", lng: "106.530635", lat: "29.544606" },
      //   { name: "西藏", lng: "91.111891", lat: "29.662557" },
      // ],
      // areas: [
      //   { name: "东北地区", lng: "126.564544", lat: "43.871988" },
      //   { name: "华北地区", lng: "116.395645", lat: "39.929986" },
      //   { name: "华中地区", lng: "112.217330", lat: "31.042611" },
      //   { name: "华东地区", lng: "118.778074", lat: "32.057236" },
      //   { name: "华南地区", lng: "112.479653", lat: "23.078663" },
      //   { name: "西北地区", lng: "101.767921", lat: "36.640739" },
      //   { name: "西南地区", lng: "103.760824", lat: "29.600958" },
      // ],