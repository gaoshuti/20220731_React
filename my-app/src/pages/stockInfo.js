import React, { useState } from "react";
import "../index.css";
import {
  Collapse,

} from "antd";

import { useParams } from "react-router-dom";
import StockDemo from "../components/stockDemo";
import StockPredict from "./stockPredict";
import { useNavigate } from "react-router-dom";
const axios = require('axios');
const { Panel } = Collapse;

function StockInfo(props) {
  const params = useParams();
  const stkcd = params.stkcd;
  const navigate = useNavigate();
  // const stkcd = props.stkcd;
  // const [stkInfo,setStkInfo] = useState(0);
  const [stkcd2,setStkcd2] = useState('');
  if(stkcd!==stkcd2){
    console.log('stkcd*2:',stkcd2,stkcd)
    axios.get("/api/map/stockInfo/"+stkcd).then((res)=>{
      var result=res.data;
      if(result['ret']===0)  {//成功
        setStkcd2(stkcd);
      }else{
        console.log(result['msg']);
        navigate("/error");
        return;
      };
    });
  }

  return(
    <div style={{marginLeft: 50, marginTop: 20}}>
      <StockDemo stkcd={stkcd} kind={2}/>
      <Collapse ghost>
        <Panel header="LSTM模型" key="1">
          <StockPredict stkcd={stkcd}/>
        </Panel>
      </Collapse>
    </div>
  );


}

export default StockInfo;
