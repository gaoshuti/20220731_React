import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/home";
import History from "./pages/historyMap";
import MyHeader from "./components/header";
import WeatherReg from "./pages/weatherReg";
import StockPredict from "./pages/stockPredict";
import TheoreticalSupport from "./pages/theoreticalSupport";
import CityInfo from "./pages/cityInfo";
import StockInfo from "./pages/stockInfo";
import { BrowserRouter  as Router, Route, Routes } from "react-router-dom";

function NoMatch(props) {
  return(
    <div style={{margin:50}}>
      <h3>404 not found</h3>
      <p>无法找到该页面</p>
    </div>
  );
}
function SearchError(props) {
  return (
    <div style={{margin:50}}>
      <h3>Error</h3>
      <p>没有相关数据，请重新输入</p>
    </div>
  );
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      key: 'home',
      // value: '',//搜索框内容
    };
  }
  // setValue(value) {
  //   this.setState({
  //     value: value
  //   });
  // }
  render() {
    return (
      <Router>
        <div className="App">
          <MyHeader className="header"/>
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/historymap" element={<History />}></Route>
              <Route path="/weatherreg" element={<WeatherReg />}></Route>
              <Route path="/stockpredict" element={<StockPredict stkcd="000001"/>}></Route>
              <Route path="/about" element={<TheoreticalSupport />}></Route>
              <Route path="/city/:city" element={<CityInfo/>}></Route>
              <Route path="/stock/:stkcd" element={<StockInfo/>}></Route>
              {/* <Route path="/city" element={<CityInfo city={this.state.value}/>}></Route>
              <Route path="/stock" element={<StockInfo stkcd={this.state.value}/>}></Route> */}
              <Route path="/error" element={<SearchError />}></Route>
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
