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
import Weather from "../components/weather";
import { BrowserRouter  as Router, useParams, Route, NavLink, Navigate, Routes, Link, useNavigate } from "react-router-dom";

const axios = require('axios');


function CityInfo(props) {
  const params = useParams();
  const city = params.city;
  console.log('cityInfo:',city);
  return(
    <div>
      <Row>
        <Col span={7}>
          <Weather city={city}/>
        </Col>
        <Col span={1}></Col>
        <Col span={16}>
        </Col>
      </Row>
    </div>
  );
}

export default CityInfo;