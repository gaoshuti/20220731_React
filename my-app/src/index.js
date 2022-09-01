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
import RegDemo from "./components/weatherReg";

const { TabPane } = Tabs;
const { Search } = Input;
const { Header, Content, Sider } = Layout;
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;



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
      <Layout className="container">
        <MyHeader className="header" onClick={this.headerOnClick.bind(this)} />
        {this.state.key==='home'?<Home/>:(this.state.key==='function-1'?<History/>:<RegDemo/>)}
        {/* <History/> */}
      </Layout>
    );
  }
}
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
// const root = createRoot(document.getElementById("root"));
// root.render(<MyMap />);
// const spawn = require('child_process').spawn
// root.get("process_data", (req, res) => {
//   const msg = "北京"
//   spawn('python3', ['/Users/rumeng/Downloads/未命名1.py', msg])
//   console.log(req)
//   console.log(res)
// })
// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

// class Board extends React.Component {

//   renderSquare(i) {
//     return (
//       <Square
//         value={this.props.squares[i]}
//         onClick={() => this.props.onClick(i)}
//       />
//     );
//   }

//   render() {
//     return (
//       <div>
//         {/* <div className="status">{status}</div> */}
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{
//         squares: Array(9).fill(null),
//       }],
//       xIsNext: true,
//       stepNumber: 0,
//     }
//   }
//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length-1];
//     const squares = current.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O';
//     this.setState({
//       history: history.concat([{
//         squares: squares,
//       }]),
//       xIsNext: !this.state.xIsNext,
//       stepNumber: history.length,
//     });
//   }
//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step % 2) === 0,
//     });
//   }
//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares);
//     const moves = history.map((step,move)=>{
//       const desc = move ?
//         'Go to move #'+move :
//         'Go to game start';
//       return(
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>{desc}</button>
//         </li>
//       )
//     })

//     let status;
//     if (winner) {
//       status = 'Winner: ' + winner;
//     } else {
//       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//     }
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board
//             squares = {current.squares}
//             onClick = {(i) => this.handleClick(i)}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// // ========================================

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }
      // cities: [
      //   { name: "北京", lng: "116.395645", lat: "39.929986" },
      //   { name: "上海", lng: "121.487899", lat: "31.249162" },
      //   { name: "天津", lng: "117.210813", lat: "39.143930" },
      //   { name: "重庆", lng: "106.530635", lat: "29.544606" },
      //   { name: "合肥", lng: "117.282699", lat: "31.866942" },
      //   { name: "滁州", lng: "118.324570", lat: "32.317351" },
      //   { name: "铜陵", lng: "117.819429", lat: "30.940930" },
      //   { name: "芜湖", lng: "118.384108", lat: "31.366020" },
      //   { name: "福州", lng: "119.330221", lat: "26.047125" },
      //   { name: "龙岩", lng: "117.017997", lat: "25.078685" },
      //   { name: "泉州", lng: "118.600362", lat: "24.901652" },
      //   { name: "厦门", lng: "118.103886", lat: "24.489231" },
      //   { name: "漳州", lng: "117.676205", lat: "24.517065" },
      //   { name: "兰州", lng: "103.823305", lat: "36.064226" },
      //   { name: "广州", lng: "113.307650", lat: "23.120049" },
      //   { name: "潮州", lng: "116.630076", lat: "23.661812" },
      //   { name: "东莞", lng: "113.763434", lat: "23.043024" },
      //   { name: "佛山", lng: "113.134026", lat: "23.035095" },
      //   { name: "惠州", lng: "114.410658", lat: "23.113540" },
      //   { name: "江门", lng: "113.078125", lat: "22.575117" },
      //   { name: "揭阳", lng: "116.379501", lat: "23.547999" },
      //   { name: "梅州", lng: "116.126403", lat: "24.304571" },
      //   { name: "汕头", lng: "116.728650", lat: "23.383908" },
      //   { name: "深圳", lng: "114.025974", lat: "22.546054" },
      //   { name: "肇庆", lng: "112.479653", lat: "23.078663" },
      //   { name: "珠海", lng: "113.562447", lat: "22.256915" },
      //   { name: "南宁", lng: "108.297234", lat: "22.806493" },
      //   { name: "桂林", lng: "110.260920", lat: "25.262901" },
      //   { name: "柳州", lng: "109.422402", lat: "24.329053" },
      //   { name: "贵阳", lng: "106.709177", lat: "26.629907" },
      //   { name: "海口", lng: "110.330802", lat: "20.022071" },
      //   { name: "石家庄", lng: "114.522082", lat: "38.048958" },
      //   { name: "保定", lng: "115.494810", lat: "38.886565" },
      //   { name: "唐山", lng: "118.183451", lat: "39.650531" },
      //   { name: "郑州", lng: "113.649644", lat: "34.756610" },
      //   { name: "焦作", lng: "113.211836", lat: "35.234608" },
      //   { name: "洛阳", lng: "112.447525", lat: "34.657368" },
      //   { name: "南阳", lng: "112.542842", lat: "33.011420" },
      //   { name: "新乡", lng: "113.912690", lat: "35.307258" },
      //   { name: "许昌", lng: "113.835312", lat: "34.026740" },
      //   { name: "哈尔滨", lng: "126.657720", lat: "45.773217" },
      //   { name: "武汉", lng: "114.316200", lat: "30.581084" },
      //   { name: "荆门", lng: "112.217330", lat: "31.042611" },
      //   { name: "襄阳", lng: "112.176326", lat: "32.094934" },
      //   { name: "宜昌", lng: "111.310981", lat: "30.732758" },
      //   { name: "长沙", lng: "112.979353", lat: "28.213478" },
      //   { name: "衡阳", lng: "112.583819", lat: "26.898164" },
      //   { name: "益阳", lng: "112.366547", lat: "28.588088" },
      //   { name: "岳阳", lng: "113.146196", lat: "29.378007" },
      //   { name: "株洲", lng: "113.131695", lat: "27.827433" },
      //   { name: "南京", lng: "118.778074", lat: "32.057236" },
      //   { name: "常州", lng: "119.981861", lat: "31.771397" },
      //   { name: "连云港", lng: "119.173872", lat: "34.601549" },
      //   { name: "南通", lng: "120.873801", lat: "32.014665" },
      //   { name: "苏州", lng: "120.619907", lat: "31.317987" },
      //   { name: "宿迁", lng: "118.296893", lat: "33.952050" },
      //   { name: "泰州", lng: "119.919606", lat: "32.476053" },
      //   { name: "无锡", lng: "120.305456", lat: "31.570037" },
      //   { name: "徐州", lng: "117.188107", lat: "34.271553" },
      //   { name: "盐城", lng: "120.148872", lat: "33.379862" },
      //   { name: "扬州", lng: "119.427778", lat: "32.408505" },
      //   { name: "镇江", lng: "119.455835", lat: "32.204409" },
      //   { name: "南昌", lng: "115.893528", lat: "28.689578" },
      //   { name: "赣州", lng: "114.935909", lat: "25.845296" },
      //   { name: "长春", lng: "125.313642", lat: "43.898338" },
      //   { name: "吉林", lng: "126.564544", lat: "43.871988" },
      //   { name: "沈阳", lng: "123.432791", lat: "41.808645" },
      //   { name: "鞍山", lng: "123.007763", lat: "41.118744" },
      //   { name: "大连", lng: "121.593478", lat: "38.948710" },
      //   { name: "呼和浩特", lng: "111.660351", lat: "40.828319" },
      //   { name: "包头", lng: "109.846239", lat: "40.647119" },
      //   { name: "银川", lng: "106.206479", lat: "38.502621" },
      //   { name: "西宁", lng: "101.767921", lat: "36.640739" },
      //   { name: "济南", lng: "117.024967", lat: "36.682785" },
      //   { name: "滨州", lng: "117.968292", lat: "37.405314" },
      //   { name: "德州", lng: "116.328161", lat: "37.460826" },
      //   { name: "济宁", lng: "116.600798", lat: "35.402122" },
      //   { name: "青岛", lng: "120.384428", lat: "36.105215" },
      //   { name: "威海", lng: "122.093958", lat: "37.528787" },
      //   { name: "潍坊", lng: "119.142634", lat: "36.716115" },
      //   { name: "烟台", lng: "121.309555", lat: "37.536562" },
      //   { name: "淄博", lng: "118.059134", lat: "36.804685" },
      //   { name: "太原", lng: "112.550864", lat: "37.890277" },
      //   { name: "西安", lng: "108.953098", lat: "34.277800" },
      //   { name: "宝鸡", lng: "107.170645", lat: "34.364081" },
      //   { name: "成都", lng: "104.067923", lat: "30.679943" },
      //   { name: "德阳", lng: "104.402398", lat: "31.131140" },
      //   { name: "乐山", lng: "103.760824", lat: "29.600958" },
      //   { name: "绵阳", lng: "104.705519", lat: "31.504701" },
      //   { name: "拉萨", lng: "91.111891", lat: "29.662557" },
      //   { name: "乌鲁木齐", lng: "87.564988", lat: "43.840380" },
      //   { name: "昆明", lng: "102.714601", lat: "25.049153" },
      //   { name: "杭州", lng: "120.219375", lat: "30.259244" },
      //   { name: "湖州", lng: "120.137243", lat: "30.877925" },
      //   { name: "嘉兴", lng: "120.760428", lat: "30.773992" },
      //   { name: "金华", lng: "119.652576", lat: "29.102899" },
      //   { name: "宁波", lng: "121.579006", lat: "29.885259" },
      //   { name: "衢州", lng: "118.875842", lat: "28.956910" },
      //   { name: "绍兴", lng: "120.592467", lat: "30.002365" },
      //   { name: "台州", lng: "121.440613", lat: "28.668283" },
      //   { name: "温州", lng: "120.690635", lat: "28.002838" },
      // ],
      // provinces: [
      //   { name: "北京市", lng: "116.395645", lat: "39.929986" },
      //   { name: "天津市", lng: "117.210813", lat: "39.143930" },
      //   { name: "河北省", lng: "114.522082", lat: "38.048958" },
      //   { name: "山西省", lng: "112.550864", lat: "37.890277" },
      //   { name: "内蒙古", lng: "111.660351", lat: "40.828319" },
      //   { name: "黑龙江省", lng: "126.657720", lat: "45.500000" },
      //   { name: "吉林省", lng: "125.313642", lat: "43.898338" },
      //   { name: "辽宁省", lng: "123.432791", lat: "41.808645" },
      //   { name: "河南省", lng: "113.649644", lat: "34.756610" },
      //   { name: "湖北省", lng: "114.316200", lat: "30.581084" },
      //   { name: "湖南省", lng: "112.979353", lat: "28.213478" },
      //   { name: "山东省", lng: "117.024967", lat: "36.682785" },
      //   { name: "江苏省", lng: "118.778074", lat: "32.057236" },
      //   { name: "安徽省", lng: "117.282699", lat: "31.866942" },
      //   { name: "上海市", lng: "121.487899", lat: "31.249162" },
      //   { name: "浙江省", lng: "120.219375", lat: "30.259244" },
      //   { name: "江西省", lng: "115.893528", lat: "28.689578" },
      //   { name: "福建省", lng: "119.330221", lat: "26.047125" },
      //   { name: "台湾", lng: "121.520076", lat: "25.030724" },
      //   { name: "广东省", lng: "113.307650", lat: "23.120049" },
      //   { name: "广西省", lng: "108.297234", lat: "22.806493" },
      //   { name: "海南省", lng: "110.330802", lat: "20.022071" },
      //   { name: "香港", lng: "114.173355", lat: "22.320048" },
      //   { name: "澳门", lng: "113.549090", lat: "22.198951" },
      //   { name: "陕西省", lng: "108.953098", lat: "34.277800" },
      //   { name: "甘肃省", lng: "103.823305", lat: "36.064226" },
      //   { name: "宁夏", lng: "106.206479", lat: "38.502621" },
      //   { name: "青海省", lng: "101.767921", lat: "36.640739" },
      //   { name: "新疆", lng: "87.564988", lat: "43.840380" },
      //   { name: "四川省", lng: "104.067923", lat: "30.679943" },
      //   { name: "贵州省", lng: "106.709177", lat: "26.629907" },
      //   { name: "云南省", lng: "102.714601", lat: "25.049153" },
      //   { name: "重庆市", lng: "106.530635", lat: "29.544606" },
      //   { name: "西藏", lng: "91.111891", lat: "29.662557" },
      // ],
      // areas: [
      //   { name: "东北地区", lng: "126.564544", lat: "43.871988" },
      //   { name: "华北地区", lng: "116.395645", lat: "39.929986" },
      //   { name: "华中地区", lng: "112.217330", lat: "31.042611" },
      //   { name: "华东地区", lng: "118.778074", lat: "32.057236" },
      //   { name: "华南地区", lng: "112.479653", lat: "23.078663" },
      //   { name: "西北地区", lng: "101.767921", lat: "36.640739" },
      //   { name: "西南地区", lng: "103.760824", lat: "29.600958" },
      // ],