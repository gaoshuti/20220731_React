import React from "react";
import "../index.css";
import {
  Button,
  Col,
  Row,
  Table,
  Tabs,
  Divider,
} from "antd";
import {
  CustomOverlay
} from "react-bmapgl";
import DataSource from "../components/dataSource";
import HistoryPercentile from "../components/historyPercentile";
import HistoryData from "../components/historyData";
import { LockOutlined, CloseOutlined } from '@ant-design/icons';

const axios = require('axios');
const { TabPane } = Tabs;
const { Column, ColumnGroup } = Table;

function Tips(props) {
  if(props.data.length!==5 ||  props.data[0].length!==3){
    return(
      <div><p>暂无数据</p></div>
    );
  }
  let state = props.data[0], tip = props.data[4], data1=[], hisPerDict;
  let labels=['rain','snow','cloud'];
  for(let i=0; i<labels.length; i++){
    let label=labels[i];
    hisPerDict={
      'param':label,
      'value':state[i],
      'num':props.data[i+1]['num'],
      'aboveNum':props.data[i+1]['above'],
      'belowNum':props.data[i+1]['below'],
      'abovePro':props.data[i+1]['abovePro'],
      'belowPro':props.data[i+1]['belowPro'],
    };
    data1.push(hisPerDict);
  }
  return(
    <div>
      <p>今日天气：{props.selectWeather}</p>
      <p>对应变量：[ rain: {state[0]}, snow: {state[1]}, cloud: {state[2]} ]</p>
      <p>对应历史百分位：</p>
      <Table dataSource={data1} size="small" pagination={false}>
        <Column title="" dataIndex="param" key="param" />
        <Column title="值" dataIndex="value" key="value" />
        <Column title="数量" dataIndex="num" key="num" />
        <ColumnGroup title="数量">
          <Column title=">0" dataIndex="aboveNum" key="aboveNum" />
          <Column title="<0" dataIndex="belowNum" key="belowNum" />
        </ColumnGroup>
        <ColumnGroup title="比例">
          <Column title=">0" dataIndex="abovePro" key="abovePro" />
          <Column title="<0" dataIndex="belowPro" key="belowPro" />
        </ColumnGroup>
      </Table>
      <p>建议：{tip}</p>
      <p>仅供参考，理性判断。</p>
    </div>
  );
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ["雨", "雪", "云"],
      cixu: ['rain', 'snow', 'cloud'],
      result: [],//infowindow展示信息
      cities: [],//所包含的城市
      target: '',//label+限制范围
      name: props.name,//infowindow对应的区域名……
      echartsFlag: true,//是否切换到带有Echarts图表的Tab，
                        //解决tabs+echarts导致的‘Can’t get DOM width or height.……’问题
    };
    if(this.props.level===0)this.getHistoryRet(this.state.name);
    else this.getHistory(props.name,'rain',-1,-1);

  }
  async getHistory(area,label,minValue=-1,maxValue=-1) {
    var data1=[],tempdata={},result,cities;
    console.log('get history',area);
    if(this.state.cities[0]===area && this.state.target===label+'/'+minValue+'/'+maxValue){
      // console.log('已有数据')
      return;
    }
    // console.log('无数据')
    // for(let i=1;i<cities.length;i++){
    //   let city=cities[i];
    await axios.get("/api/map/history/"+area+'/'+label+'/'+minValue+'/'+maxValue).then((res)=>{
      result=res.data['data'];
      cities=res.data['cities'];
    });
    for (var key in result){
      var historyInfo={};
      historyInfo.value=key;
      historyInfo.num=Number(result[key]['num']);
      historyInfo.aboveNum=Number(result[key]['above'].toFixed(2));
      historyInfo.belowNum=Number(result[key]['below'].toFixed(2));

      tempdata[key]=historyInfo;
    }
    // }
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
      data1.push(tempdata[key])
    }
    this.setState({
      result: data1,
      cities: cities,
      target: label+'/'+minValue+'/'+maxValue,
    });
  }
  // getCities() {
  //   console.log('get cities')
  //   if (this.state.name===cities[0]){
  //     console.log('cities got before');
  //     return cities;
  //   }
  //   let name = this.state.name,provinces=[],cities=[];
  //   if (name === "") return [];
  //   if (name.endsWith("地区")){
  //     if (name === "东北地区") provinces=["黑龙江省", "吉林省", "辽宁省"];
  //     else if (name === "华北地区")
  //       provinces= ["北京市", "天津市", "河北省", "山西省", "内蒙古"];
  //     else if (name === "华中地区") provinces= ["河南省", "湖北省", "湖南省"];
  //     else if (name === "华东地区")
  //       provinces= [
  //         "山东省",
  //         "江苏省",
  //         "安徽省",
  //         "上海市",
  //         "浙江省",
  //         "江西省",
  //         "福建省",
  //         "台湾",
  //       ];
  //     else if (name === "华南地区")
  //       provinces= ["广东省", "广西省", "海南省", "香港", "澳门"];
  //     else if (name === "西北地区")
  //       provinces= ["陕西省", "甘肃省", "宁夏", "青海省", "新疆"];
  //     else if (name === "西南地区")
  //       provinces= ["四川省", "贵州省", "云南省", "重庆市", "西藏"];
  //     else provinces=[];
  //   }
  //   else{
  //     for(let i = 0; i<cityInProvince.length; i++) {
  //       if(name===cityInProvince[i][0]){
  //         provinces=[name];
  //         return [name].concat(cityInProvince[i].slice(1));
  //       }
  //     }
  //     return [name,name];
  //   }
  //   for (let k = 0; k<provinces.length; k++){
  //     let province=provinces[k];
  //     for(let i = 0; i<cityInProvince.length; i++) {
  //       if(province===cityInProvince[i][0]){
  //         cities=cities.concat(cityInProvince[i].slice(1));
  //         break;
  //       }
  //     }
  //   }
  //   return [name].concat(cities);
  // }
  async getHistoryRet(area) {
    var data1=[],result;
    console.log('get history ret',area);
    if(this.state.cities[0]===area && this.state.target==='history ret'){
      // console.log('已有数据');
      return;
    }
    // console.log('无数据');
    await axios.get("/api/map/historyret/"+area).then((res)=>{
      result=res.data['data'];
    });
    data1.push(result['ret']);
    data1.push(result['date']);
    data1.push(result['weather']);
    data1.push(result['max']);
    data1.push(result['min']);
    data1.push(result['API']);
    data1.push(result['AQI']);
    this.setState({
      result: data1,
      target: 'history ret',
    });
  }
  async getDataSource(area) {
    var data1=[],result;
    console.log('get data source',area);
    if(this.state.cities[0]===area && this.state.target==='data source'){
      // console.log('已有数据');
      return;
    }
    // console.log('无数据');
    await axios.get("/api/map/datasource/"+area).then((res)=>{
      result=res.data['data'];
    });
    var i=0;
    for (var key in result){
      var stkcdList = result[key].split('#');
      var myDict = {key:String(++i),city:key,num:stkcdList.length,stkcd:stkcdList};
      data1.push(myDict);
    }
    this.setState({
      result: data1,
      target: 'data source',
    });
  }
  async getTip(area) {
    var data1=[],result;
    console.log('get tip',area);
    if(this.state.cities[0]===area && this.state.target==='tip'){
      // console.log('已有数据');
      return;
    }
    // console.log('无数据');
    const formData = new FormData();
    formData.append('city',area);
    formData.append('weather',this.props.selectWeather);
    await axios({
      headers: {
        'Content-Type':'application/json'
      },
      method: 'post',
      url:`/gettip`,
      data: formData,
    }).then(res => {
      if(res && res.status === 200){
        // 响应成功的回调
        result=res.data['data'];
      }else{
        // 响应失败
        console.log(res.msg);
      }
    },err=>{
      console.log(err);
    });
    data1.push(result['state']);
    data1.push(result['rain']);
    data1.push(result['snow']);
    data1.push(result['cloud']);
    data1.push(result['tip']);
    this.setState({
      result: data1,
      target: 'tip',
    });
  }
  setEchartsFlag(flag) {
    this.setState({
      echartsFlag: flag,
    });
  }
  changeTab(activeKey) {
    if(activeKey==='data'){
      this.getDataSource(this.state.name);
      this.setEchartsFlag(false);
    }else if(activeKey==='history'){
      this.getHistoryRet(this.state.name);
      this.setEchartsFlag(true);
    }else if(activeKey==='tip'){
      this.getTip(this.state.name);
      this.setEchartsFlag(false);
    }else{
      this.getHistory(this.state.name,activeKey,-1,-1);
      this.setEchartsFlag(false);
    }

  }

  render() {
    //this.props.level--点击图标的等级 是否有历史收益率和建议
    return (
      <div className="card-container" style={{width:440,marginLeft:10}}>
        <Tabs type="card" onChange={this.changeTab.bind(this)}>
          {(this.props.level===1)?
          <>
          </>
          :
          <TabPane tab="历史数据" key="history">
            {this.state.echartsFlag===true?
              <div className="hmtabdiv">
                <HistoryData data={this.state.result}/>
              </div>
              :<></>
            }
          </TabPane>
          }

          <TabPane tab={this.state.labels[0]} key="rain">
            <div className="hmtabdiv">
              <HistoryPercentile label={this.state.cixu[0]} result={this.state.result}/>
            </div>
            </TabPane>
          <TabPane tab={this.state.labels[1]} key="snow">
            <div className="hmtabdiv">
              <HistoryPercentile label={this.state.cixu[1]} result={this.state.result}/>
            </div>
          </TabPane>
          <TabPane tab={this.state.labels[2]} key="cloud">
            <div className="hmtabdiv">
              <HistoryPercentile label={this.state.cixu[2]} result={this.state.result}/>
            </div>
          </TabPane>
          <TabPane tab="数据源" key="data">
            <div className="hmtabdiv">
              <DataSource data={this.state.result}/>
            </div>
          </TabPane>
          {(this.props.level===1)?
          <>
          </>
          :
          <TabPane tab="建议" key="tip">
            <div style={{height:270,overflow:'auto'}}>
              <Tips data={this.state.result} selectWeather={this.props.selectWeather}/>
            </div>
          </TabPane>
          }
        </Tabs>
      </div>
    );
  }
}

class MyInfoWindow extends React.Component{
  getPic() {
    if(this.props.isLocked===true) return(<LockOutlined/>);
    else return(<CloseOutlined />);
  }
  render() {
    return(
      <div>
        {this.props.isOpen===false?<></>:
        <CustomOverlay
          position={{
            lng: this.props.selectPosition.lng,
            lat: this.props.selectPosition.lat,
          }}
          offset={new window.BMapGL.Size(0, -20)}
        >
          <div style={{width:450,height:350,background:'#FFFFFF',borderRadius:20}}>
            <Row>
              <Col span={12}>
              <h3 style={{margin:10}}>
                {this.props.selectPosition.name}&nbsp;&nbsp;
                <span style={{fontSize:14}}>{this.props.selectWeather}</span>
              </h3>
              </Col>
              <Col span={12}>
                <Button
                  style={{float:'right',margin:5}}
                  type="link"
                  icon={this.getPic()}
                  onClick={this.props.closeInfoWindow}
                ></Button>
                {/* <CloseOutlined style={{float:'right',margin:15}}/> */}
              </Col>
            </Row>
            <Divider style={{margin:0}}/>
            <Board
              name={this.props.selectPosition.name}
              selectWeather={this.props.selectWeather}
              level={this.props.selectWeather===''?1:0}
            />
          </div>
        </CustomOverlay>
        }

      </div>
    );
  }
}

export default MyInfoWindow;
