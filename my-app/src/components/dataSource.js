// 城市包含的股票数据展示
import React from "react";
import "../index.css";
import {
  Col, 
  Row,
  Table,
} from "antd";

function DataSource(props) {
  var data=props.data
  const columns = [
    {
      title: '城市名称',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: '股票数量',
      dataIndex: 'num',
      key: 'num',
    },
  ]
  
  return(
    <div>
      {/* <Title level={3}>数据源</Title> */}
      <p>该地区包含如下数据：</p>
      <Table
        columns={columns}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: (record) => (
            <Row style={{
              margin: 0,
            }}>
              {record.stkcd.map((item) => {
                return (<Col span={4} key={item}>{item}</Col>);
              })}
            </Row>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
    </div>
  )
}
export default DataSource;