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
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { SHOW_PARENT } = TreeSelect;
function FormDemo(props) {
  const onFormLayoutChange=()=>{
    console.log('onformlayoutchange');
  };
  
  const onChange = (list) => {
    props.setChecked(list,!!list.length && list.length < props.plainOptions.length,list.length === props.plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    props.setChecked(e.target.checked ? props.plainOptions : [],false,e.target.checked);
  };
  const treeOptions=[
    {
      title: '所有地区',
      value: 'all',
      children: [
        {
          label: "东北地区",
          value: "东北地区",
          children: [
            { label: "黑龙江省", value: "黑龙江省",
              children: [
                {label: "哈尔滨", value: "哈尔滨"}
              ]
            },
            { label: "吉林省", value: "吉林省",
              children: [
                {label: "长春", value: "长春"},
                {label: "吉林", value: "吉林"}
              ]
            },
            { label: "辽宁省", value: "辽宁省",
              children: [
                {label: "沈阳", value: "沈阳"},
                {label: "鞍山", value: "鞍山"},
                {label: "大连", value: "大连"}
              ]
            },
          ],
        },
        {
          label: "华北地区",
          value: "华北地区",
          children: [
            { label: "北京市", value: "北京市",
              children: [
                {label: "北京", value: "北京"},
              ]
            },
            { label: "天津市", value: "天津市",
              children: [
                {label: "天津", value: "天津"},
              ]
            },
            { label: "河北省", value: "河北省",
              children: [
                {label: "石家庄", value: "石家庄"},
                {label: "保定", value: "保定"},
                {label: "唐山", value: "唐山"},
              ]
            },
            { label: "山西省", value: "山西省",
              children: [
                {label: "太原", value: "太原"},
              ]
            },
            { label: "内蒙古", value: "内蒙古",
              children: [
                {label: "呼和浩特", value: "呼和浩特"},
                {label: "包头", value: "包头"}
              ]
            },
          ],
        },
        {
          label: "华中地区",
          value: "华中地区",
          children: [
            { label: "河南省", value: "河南省",
              children: [
                {label: "郑州", value: "郑州"},
                {label: "焦作", value: "焦作"},
                {label: "洛阳", value: "洛阳"},
                {label: "南阳", value: "南阳"},
                {label: "新乡", value: "新乡"},
                {label: "许昌", value: "许昌"},
              ]
            },
            { label: "湖北省", value: "湖北省",
              children: [
                {label: "武汉", value: "武汉"},
                {label: "荆门", value: "荆门"},
                {label: "襄阳", value: "襄阳"},
                {label: "宜昌", value: "宜昌"},
              ]
            },
            { label: "湖南省", value: "湖南省",
              children: [
                {label: "长沙", value: "长沙"},
                {label: "衡阳", value: "衡阳"},
                {label: "益阳", value: "益阳"},
                {label: "岳阳", value: "岳阳"},
                {label: "株洲", value: "株洲"},
              ]
            },
          ],
        },
        {
          label: "华东地区",
          value: "华东地区",
          children: [
            { label: "山东省", value: "山东省",
              children: [
                {label: "济南", value: "济南"},
                {label: "滨州", value: "滨州"},
                {label: "德州", value: "德州"},
                {label: "济宁", value: "济宁"},
                {label: "青岛", value: "青岛"},
                {label: "威海", value: "威海"},
                {label: "潍坊", value: "潍坊"},
                {label: "烟台", value: "烟台"},
                {label: "淄博", value: "淄博"},
              ]
            },
            { label: "江苏省", value: "江苏省",
              children: [
                {label: "南京", value: "南京"},
                {label: "常州", value: "常州"},
                {label: "连云港", value: "连云港"},
                {label: "南通", value: "南通"},
                {label: "苏州", value: "苏州"},
                {label: "宿迁", value: "宿迁"},
                {label: "泰州", value: "泰州"},
                {label: "无锡", value: "无锡"},
                {label: "徐州", value: "徐州"},
                {label: "盐城", value: "盐城"},
                {label: "扬州", value: "扬州"},
                {label: "镇江", value: "镇江"},
              ]
            },
            { label: "安徽省", value: "安徽省",
              children: [
                {label: "合肥", value: "合肥"},
                {label: "滁州", value: "滁州"},
                {label: "铜陵", value: "铜陵"},
                {label: "芜湖", value: "芜湖"},
              ]
            },
            { label: "上海市", value: "上海市",
              children: [
                {label: "上海", value: "上海"},
              ]
            },
            { label: "浙江省", value: "浙江省",
              children: [
                {label: "杭州", value: "杭州"},
                {label: "湖州", value: "湖州"},
                {label: "嘉兴", value: "嘉兴"},
                {label: "金华", value: "金华"},
                {label: "宁波", value: "宁波"},
                {label: "衢州", value: "衢州"},
                {label: "绍兴", value: "绍兴"},
                {label: "台州", value: "台州"},
                {label: "温州", value: "温州"},
              ]
            },
            { label: "江西省", value: "江西省",
              children: [
                {label: "南昌", value: "南昌"},
                {label: "赣州", value: "赣州"},
              ]
            },
            { label: "福建省", value: "福建省",
              children: [
                {label: "福州", value: "福州"},
                {label: "龙岩", value: "龙岩"},
                {label: "泉州", value: "泉州"},
                {label: "厦门", value: "厦门"},
                {label: "漳州", value: "漳州"},
              ]
            },
            { label: "台湾", value: "台湾" },
          ],
        },
        {
          label: "华南地区",
          value: "华南地区",
          children: [
            { label: "广东省", value: "广东省",
              children: [
                {label: "广州", value: "广州"},
                {label: "潮州", value: "潮州"},
                {label: "东莞", value: "东莞"},
                {label: "佛山", value: "佛山"},
                {label: "惠州", value: "惠州"},
                {label: "江门", value: "江门"},
                {label: "揭阳", value: "揭阳"},
                {label: "梅州", value: "梅州"},
                {label: "汕头", value: "汕头"},
                {label: "深圳", value: "深圳"},
                {label: "肇庆", value: "肇庆"},
                {label: "珠海", value: "珠海"},
              ]
            },
            { label: "广西省", value: "广西省",
              children: [
                {label: "南宁", value: "南宁"},
                {label: "桂林", value: "桂林"},
                {label: "柳州", value: "柳州"},
              ]
            },
            { label: "海南省", value: "海南省",
              children: [
                {label: "海口", value: "海口"},
              ]
            },
            { label: "香港", value: "香港" },
            { label: "澳门", value: "澳门" },
          ],
        },
        {
          label: "西北地区",
          value: "西北地区",
          children: [
            { label: "陕西省", value: "陕西省",
              children: [
                {label: "西安", value: "西安"},
                {label: "宝鸡", value: "宝鸡"},
              ]
            },
            { label: "甘肃省", value: "甘肃省",
              children: [
                {label: "兰州", value: "兰州"},
              ]
            },
            { label: "宁夏", value: "宁夏",
              children: [
                {label: "银川", value: "银川"},
              ]
            },
            { label: "青海省", value: "青海省",
              children: [
                {label: "西宁", value: "西宁"},
              ]
            },
            { label: "新疆", value: "新疆",
              children: [
                {label: "乌鲁木齐", value: "乌鲁木齐"},
              ]
            },
          ],
        },
        {
          label: "西南地区",
          value: "西南地区",
          children: [
            { label: "四川省", value: "四川省",
              children: [
                {label: "成都", value: "成都"},
                {label: "德阳", value: "德阳"},
                {label: "乐山", value: "乐山"},
                {label: "绵阳", value: "绵阳"},
              ]
            },
            { label: "贵州省", value: "贵州省",
              children: [
                {label: "贵阳", value: "贵阳"},
              ]
            },
            { label: "云南省", value: "云南省",
              children: [
                {label: "昆明", value: "昆明"},
              ]
            },
            { label: "重庆市", value: "重庆市",
              children: [
                {label: "重庆", value: "重庆"},
              ]
            },
            { label: "西藏", value: "西藏",
              children: [
                {label: "拉萨", value: "拉萨"},
              ]
            },
          ],
        },
      ],
    },
    
  
  ];
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
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item></Form.Item>
        <Form.Item label="label">
          <Radio.Group>
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
            onChange={onChange}
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
            value={props.checkedList}
            onChange={onChange}
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
                <Checkbox value="ret(-1)">前一日回报率</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="ret">回报率</Checkbox>
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
        
        <Form.Item label="模型">
          <Select>
            <Select.Option value="linear">线性回归</Select.Option>
            <Select.Option value="OLS">OLS回归</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="区域">
          <TreeSelect
            treeData={treeOptions}
            showSearch={true}
            treeCheckable={true}
            showCheckedStrategy={SHOW_PARENT} 
          />
          <Divider />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        
        <Form.Item label="Button">
          <Button>Button</Button>
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
      indeterminate: false,
      checkAll: false,//是否全选
      stkOptions: [
        '前一日回报率',''
      ],
    };
  }
  setChecked(list,flag1,flag2) {
    this.setState({
      checkedList: list,
      indeterminate: flag1,
      checkAll: flag2,
    })
  }
  render() {
    return (
      <div>
        <FormDemo 
          setChecked={this.setChecked.bind(this)}
          plainOptions={this.state.plainOptions}
          indeterminate={this.state.indeterminate}
          checkAll={this.state.checkAll}
          checkedList={this.state.checkedList}/>
      </div>
    );
  }
}
export default RegDemo;
// const ComponentDemo = () => <FormDisabledDemo />;


// ReactDOM.render(<ComponentDemo />, mountNode);
