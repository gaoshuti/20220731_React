import React, { useState } from "react";
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

import { BrowserRouter  as Router, useParams, Route, NavLink, Navigate, Routes, Link, useNavigate } from "react-router-dom";
import StockDemo from "../components/stockDemo";
const axios = require('axios');


function StockInfo(props) {
  const params = useParams();
  const stkcd = params.stkcd;
  console.log('stockInfo:',stkcd);
  return(
    <div>
      <StockDemo stkcd={stkcd} />
    </div>
  );
}

export default StockInfo;