import {
  Menu,
  Input,
  Layout,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Header } = Layout;
const items = [
    { label: "主页", key: "home" }, // 菜单项务必填写 key
    {
      label: "功能",
      key: "function",
      children: [
        { label: "历史百分比", key: "function-1" },
        { label: "回归", key: "function-2" },
        { label: "股价预测", key: "function-3" },
      ],
    },
    { label: "理论", key: "theory"},
  ];
function MyHeader(props) {
  const navigate = useNavigate();
  const headerOnClick = (e) => {
    console.log("click ", e, e.key);
    if(e.key==='home') {
      navigate("/");
    }else if(e.key==='function-1') {
      navigate("/historymap");
    }else if(e.key==='function-2') {
      navigate("/weatherreg");
    }else if(e.key==='function-3') {
      navigate("/stockpredict");
    }else if(e.key==='theory') {
      navigate("/about");
    }
  }
  const onSearch = (value, event) => {
    console.log(value);
    // console.log(event);
    var patt1=new RegExp(/^\d+$/);
    var part2=new RegExp(/^[\u4e00-\u9fa5]+$/);
    if(patt1.test(value) && value.length===6) {//由数字构成，股票代码
      console.log('stkcd');
      // props.setValue(value);
      // navigate("/stock");
      navigate(`/stock/${value}`,{replace: true});
    }else if(part2.test(value)) {//由汉字构成，城市
      console.log('city');
      // props.setValue(value);
      // navigate("/city");
      navigate(`/city/${value}`,{replace: true});
  
    }else{
      console.log('search error!');
      navigate('/error');
    }
  
  }
  return (
    <Header>
      <div className="logo" />
      <div className="search">
        <Search
          maxLength={6}
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
        />
      </div>
      <Menu
        theme="dark"
        items={items}
        mode="horizontal"
        onClick={headerOnClick}
      />
    </Header>
  );
}

export default MyHeader;