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
      <Column
        title={valueTitle}
        dataIndex="value"
        key="value"
        render={(value) => {
          if (props.label==='rain') {
            switch (value) {
              case '0':
                return '无雨'
              case '1':
                return '小雨'
              case '2':
                return '中雨'
              case '3':
                return '大雨'
              case '4':
                return '暴雨'
              case 'all':
                return '所有'
            }
          } else if (props.label === 'snow') {
            switch (value) {
              case '0':
                return '无雪'
              case '1':
                return '小雪'
              case '2':
                return '中雪'
              case '3':
                return '大雪'
              case '4':
                return '暴雪'
              case 'all':
                return '所有'
            }
          } else if (props.label === 'cloud') {
            switch (value) {
              case '0':
                return '晴'
              case '1':
                return '少云'
              case '2':
                return '多云'
              case '3':
                return '阴天或雨雪天气'
              case '4':
                return '雨雪等级 ≥ 3'
              case 'all':
                return '所有'
            }
          }
          return value
        }}
      />
      <Column title="天数" dataIndex="num" key="num" />
      <ColumnGroup title="收益率">
        <ColumnGroup title="天数">
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
