import React from "react";
import "../index.css";
import {
  Button,
  Collapse,
  Checkbox,
  Col,
  Divider,
  Form,
  Radio,
  Row,
  Select,
  Table,
  TreeSelect,


} from "antd";
import EChartsReact from 'echarts-for-react';


const axios = require('axios');

const { Column } = Table;
const { Panel } = Collapse;
const { SHOW_PARENT } = TreeSelect;
function FormDemo(props) {
  // const onFormLayoutChange=()=>{
  //   console.log('onformlayoutchange');
  // };

  const changeLabel = (e) => {
    console.log(e.target.value);
    props.setControlChecked(e.target.value);
  }
  const changeWeatherParams = (list) => {
    props.setChecked(list,!!list.length && list.length < props.plainOptions.length,list.length === props.plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    props.setChecked(e.target.checked ? props.plainOptions : [],false,e.target.checked);
  };
  const treeOptions=[
    {
      title: '所有地区',
      value: 'all',
      key: 'all',
      children: [
        {
          label: "东北地区",
          value: "东北地区",
          key: "东北地区",
          children: [
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
          ],
        },
        {
          label: "华北地区",
          value: "华北地区",
          key: "华北地区",
          children: [
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
          ],
        },
        {
          label: "华中地区",
          value: "华中地区",
          key: "华中地区",
          children: [
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
          ],
        },
        {
          label: "华东地区",
          value: "华东地区",
          key: "华东地区",
          children: [
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
          ],
        },
        {
          label: "华南地区",
          value: "华南地区",
          key: "华南地区",
          children: [
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
          ],
        },
        {
          label: "西北地区",
          value: "西北地区",
          key: "西北地区",
          children: [
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
          ],
        },
        {
          label: "西南地区",
          value: "西南地区",
          key: "西南地区",
          children: [
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
          ],
        },
      ],
    },


  ];
  const onFinish = async (values) => {
    props.setButtonFlag(true);
    console.log('submit:',values.label,values.model,props.checkedList.join('#'),props.area.join('#'));
    const formData = new FormData();
    formData.append('label',values.label);
    formData.append('model',values.model);
    if(props.checkedList.length===0){
      console.log('weather 0:',props.checkedList)
      props.setChecked(['max', 'min', 'wind', 'pres', 'tempDiff7', 'snow', 'rain', 'cloud', 'API', 'AQI'],true,true);
      formData.append('weather','max#min#wind#pres#tempDiff7#snow#rain#cloud#API#AQI');
    }else{
      console.log('weather else:',props.checkedList)
      formData.append('weather',props.checkedList.join('#'));
    }

    if(props.area.length===0){
      console.log('area 0:',props.area)
      props.setArea(['上海']);
      formData.append('area','上海');
    }else if(props.area[0]==='all'){
      formData.append('area','东北地区#华北地区#华中地区#华东地区#华南地区#西北地区#西南地区');
    }else{
      formData.append('area',props.area.join('#'));
    }
    await axios({
      headers: {
        'Content-Type':'application/json'
      },
      method: 'post',
      url:'/api/map/weatherregression',
      data: formData,
    }).then(res => {
      if(res && res.status === 200){
        // 响应成功的回调
        console.log('res:',res);
        // console.log('checkedList and area after res',props.checkedList,props.area)
        let submitList;
        if(props.checkedList.length===0) submitList=['max', 'min', 'wind', 'pres', 'tempDiff7', 'snow', 'rain', 'cloud', 'API', 'AQI'];
        else submitList=props.checkedList;
        props.setSubmit(submitList);
        props.setResult(res.data['data']);
        props.setButtonFlag(false);
      }else{
        // 响应失败
        console.log(res.msg);
        props.setButtonFlag(false);
      }
    },err=>{
      console.log(err);
      props.setButtonFlag(false);
    });

  };
  const changeTreeSelect = (value,label,extra) => {
    props.setArea(value);
    console.log(props.checkedList);
  }
  return (
    <>
      <Form
        labelCol={{span: 4,}}
        wrapperCol={{span: 14,}}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        onFinish={onFinish}
      >
        <Form.Item></Form.Item>
        <Form.Item name="label" label="label"
          rules={[
            {
              required: true,
            },
          ]}>
          <Radio.Group onChange={changeLabel}>
            <Radio value="tur"> 换手率 </Radio>
            <Radio value="ret"> 回归率 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="天气相关属性">
          <Checkbox indeterminate={props.indeterminate} onChange={onCheckAllChange} checked={props.checkAll}>
            全选
          </Checkbox>
          <Checkbox.Group
            style={{
              width: '100%',
            }}
            value={props.checkedList}
            onChange={changeWeatherParams}
          >
            <Row>
              <Col span={4}>
                <Checkbox value="max">最高温</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="min">最低温</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="wind">风速</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="pres">气压</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="tempDiff7">温差</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="snow">雪</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="rain">雨</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="cloud">云量</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="API">API</Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox value="AQI">AQI</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="控制变量">
        <Checkbox.Group
            style={{
              width: '100%',
            }}
            disabled
            value={props.checkedControlList}
          >
            <Row>
              <Col span={6}>
                <Checkbox value="propertion">机构持股率</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="MarCap">流通市值</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="tur(-1)">前一日换手率</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="ret(-1)">前一日收益率</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="ret">收益率</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="ris">市场风险溢价因子</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="smb">市值因子</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="hml">账面市值比因子</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
          <Divider />
        </Form.Item>

        <Form.Item name="model" label="模型"
          rules={[
            {
              required: true,
              message: 'Please select a model!',
            },
          ]}>
          <Select>
            <Select.Option value="linear">线性回归</Select.Option>
            <Select.Option value="OLS">OLS回归</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="区域" >
          <TreeSelect
            treeData={treeOptions}
            showSearch={true}
            treeCheckable={true}
            showCheckedStrategy={SHOW_PARENT}
            onChange={changeTreeSelect}
            value={props.area}
          />
          <Divider />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 4, span: 16,}}>
          <Button type="primary" htmlType="submit" disabled={props.buttonFlag}>提交</Button>
        </Form.Item>
      </Form>
    </>
  );
};
class RegDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plainOptions: [
        'max', 'min', 'wind', 'pres', 'tempDiff7',
        'snow', 'rain', 'cloud', 'API', 'AQI'
      ],//天气相关多选框内容
      checkedList: [],//天气相关多选框选中内容
      checkedControlList: [],//控制变量多选框选中内容
      indeterminate: false,
      checkAll: false,//是否全选
      stkOptions: [
        '前一日收益率',''
      ],
      area: [],//选择的区域
      setSubmit: props.setSubmit,//设置天气相关多选框的提交信息
      setResult: props.setResult,//设置回归结果
      setLabel: props.setLabel,
      buttonFlag: false, //按钮是否禁用
    };
  }
  setChecked(list,flag1,flag2) {//设置天气相关多选框的选中信息
    this.setState({
      checkedList: list,
      indeterminate: flag1,
      checkAll: flag2,
    })
    // this.state.setChecked2(list);
  }
  setControlChecked(label) {//设置控制变量多选框的选中信息
    console.log('setControlChecked');
    this.state.setLabel(label);
    if(label==='tur'){
      console.log('1');
      this.setState({
        checkedControlList:['propertion','MarCap','tur(-1)','ret(-1)','ret']
      });
    }else if(label==='ret'){
      console.log('2');
      this.setState({
        checkedControlList:['ret(-1)','ris','smb','hml']
      });
    }else{
      this.setState({
        checkedControlList:[]
      });
    }
  }
  setArea(list) {//存储区域信息
    console.log(list)
    this.setState({
      area:list
    });
  }
  setButtonFlag(flag) {
    this.setState({
      buttonFlag:flag,
    });
  }
  render() {
    return (
      <div>
        <FormDemo
          setChecked={this.setChecked.bind(this)}
          setControlChecked={this.setControlChecked.bind(this)}
          setArea={this.setArea.bind(this)}
          setSubmit={this.state.setSubmit}
          setResult={this.state.setResult}
          plainOptions={this.state.plainOptions}
          indeterminate={this.state.indeterminate}
          checkAll={this.state.checkAll}
          checkedList={this.state.checkedList}
          checkedControlList={this.state.checkedControlList}
          area={this.state.area}
          buttonFlag={this.state.buttonFlag}
          setButtonFlag={this.setButtonFlag.bind(this)}
        />

      </div>
    );
  }
}
function ScatterDemo(props) {
  let labelList,weatherList,data=[];
  let scatterOptions=[],option;
  var labelName='', weatherName='';
  if(props.label==='tur'){
    labelName='换手率';
  }else if(props.label==='ret'){
    labelName='收益率';
  }else{
    console.log('label error');
  }
  for(let i in props.submitList){
    data=[]
    console.log(props.submitList[i]);
    if(props.submitList[i]==='max') weatherName='最高温';
    else if(props.submitList[i]==='min') weatherName='最低温';
    else if(props.submitList[i]==='wind') weatherName='风速';
    else if(props.submitList[i]==='pres') weatherName='气压';
    else if(props.submitList[i]==='tempDiff7') weatherName='温差';
    else if(props.submitList[i]==='snow') weatherName='雪';
    else if(props.submitList[i]==='rain') weatherName='雨';
    else if(props.submitList[i]==='cloud') weatherName='云量';
    else if(props.submitList[i]==='API') weatherName='API';
    else if(props.submitList[i]==='AQI') weatherName='AQI';
    else console.log(props.submitList[i],' error');
    weatherList=props.result[props.submitList[i]][0];
    labelList=props.result[props.submitList[i]][1];
    for(let j = 0; j < labelList.length; j++) {
      data.push([weatherList[j],labelList[j]]);
    }
    option = {
      title: {
        text: weatherName
      },
      grid: {
        //设置 上下左右距离dom容器距离 控制图标大小
        left: '3%',
        right: '4%',
        bottom: '5%',
        //是否显示刻度标签 true显示
        containLabel: true
      },
      // tooltip: {
      //   trigger: 'axis',
      //   position: function(pt, params, dom, rect, size) {
      //     // var tipWidth = pt[0]+size.contentSize[0];
      //     // if(tipWidth>size.viewSize[0]) {
      //     if(pt[0]>size.viewSize[0]/2) {
      //       return [pt[0]-size.contentSize[0],'10%'];
      //     }
      //     return [pt[0], '10%'];
      //   }
      // },
      xAxis: {
        name: weatherName,
        type: 'value',
        nameLocation: "middle",
        nameGap: 20,
      },
      yAxis: {
        name: labelName,
        type: 'value',
        nameLocation: "middle",
        nameGap: 25,
      },
      series: [
        {
          name: 'ret',
          symbolSize: 10,
          data: data,
          type: 'scatter',
        }
      ]
    };
    scatterOptions.push(option)
  }
  return(
    <>
      <Row style={{
        margin: 0,
      }}>
        {scatterOptions.map((option) => {
          return (
            <Col span={12} key={option.title.text}>
              <EChartsReact option={option}/>
            </Col>);
        })}
      </Row>
    </>
  );
}
function RegCoefficientDemo(props) {
  // var valueTitle = (
  //   <div>各城市回归结果(共{props.result['cities'].length}个城市)
  //   </div>);
  var data1=[], myDict, city, aboveNum, belowNum;
  for(let i = 0; i < props.submitList.length; i++) {
    myDict={};
    aboveNum=0;
    belowNum=0;
    myDict['key']=props.submitList[i];
    if(props.submitList[i]==='max') myDict['value']='最高温';
    else if(props.submitList[i]==='min') myDict['value']='最低温';
    else if(props.submitList[i]==='wind') myDict['value']='风速';
    else if(props.submitList[i]==='pres') myDict['value']='气压';
    else if(props.submitList[i]==='tempDiff7') myDict['value']='温差';
    else if(props.submitList[i]==='snow') myDict['value']='雪';
    else if(props.submitList[i]==='rain') myDict['value']='雨';
    else if(props.submitList[i]==='cloud') myDict['value']='云量';
    else if(props.submitList[i]==='API') myDict['value']='API';
    else if(props.submitList[i]==='AQI') myDict['value']='AQI';
    else console.log(props.submitList[i],' error');
    // myDict['value']=props.submitList[i];
    myDict['allCoefficient']=props.result['all'][props.submitList[i]]['weights'].toFixed(6);
    if(props.result['cities'].length > 1){
      for(let j = 0; j < props.result['cities'].length; j++) {
        city=props.result['cities'][j];
        myDict[city]=props.result[city][props.submitList[i]]['weights'].toFixed(6);
        if(myDict[city]>0) aboveNum++;
        else if(myDict[city]<0) belowNum++;
      }
    }else{
      city=props.result['cities'][0];
      myDict[city]=props.result['all'][props.submitList[i]]['weights'].toFixed(6);
      if(myDict[city]>0) aboveNum++;
      else if(myDict[city]<0) belowNum++;
    }
    myDict['aboveNum']=aboveNum;
    myDict['belowNum']=belowNum;
    data1.push(myDict);
  }
  return(
    <div>
      <Table dataSource={data1} size="small" scroll={{ x: 'auto', }}>
        {/* <Spin spinning={loading}> */}
        <Column title="变量" width={200} dataIndex="value" key="value" fixed="left"/>
        <Column title="总系数" width={100} dataIndex="allCoefficient" key="allCoefficient" fixed="left"/>
        {/* <ColumnGroup title="各城市回归结果"  fixed="left"> */}

          {props.result['cities'].map((city) => {
            return (
              <Column title={city} dataIndex={city} key={city} />
              );
          })}
          <Column title="系数>0" width={100} dataIndex="aboveNum" key="aboveNum" fixed="right"/>
          <Column title="系数<0" width={100} dataIndex="belowNum" key="belowNum" fixed="right"/>
        {/* </Spin> */}
      </Table>
    </div>
  );
}
function ResultDemo(props){
  if(props.result.length===0){
    console.log('history ret is null');
    return(
      <div><p>请先设置数据</p></div>
    );
  }
  console.log('resultDemo submitList',props.submitList);
  console.log('resultDemo result',props.result);
  return(
    <div>
      <Collapse defaultActiveKey={['1']} ghost>
        <Panel header="散点图" key="1">
          <ScatterDemo
            label={props.label}
            submitList={props.submitList}
            result={props.result}
          />
        </Panel>
        <Panel header="回归系数" key="2">
          <RegCoefficientDemo
            submitList={props.submitList}
            result={props.result}
          />
        </Panel>
      </Collapse>
    </div>
  );
}
class WeatherReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',// label的值
      submitList: [],//天气相关多选框选中内容
      result: [],
      activeKey: ['1'],
    };
  }
  setSubmit(list) {//设置天气相关多选框的选中信息
    console.log(list);
    this.setState({
      submitList: list,
    })
  }
  setLabel(label) {
    this.setState({
      label: label
    });
  }
  onChange(key) {
    console.log(key);
    this.setState({
      activeKey:key
    })
  };
  setResult(data) {
    console.log(data);
    this.setState({
      result: data,
      activeKey: '2'
    });
  }
  render() {
    return(
      <Collapse lapse defaultActiveKey={['1']} activeKey={this.state.activeKey} onChange={this.onChange.bind(this)}>
        <Panel header="设置数据" key="1">
          <RegDemo
            setResult={this.setResult.bind(this)}
            // checkedList={this.state.checkedList}
            indeterminate={this.state.indeterminate}
            checkAll={this.state.checkAll}
            setSubmit={this.setSubmit.bind(this)}
            setLabel={this.setLabel.bind(this)}
          />
        </Panel>
        <Panel header="回归结果" key="2">
          <ResultDemo
            result={this.state.result}
            submitList={this.state.submitList}
            label={this.state.label}
          />
        </Panel>
      </Collapse>
    );
  }
}
export default WeatherReg;
// const ComponentDemo = () => <FormDisabledDemo />;


// ReactDOM.render(<ComponentDemo />, mountNode);
