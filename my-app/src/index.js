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
// import SizeContext from "antd/lib/config-provider/SizeContext";
// import { getKeyThenIncreaseKey } from "antd/lib/message";
import Home from "./pages/home";
import History from "./pages/historyMap";
import MyHeader from "./components/header";
import WeatherReg from "./pages/weatherReg";
import StockPredict from "./pages/stockPredict";
import TheoreticalSupport from "./pages/theoreticalSupport";
import CityInfo from "./pages/cityInfo";
import StockInfo from "./pages/stockInfo";
import { BrowserRouter  as Router, Route, NavLink, Navigate, Routes, Link, useNavigate } from "react-router-dom";

// import App from "./APP";

const { TabPane } = Tabs;
const { Search } = Input;
const { Header, Content, Sider } = Layout;
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;

// function NoMatch([location]) {
//   return(
//     <div>
//       <h3>404 not found</h3>
//       <p>无法找到{location.pathname}</p>
//       {/* <NavLink to="/">返回首页</NavLink> */}
//     </div>
//   );
// }
function NoMatch(props) {
  return(
    <div style={{margin:50}}>
      <h3>404 not found</h3>
      <p>无法找到该页面</p>
      {/* <NavLink to="/">返回首页</NavLink> */}
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
  render() {
    return (
      <Router>
        <div className="App">
          <MyHeader className="header" />
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/historymap" element={<History />}></Route>
              <Route path="/weatherreg" element={<WeatherReg />}></Route>
              <Route path="/stockpredict" element={<StockPredict />}></Route>
              <Route path="/about" element={<TheoreticalSupport />}></Route>
              <Route path="/city/:city" element={<CityInfo/>}></Route>
              <Route path="/stock/:stkcd" element={<StockInfo/>}></Route>
              <Route path="*" element={<NoMatch/>}></Route>

            </Routes>
          </header>
        </div>
      </Router>
    );
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
