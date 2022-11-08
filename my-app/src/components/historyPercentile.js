//城市的历史百分位

import React from "react";
import "../index.css";
import {
  Table,
  Tooltip,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;

function HistoryPercentile(props) {
  var data1=props.result, valueTitle, proTitle;
  // const options=[
  if(props.label==='rain')
    valueTitle = (
      <div>值 
        <Tooltip placement="right" title="值(气象等级)：0—无雨，1-小雨，2-中雨，3-大雨，4-暴雨" arrowPointAtCenter>
          <QuestionCircleOutlined />
        </Tooltip>
      </div>);
  else if(props.label==='snow')
    valueTitle = (
      <div>值 
        <Tooltip placement="right" title="值(气象等级)：0—无雪，1-小雪，2-中雪，3-大雪，4-暴雪" arrowPointAtCenter>
          <QuestionCircleOutlined />
        </Tooltip>
      </div>);
  else if(props.label==='cloud')
    valueTitle = (
      <div>值 
        <Tooltip placement="right" title="值(气象等级)：0—晴，1-少云，2-多云，3-阴天或雨雪天气，4-雨雪等级大于等于3" arrowPointAtCenter>
          <QuestionCircleOutlined />
        </Tooltip>
      </div>);
  proTitle = (
    <div>比例  
      <Tooltip placement="right" title="比例(收益率正负数量比例)：取本地区所有数据的正负数量比例为1:1，依据该比例计算各天气因素下的比例" arrowPointAtCenter>
        <QuestionCircleOutlined />
      </Tooltip>
    </div>);
  return (
    <div>
      {/* <Divider/> */}
      {/* 查询（最小值/最大值）   <Cascader defaultValue={['0', '4']} options={options} onChange={onChange} /> */}
    <Table dataSource={data1} size="small" pagination={false}>
      {/* <Spin spinning={loading}> */}
      <Column title={valueTitle} dataIndex="value" key="value" />
      <Column title="数量" dataIndex="num" key="num" />
      <ColumnGroup title="收益率">
        <ColumnGroup title="数量">
          <Column title=">0" dataIndex="aboveNum" key="aboveNum" />
          <Column title="<0" dataIndex="belowNum" key="belowNum" />
        </ColumnGroup>
        <ColumnGroup title={proTitle}>
          <Column title=">0" dataIndex="above" key="above" />
          <Column title="<0" dataIndex="below" key="below" />
        </ColumnGroup>
      </ColumnGroup>
      {/* </Spin> */}
    </Table>
    </div>
  )  
}

export default HistoryPercentile;