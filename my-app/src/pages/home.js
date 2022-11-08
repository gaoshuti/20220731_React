import React from "react";
import "../index.css";
import {
  Button,
  Col, 
  Row,
  
} from "antd";
import { CaretRightOutlined } from '@ant-design/icons';

import Weather from "../components/weather";
import StockDemo from "../components/stockDemo";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      spans: [7, 16],
      isOpen: true, //天气窗口是否展开
      bgColor: "#F0F0FF", //天气窗口背景颜色
    };
  }
  spreadClick() {
    if(this.state.isOpen===true) {
      this.setState({
        spans: [0, 23],
        isOpen: false,
        bgColor: "#007FFF"
      });
    }else{
      this.setState({
        spans: [7, 16],
        isOpen: true,
        bgColor: "#F0F0FF"
      });
    }
  }
  render(){
    // let bgColor = "#F0F0FF";
    return(
      <div >
        <p></p>
        <Row>
          <Col span={this.state.spans[0]}>
            <Weather city="北京" bgColor={this.state.bgColor}/>
          </Col>
          <Col span={1}>
            <Button 
              style={{marginLeft: -10}} 
              type="link" 
              icon={<CaretRightOutlined style={{color: this.state.bgColor, fontSize: 30}}/>}
              onClick={this.spreadClick.bind(this)}
            ></Button>
          </Col>
          <Col span={this.state.spans[1]}>
            <StockDemo stkcd="000001" kind={1}/>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Home;
