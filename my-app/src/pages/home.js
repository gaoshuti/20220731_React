import React from "react";
import "../index.css";
import {
  Col, 
  Row,
  
} from "antd";
import Weather from "../components/weather";
import StockDemo from "../components/stockDemo";

class Home extends React.Component {
  render(){
    return(
      <div 
      >
        <p></p>
        <Row>
          <Col span={7}>
            <Weather city="北京"/>
          </Col>
          <Col span={1}></Col>
          <Col span={16}>
            <StockDemo stkcd="000001"/>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Home;
