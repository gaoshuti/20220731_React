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
  Typography, 
  Upload,
  
} from "antd";
import EChartsReact from 'echarts-for-react';

const axios = require('axios');
const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Column, ColumnGroup } = Table;
const { Panel } = Collapse;

function BehaviourFinance(props) {
  return(
    <div>
      <Title level={3}>行为金融学</Title>
      <br/>
      <p>
        行为金融学是在行为经济学理论基础上发展出的重要分支学科，它对传统主流金融学思想体系中的理性假设提出质疑，认为现实的市场行为中存在一定的非理性因素。
        当以理性人假设和EMH理论为核心的传统金融学遇上无法解释的市场异象时，将人的心理因素纳入考量体系的行为金融学理论由此诞生。
      </p>
      <p>
        行为金融理论从投资者的现实投资方式和决定心理因素着手，分析投资者的现实投资决策对金融资产价值的影响。
        它系统分析了人们的偏好与情感对投资行为、资产价格和资本市场变化的深远影响，是将行为认知理论与金融学思想相结合的产物。
      </p>
      <p>
        行为金融理论认为股票的价格会受到投资主体行为的影响。
        某一时期，如果投资者情绪高涨，表现为高估企业预期收益，低估相应的风险，从而导致抬高股价，偏离基本价格，从而很可能获得较好的收益率。
      </p>
      <p>
        西方行为金融理论的研究对象侧重于关注资本市场中的“异象”，如羊群效应、反应不足、反应过度等。
        以及投资者在做投资决策时所存在的心理偏差及偏好，包括心理账户、羊群行为等非理性信息和损失规避、自我归因等心理，它们影响着人们的理性决策。
        如因心理账户的存在，人们对金融投资产品的价值评估存在差异，导致非理性的投资行为。
      </p>
    </div>
  );
}
function LocalPreferences(props) {
  return(
    <div>
      <Title level={3}>本地偏好</Title>
      <br/>
      <p>
        投资者在选择股票时往往会倾向于购买本地公司的股票，即投资者存在本地偏好行为．本地偏好现象最先在跨国金融市场上被发现，投资者将大部分资金用于配置本国市场股票，之后也被拓展到国内金融市场中，投资者会偏向购买本地公司的股票．投资者基于对本地公司股票的熟悉感和过度自信产生非理性行为偏差而选择购买本地上市公司股票。
      </p>
      <p>
        社会心理学认为，人们很容易对自己身边的事物产生熟悉感和喜爱感，进而对这些事物倾注更多的关注和偏好，这是社会中的个体所普遍存在的心理现象。
        这种心理现象在股票市场的突出表现就是，投资者往往会更多地关注并且配置本地公司的股票。越来越多的学者发现在跨国市场中，投资者并没有选择分散化和多元化的国际投资组合，
        而是将资产更多地配置本国市场的股票。投资者本地偏好现象在中国市场也普遍存在。
        特别是我国的投资群体主要由散户投资者构成，散户易出现非理性行为偏差。
        散户投资者关注上市公司主要通过主动搜索，但其关注度分配存在本地偏差，且这种偏差在在欠发达地区更加明显。
        不同城市的经济发展水平、上市公司稀缺性和知名度以及投资者金融素养等方面都有一定程度的影响，可能因此存在差异。
        现阶段对本地偏好的研究，主要集中在验证不同市场参与主体是否存在本地偏好倾向、本地偏好对股票交易活动的影响等内容方面。
      </p>
      <p style={{float:'right'}}>———《投资者本地偏好对股票市场信息效率影响研究》</p>
      <Divider/>
      <p>
        Huang等（Local bias in investor attention: Evidence from China’s Internet stock message boards[J] . Yuqin Huang,Huiyan Qiu,Zhiguo Wu.  Journal of Empirical Finance . 2016）以中国市场为研究对象，研究发现中国投资者在关注度的配置上存在本地偏差倾向，并且这种偏差在欠发达区域、小规模企业、非沪深300指数、低周转率和名称中包含其所在地名的股票中表现的更加强烈。
      </p>
      <p>
        杨晓兰等（本地偏好、投资者情绪与股票收益率:来自网络论坛的经验证据[J]. 杨晓兰,沈翰彬,祝宇.  金融研究. 2016(12)）基于股吧论坛数据构建本地偏好指标，通过实证研究得出投资者本地偏好会对股票收益率和成交量产生显著影响.
      </p>
    </div>
  );
}
function DataSources(props) {
  var data1 = [
    { "key": "city", "value": "上海", "meaning": "城市",},
    { "key": "date", "value": "2011-01-04", "meaning": "日期",},
    { "key": "max", "value": "277.92", "meaning": "当日城市最高温（开氏度）",},
    { "key": "min", "value": "271", "meaning": "当日城市最低温（开氏度）",},
    { "key": "wind", "value": "2.64", "meaning": "风速",},
    { "key": "lrad", "value": "243.49", "meaning": "地面向下长波辐射",},
    { "key": "prec", "value": "0", "meaning": "降水率",},
    { "key": "pres", "value": "101383.73", "meaning": "近地表气压",},
    { "key": "shum", "value": "0", "meaning": "近地表空气比湿度",},
    { "key": "srad", "value": "124.31", "meaning": "地面向下短波辐射",},
    { "key": "tempDiff1", "value": "0.2", "meaning": "较之于前一日的温差",},
    { "key": "tempDiff7", "value": "0.19", "meaning": "较之于七日平均温度的温差",},
    { "key": "propertion", "value": "30.99", "meaning": "机构持股比例(季度数据)",},
    { "key": "MarCap", "value": "988176.62", "meaning": "流通市值",},
    { "key": "ret", "value": "0.017008", "meaning": "该城市股票的组合收益率(流通市值加权)",},
    { "key": "tur", "value": "0.053852", "meaning": "该城市股票的组合换手率(流通市值加权)",},
    { "key": "snow", "value": "0", "meaning": "雪的哑变量",},
    { "key": "rain", "value": "1", "meaning": "雨的哑变量",},
    { "key": "sand", "value": "0", "meaning": "沙尘的哑变量",},
    { "key": "cloud", "value": "3", "meaning": "云量的哑变量",},
    { "key": "haze", "value": "0", "meaning": "霾的哑变量",},
    { "key": "fog", "value": "0", "meaning": "雾的哑变量",},
    { "key": "hail", "value": "0", "meaning": "冰雹的哑变量",},
    { "key": "sun", "value": "0", "meaning": "晴天的哑变量",},
    { "key": "ris", "value": "0.015513", "meaning": "市场风险溢价因子(流通市值加权)",},
    { "key": "smb", "value": "0.00255", "meaning": "市值因子(流通市值加权)",},
    { "key": "hml", "value": "0.004289", "meaning": "账面市值比因子(流通市值加权)",},
    { "key": "API", "value": "NULL", "meaning": "空气污染指数",},
    { "key": "AQI", "value": "75", "meaning": "空气质量指数",},
  ];
  var city101 = ['镇江', '杭州', '徐州', '潍坊', '西宁', '嘉兴', '保定', '许昌', '柳州', '株洲', '广州', '东莞', '铜陵', '南阳', '桂林', '包头', '龙岩', '重庆', '哈尔滨', '淄博', '洛阳', '荆门', '兰州', '温州', '湖州', '常州', '绵阳', '石家庄', '银川', '南宁', '衢州', '滨州', '鞍山', '德州', '无锡', '南通', '襄阳', '武汉', '长沙', '大连', '梅州', '沈阳', '乐山', '西安', '南昌', '惠州', '连云港', '福州', '北京', '德阳', '济宁', '郑州', '珠海', '乌鲁木齐', '岳阳', '呼和浩特', '宁波', '拉萨', '赣州', '新乡', '天津', '江门', '南京', '长春', '吉林', '济南', '汕头', '太原', '海口', '台州', '宝鸡', '青岛', '威海', '昆明', '贵阳', '上海', '益阳', '深圳', '揭阳', '滁州', '绍兴', '唐山', '合肥', '厦门', '苏州', '焦作', '金华', '泉州', '泰州', '衡阳', '漳州', '成都', '芜湖', '扬州', '盐城', '佛山', '烟台', '潮州', '宿迁', '肇庆', '宜昌'];
  var city42 = ['杭州', '潍坊', '嘉兴', '广州', '东莞', '重庆', '哈尔滨', '淄博', '湖州', '常州', '无锡', '南通', '武汉', '长沙', '大连', '沈阳', '西安', '南昌', '福州', '北京', '郑州', '珠海', '乌鲁木齐', '宁波', '天津', '南京', '长春', '济南', '汕头', '海口', '台州', '青岛', '昆明', '上海', '深圳', '绍兴', '合肥', '厦门', '苏州', '成都', '佛山', '烟台'];
  return(
    <div>
      <Title level={3}>数据来源</Title>
      <br/>
      <p>共包括来自101个城市的2287支股票，构成291,230条数据。</p>
      <p>
        将上市地与总部在同一个城市的股票，视为本地会偏好的股票。
        拥有大于等于5支股票的城市共有101个，其中有42个城市拥有超过20支股票。
        为尽可能地最大化表现出天气对股票的影响，该42个城市选择每日流通市值最小的20支股票构成当日的数据。
      </p>
      <p>
        其中股票数据分别来自CSMAR数据库（公司基本情况表、机构持股比例、日回报率、三因子、无风险利率），
        AkShare（实时股票价格、历史股票价格），
        天气数据来自于国家青藏高原科学数据中心的中国区域地面气象要素驱动数据集（1979-2018）以及百度地图提供的天气查询。
      </p>
      <p>生成的数据格式如下：</p>
      <Table dataSource={data1} size="small" >
        <Column title="变量" width={200} dataIndex="key" key="key"/>
        <Column title="值" width={200} dataIndex="value" key="value"/>
        <Column title="说明" width={500} dataIndex="meaning" key="meaning"/>
      </Table>
      <Divider/>
      <p>101个拥有大于等于5支股票的城市：</p>
      <Row style={{
        margin: 0,
      }}>
        {city101.map((item) => {
          return (
            <Col span={3} key={item}>{item}</Col>);
        })}
      </Row>
      <Divider/>
      <p>42个拥有大于等于20支股票的城市：</p>
      <Row style={{
        margin: 0,
      }}>
        {city42.map((item) => {
          return (
            <Col span={3} key={item}>{item}</Col>);
        })}
      </Row>
    </div>
  );
}

function Verification(props) {
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
    },
    xAxis: {
      type: 'category',
      data: ['前七天', '当天', '第二天', '后三天', '后七天']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [0.022197, 0.019721, 0.019797, 0.021396, 0.023218],
        type: 'bar'
      }
    ]
  };
  let snowDays = [
    '徐州 2014-02-06',
    '保定 2015-11-21',
    '许昌 2017-02-21',
    '铜陵 2012-12-29',
    '铜陵 2013-02-19',
    '铜陵 2016-01-20',
    '哈尔滨 2013-11-17',
    '哈尔滨 2013-11-18',
    '洛阳 2017-02-21',
    '湖州 2016-01-20',
    '湖州 2016-01-21',
    '鞍山 2012-12-03',
    '襄阳 2014-02-06',
    '长沙 2011-01-09',
    '长沙 2016-01-21',
    '大连 2012-12-03',
    '大连 2015-01-21',
    '大连 2016-02-13',
    '沈阳 2012-03-05',
    '沈阳 2012-12-03',
    '北京 2015-11-22',
    '济宁 2017-02-21',
    '郑州 2017-02-21',
    '乌鲁木齐 2015-12-10',
    '乌鲁木齐 2015-12-11',
    '岳阳 2014-02-18',
    '新乡 2017-02-21',
    '长春 2012-11-12',
    '长春 2013-02-28',
    '长春 2013-11-18',
    '吉林 2011-11-18',
    '吉林 2012-11-11',
    '吉林 2012-11-12',
    '吉林 2012-12-03',
    '吉林 2013-11-18',
    '吉林 2013-11-25',
    '威海 2012-12-23',
    '威海 2016-01-23',
    '滁州 2012-12-29',
    '滁州 2013-02-19',
    '合肥 2013-02-19',
    '合肥 2015-01-29',
    '金华 2016-01-22',
    '泰州 2013-02-19',
    '芜湖 2013-02-19',
    '芜湖 2015-01-29',
    '烟台 2012-12-23',
    '烟台 2014-12-31',
    '烟台 2016-01-23',
  ];
  let turCoefficient = [
    { "name": "雪", "key": "snow", "num": 84, "above0": 45, "above001": 22, "below001": 21, "above005": 1, "below005": 2,},
    { "name": "雨**", "key": "rain", "num": 101, "above0": 81, "above001": 30, "below001": 1, "above005": 0, "below005": 0,},
    { "name": "云量**", "key": "cloud", "num": 101, "above0": 77, "above001": 16, "below001": 0, "above005": 0, "below005": 0,},
    { "name": "最高温**", "key": "max", "num": 101, "above0": 55, "above001": 10, "below001": 5, "above005": 0, "below005": 0,},
    { "name": "最低温**", "key": "min", "num": 101, "above0": 57, "above001": 9, "below001": 6, "above005": 0, "below005": 0,},
    { "name": "风速*", "key": "wind", "num": 101, "above0": 55, "above001": 28, "below001": 19, "above005": 0, "below005": 0,},
    { "name": "降水率**", "key": "prec", "num": 101, "above0": 71, "above001": 41, "below001": 10, "above005": 5, "below005": 0,},
    { "name": "近地表气压", "key": "pres", "num": 101, "above0": 43, "above001": 13, "below001": 35, "above005": 0, "below005": 0,},
    { "name": "较昨日温差", "key": "tempDiff1", "num": 101, "above0": 46, "above001": 20, "below001": 29, "above005": 0, "below005": 0,},
    { "name": "较七日平均温度温差**", "key": "tempDiff7", "num": 101, "above0": 38, "above001": 8, "below001": 25, "above005": 0, "below005": 0,},
    // { "name": "", "key": "absTempDiff7", "num": 101, "above0": 58, "above001": 29, "below001": 8, "above005": 0, "below005": 0,},
    { "name": "空气污染指数**", "key": "API", "num": 101, "above0": 29, "above001": 12, "below001": 48, "above005": 1, "below005": 0,},
    { "name": "空气质量指数**", "key": "AQI", "num": 74, "above0": 58, "above001": 47, "below001": 11, "above005": 20, "below005": 4,},
  ];
  let retCoefficient = [
    { "name": "雪**", "key": "snow", "num": 84, "above0": 48, "above001": 36, "below001": 26, "above005": 14, "below005": 7,},
    { "name": "雨", "key": "rain", "num": 101, "above0": 52, "above001": 19, "below001": 14, "above005": 0, "below005": 0,},
    { "name": "云量", "key": "cloud", "num": 101, "above0": 51, "above001": 9, "below001": 9, "above005": 0, "below005": 0,},
    { "name": "最高温", "key": "max", "num": 101, "above0": 43, "above001": 3, "below001": 7, "above005": 0, "below005": 0,},
    { "name": "最低温", "key": "min", "num": 101, "above0": 42, "above001": 5, "below001": 4, "above005": 0, "below005": 0,},
    { "name": "风速**", "key": "wind", "num": 101, "above0": 73, "above001": 53, "below001": 15, "above005": 7, "below005": 0,},
    { "name": "降水率", "key": "prec", "num": 101, "above0": 50, "above001": 36, "below001": 33, "above005": 5, "below005": 2,},
    { "name": "近地表气压", "key": "pres", "num": 101, "above0": 21, "above001": 6, "below001": 37, "above005": 0, "below005": 0,},
    { "name": "较昨日温差**", "key": "tempDiff1", "num": 101, "above0": 32, "above001": 13, "below001": 47, "above005": 0, "below005": 5,},
    { "name": "较七日平均温度温差**", "key": "tempDiff7", "num": 101, "above0": 79, "above001": 51, "below001": 5, "above005": 0, "below005": 0,},
    // { "name": "", "key": "absTempDiff7", "num": 101, "above0": 79, "above001": 51, "below001": 5, "above005": 0, "below005": 0,},
    { "name": "空气污染指数**", "key": "API", "num": 101, "above0": 25, "above001": 10, "below001": 63, "above005": 0, "below005": 1,},
    { "name": "空气质量指数", "key": "AQI", "num": 74, "above0": 36, "above001": 31, "below001": 33, "above005": 11, "below005": 17,},
  ];
  return(
    <div>
      <Title level={3}>验证</Title>
      <br/>
      <p>
        行为金融学认为，投资者情绪会影响其做出的判断与投资决策，从而导致换手率与股价的变化。
        而天气因素，也一直被认为与人的情绪存在着一定的关系。
        因此提出假设：天气因素会影响换手率与收益率。
      </p>
      <br/>
      <Title level={5}>验证天气对当前城市股票组合是否存在影响</Title>
      <div>
        <p>
          以暴雪天气对所属城市组合换手率的影响为例。
          分别选取暴雪天气前七天、当天、第二天、后三天以及后七天的平均换手率，得到结果如图所示：
        </p>
        <EChartsReact option={option}/>
        <p>
          由图表可以看出，在暴雪当天，平均换手率明显低于前七日，且随着时间流逝，暴雪影响逐步消失，换手率恢复至原有水平。
          由此证明本地偏好的存在性以及天气确实会对股市造成一定程度上的影响。
        </p>
        <Collapse ghost defaultActiveKey={['1']}>
          <Panel header="暴雪数据来源" key="1">
            <Row style={{
              margin: 0,
            }}>
              {snowDays.map((item) => {
                return (
                  <Col span={6} key={item}>{item}</Col>);
              })}
            </Row>
          </Panel>
        </Collapse>
      </div>
      <Divider/>

      <Title level={5}>验证各天气因素对换手率的影响正负</Title>
      <div>
        <p>
          利用OLS回归方法，以前一日的组合换手率与组合回报率为动量因子，以该动量因子、机构持股率、流通市值、以及当日回报率作为控制变量，
          训练从而得知各天气因素对于各城市组合换手率回归的系数，根据其系数分布，从而判断是否存在显著影响以及影响正负。
        </p>
        <p>回归所得系数分布如下表所示（**为1%显著，*为5%显著）：</p>
        <Table dataSource={turCoefficient} size="small" >
          <Column title="变量" width={600} dataIndex="name" key="name"/>
          <Column title="总量" width={200} dataIndex="num" key="num"/>
          <Column title=">0" width={200} dataIndex="above0" key="above0"/>
          <Column title=">0.01" width={200} dataIndex="above001" key="above001"/>
          <Column title="<-0.01" width={200} dataIndex="below001" key="below001"/>
          <Column title=">0.05" width={200} dataIndex="above005" key="above005"/>
          <Column title="<-0.05" width={200} dataIndex="below005" key="below005"/>
        </Table>
        <p>观察天气因素回归系数的正负比以及较大影响系数的分布，可以观察得出占比突出的分别为雨、云量、降水率、较七日平均温度温差、空气污染指数、空气质量指数。 </p>
        <b>分析结果：</b>
        <p>分析图表和回归结果，其中不矛盾且表现较突出的为降雨、云量、与前七日平均温度的温差，可以证实其对换手率具有影响。随云层覆盖率变高，或是雨量变大，或是温度的升高与降低，人的心情变得焦躁，表现为换手率变高。</p>
      </div>
      <Divider/>

      <Title level={5}>验证各天气因素对回报率的影响正负</Title>
      <div>
        <p>
          利用OLS回归方法，以前一日的组合回报率为动量因子，以该动量因子、市场风险溢价因子、市值因子、以及账面市值比因子作为控制变量，
          训练从而得知各天气因素对于各城市组合回报率回归的系数，根据其系数分布，从而判断是否存在显著影响以及影响正负。
        </p>
        <p>回归所得系数分布如下表所示（**为1%显著，*为5%显著）：</p>
        <Table dataSource={retCoefficient} size="small" >
          <Column title="变量" width={600} dataIndex="name" key="name"/>
          <Column title="总量" width={200} dataIndex="num" key="num"/>
          <Column title=">0" width={200} dataIndex="above0" key="above0"/>
          <Column title=">0.01" width={200} dataIndex="above001" key="above001"/>
          <Column title="<-0.01" width={200} dataIndex="below001" key="below001"/>
          <Column title=">0.05" width={200} dataIndex="above005" key="above005"/>
          <Column title="<-0.05" width={200} dataIndex="below005" key="below005"/>
        </Table>
        <p>观察天气因素回归系数的正负比以及较大影响系数的分布，可以观察得出占比突出的分别为风速、近地表气压、较昨日温差、较七日平均温度温差、空气污染指数。 </p>
        <b>分析结果：</b>
        <p>分析图表和回归结果，其中不矛盾且表现较突出的为风速、与前七日平均温度的温差的绝对值、空气污染指数，可以证实其对收益率具有影响。随风速变高，或是温差变大，或是空气污染指数降低，收益率变高。</p>
      </div>
    </div>
  );
}
function CorrelativePaper(props) {
  return(
    <div>
      <p>相关论文</p>
    </div>
  );
}
function Others(props) {
  return(
    <div>
      <p>其它</p>
    </div>
  );
}
function MySider(props) {
  const items = [
    {label: "行为金融学", key: "behaviourFinance" },
    {label: "本地偏好", key: "localPreferences" },
    {label: "数据来源", key: "dataSources" },
    {label: "验证", key: "verification" },
    {label: "相关论文", key: "correlativePaper" },
    
  ];
  return (
    <Sider 
      style={{
        overflowY: 'auto',
        background: '#fff',
        height: '100vh',
        // position: 'fixed',
        // left: 0,
        // top: 60,
        // bottom: 0,
      }}
    >
      <Menu
        className="site-layout-background"
        mode="inline"
        onClick={props.menuOnClick}
        style={{
          width: 200,
        }}
        items={items}
        defaultSelectedKeys={["behaviourPsychology"]}
        // selectedKey={props.selectedKey}
      />
    </Sider>
  );
}


class TheoreticalSupport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "behaviourFinance"
    };
  }
  menuOnClick(e) {
    console.log("click ", e, e.key);
    this.setState({
      key: e.key
    });
  }
  render() {
    return(
      <div>
        <Layout className="content">
          <MySider 
            menuOnClick={this.menuOnClick.bind(this)}
            // selectedKey={[this.state.key]}
          />
        <Layout >
          <Content>
            <div style={{margin: 20, }}>
              {this.state.key==='behaviourFinance'?<BehaviourFinance/>:
              (this.state.key==='localPreferences'?<LocalPreferences/>:
              (this.state.key==='dataSources'?<DataSources/>:
              (this.state.key==='verification'?<Verification/>:
              (this.state.key==='correlativePaper'?<CorrelativePaper/>:
              <Others/>))))}
            </div>
            
          </Content>
        </Layout>
      </Layout>
        
      </div>
    );
  }
}

export default TheoreticalSupport;