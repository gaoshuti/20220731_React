import React from "react";
import "../index.css";
import {
  Collapse,
  
} from "antd";

import { useParams } from "react-router-dom";
import StockDemo from "../components/stockDemo";
import StockPredict from "./stockPredict";

const { Panel } = Collapse;

function StockInfo(props) {
  const params = useParams();
  const stkcd = params.stkcd;
  // const stkcd = props.stkcd;
  console.log('stockInfo:',stkcd);
  return(
    <div style={{marginLeft: 50, marginTop: 20}}>
      <StockDemo stkcd={stkcd} />
      <Collapse ghost>
        <Panel header="LSTM模型" key="1">
          <StockPredict stkcd={stkcd}/>
        </Panel>
      </Collapse>
    </div>
  );
}

export default StockInfo;