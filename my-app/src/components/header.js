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

const { Search } = Input;
const { Header, Content, Sider } = Layout;

const onSearch = (value) => console.log(value);

function MyHeader(props) {
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
    { label: "理论", keys: "theory"},
  ];
  return (
    <Header>
      <div className="logo" />
      <div className="search">
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
        />
      </div>
      <Menu
        theme="dark"
        items={items}
        mode="horizontal"
        onClick={props.onClick}
      />
    </Header>
  );
}

export default MyHeader;