import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
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
const CheckboxGroup = Checkbox.Group;

const { Column, ColumnGroup } = Table;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { SHOW_PARENT } = TreeSelect;

function SelectDemo(props) {
  // const onFormLayoutChange=()=>{
  //   console.log('onformlayoutchange');
  // };
  const onInputChange = (e) => {
    props.setStkcd(e.target.value);
  };
  const disabledDate = (current) => {
    let begin = new Date(Number(props.begindate.slice(0,4)),Number(props.begindate.slice(4,6)),0);
    begin.setDate(Number(props.begindate.slice(6,8)));
    let end = new Date(Number(props.enddate.slice(0,4)),Number(props.enddate.slice(4,6)),0);
    end.setDate(Number(props.enddate.slice(6,8))+1);
    return((current<begin) || (current>end));
  };
  const onRangePickerChange = (dates, dateStrings) => {
    console.log('dateStrings:',dateStrings);
    
    props.setSelectedDate(dateStrings[0].replace(/-/g,''),dateStrings[1].replace(/-/g,''));
  };
  const onFinish = async (values) => {
    props.setButtonFlag(true);
    console.log('submit:',values.stkcd, props.selectedBegin,props.selectedEnd);
    const formData = new FormData();
    formData.append('stkcd',values.stkcd);
    if(props.selectedBegin==='') {// 未完成
      //=============================================
      props.setSelectedDate('20220104',props.enddate)
    }else{
      formData.append('begindate',props.selectedBegin);
      formData.append('enddate',props.selectedEnd);
    }

    await axios({
      headers: {
        'Content-Type':'application/json'
      },
      method: 'post',
      url:`http://localhost:3000/stock`,
      data: formData,
    }).then(res => {
      if(res && res.status === 200){
        // 响应成功的回调
        console.log('res.data', res.data);
        props.setResult(res.data['data']['real'],res.data['data']['predict'],res.data['data']['date']);
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
        // onValuesChange={onFormLayoutChange}
        onFinish={onFinish}
      >
        <Form.Item></Form.Item>
        <Form.Item name='stkcd' label="证券代码"
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
              <Input allowClear maxLength={6}
                defaultValue={props.stkcd}	

                onPressEnter={onInputChange}
                onChange={onInputChange}
              />
            </Col>
            <Col span={2}></Col>
            <Col span={10}>
              <Form.Item name='time' 
                rules={[
                  {
                    required: true,
                    message: 'Please choose the period!',
                  },
                ]}
              >
                <RangePicker 
                  disabled={props.rangePickerFlag}
                  disabledDate={disabledDate}
                  onChange={onRangePickerChange}
                />
              </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={4}>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={props.buttonFlag}>提交</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};
function PredictData(props) {
  if(props.real.length===0){
    console.log('predict data is empty');
    return(
      <></>
    );
  }
  let days = props.dates, real = props.real, predict=props.predict;
  var data1 = [],data2=[];
  for(let i = 0; i<days.length; i++) {
    let date = days[i].split('-');
    let base = new Date(date[0], date[1], 0);
    base.setDate(date[2]);
    data1.push([base, real[i]]);
    data2.push([base, predict[i]]);
  }
  data2.push(['next',predict[predict.length-1]]);
  let options = {
    tooltip: {
      trigger: 'axis',
      position: function(pt, params, dom, rect, size) {
        if(pt[0]>size.viewSize[0]/2) {
          return [pt[0]-size.contentSize[0],'10%'];
        }
        return [pt[0], '10%'];
      }
    },
    title: {
      left: 'center',
      text: '股价预测'
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
      scale: true,
      boundaryGap: ['10%', '20%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: 'real',
        type: 'line',
        lineStyle:{ 
          color:'red' //改变折线颜色
        }, 
        symbol: 'none',
        // areaStyle: {},
        data: data1
      },
      {
        name: 'predict',
        type: 'line',
        symbol: 'none',
        data: data2
      },
    ]
  };

  return (
    <div className='scrollItem'>
      <EChartsReact option={options}/>
    </div>
  );
}
class StockPredict extends React.Component{
  constructor(props){
    super(props);
    var d = new Date();//获取系统当前时间
    var enddate = d.getMonth()<9? (d.getFullYear()+'0'+(d.getMonth()+1)):(d.getFullYear()+(d.getMonth()+1));
    enddate=d.getDate()<10?(enddate+'0'+d.getDate()):(enddate+d.getDate());
    console.log('enddate:', enddate);
    this.state={
      stkcd: '000001',
      rangePickerFlag: false,
      begindate: '20010104',    //对应stkcd可选时间段的开始时间
      enddate: enddate,         //对应stkcd可选时间段的结束时间
      selectedBegin: '',        //用户选择的开始时间
      selectedEnd: '',          //用户选择的结束时间
      buttonFlag: false,        //按钮是否禁用
      real: [],                 //实际股票价格
      predict: [],              //预测的股票价格
      dates: [],                //数据中的交易日日期
    }
  }
  async setStkcd(stkcd) {
    this.setButtonFlag(true);
    if(stkcd.length===6) {
      await axios.get("http://localhost:3000/liststkdate/"+stkcd).then((res)=>{
        var result=res.data;
        if(result['ret']===0)  {//成功
          this.setState({
            stkcd: stkcd,
            rangePickerFlag: false,
            begindate: result['data']['begindate'],
            enddate: result['data']['enddate'],
            buttonFlag: false,
          })

        } else { //失败
          console.log(result['msg'])
          if (this.state.rangePickerFlag===false) {
            this.setState({
              rangePickerFlag: true,
            });
          }
        }
      });
    }else if (this.state.rangePickerFlag===false) {
      this.setState({
        rangePickerFlag: true,
      });
    }
    // if(stkcd.length===6 && this.state.rangePickerFlag===true){
    //   console.log(stkcd);
    //   this.setState({
    //     stkcd:stkcd,
    //     rangePickerFlag: false,
    //   });
    // }else if(stkcd.length!==6 && this.state.rangePickerFlag===false) {
    //   this.setState({
    //     rangePickerFlag: true,
    //   });
    // }
    // this.setState({
    //   stkcd: stkcd
    // });
  }
  setButtonFlag(flag) {
    this.setState({
      buttonFlag:flag,
    });
  }
  setSelectedDate(selectedBegin,selectedEnd) {
    this.setState({
      selectedBegin: selectedBegin,
      selectedEnd: selectedEnd,
    });
  }
  setResult(real, predict, dates) {
    this.setState({
      real: real,
      predict:predict,
      dates: dates,
    });
  }
  render() {
    return(
      <div>
        <SelectDemo 
          stkcd={this.state.stkcd}
          setStkcd={this.setStkcd.bind(this)}
          rangePickerFlag={this.state.rangePickerFlag}
          begindate={this.state.begindate}
          enddate={this.state.enddate}
          selectedBegin={this.state.selectedBegin}
          selectedEnd={this.state.selectedEnd}
          setSelectedDate={this.setSelectedDate.bind(this)}
          buttonFlag={this.state.buttonFlag}
          setButtonFlag={this.setButtonFlag.bind(this)}
          setResult={this.setResult.bind(this)}
        />
        <Divider></Divider>
        <PredictData
          real={this.state.real}
          predict={this.state.predict}
          dates={this.state.dates}
        />
      </div>
    );
  }
}
export default StockPredict;