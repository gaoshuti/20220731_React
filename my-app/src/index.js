import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  // Button,
  // Dropdown,
  Menu,
  Space,
  Table,
  Tag,
  Tabs,
  Input,
  Layout,
  Collapse,
} from "antd";
import SizeContext from "antd/lib/config-provider/SizeContext";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import Home from "./components/home";
import History from "./components/historyMap";
import MyHeader from "./components/header";
import WeatherReg from "./components/weatherReg";
import StockPredict from "./components/stockPredict";
import { BrowserRouter  as Router, Route, NavLink, Navigate, Routes } from "react-router-dom";

const { TabPane } = Tabs;
const { Search } = Input;
const { Header, Content, Sider } = Layout;
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;

function NoMatch([location]) {
  return(
    <div>
      <h3>404 not found</h3>
      <p>无法找到{location.pathname}</p>
      <NavLink to="/">返回首页</NavLink>
    </div>
  );
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      key: 'home'
    };
  }
  headerOnClick(e) {
    console.log("click ", e, e.key);
    this.setState({
      key: e.key
    })
  }
  render() {
    return (
      <div>
      <Layout className="container">
        <MyHeader className="header" onClick={this.headerOnClick.bind(this)} />
          {this.state.key==='home'?<Home/>:(this.state.key==='function-1'?<History/>:(this.state.key==='function-2'?<WeatherReg/>:<StockPredict/>))}
          {/* <Router>
          <Routes>
            <Route path="/historyMap" element={<History/>}></Route>
            <Route path="/stockPredict" element={<StockPredict/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="*" element={NoMatch}></Route>
          </Routes>
          </Router> */}
      </Layout>
      
    </div>
    );
  }
}
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
