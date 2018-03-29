import React, {Component} from "react";
import {
  Layout,
  Row,
  Col,
  Table,
  DatePicker,
  Input,
  Button
} from 'antd';
import ReactEcharts from 'echarts-for-react';

import "./userActiveShow.css"
const {Sider} = Layout;

export default class UserActiveShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      option: {
        // 定义样式和数据
        backgroundColor: '#FBFBFB',
        title: {
          text: '用户活跃度情况',
          x: 'center',
          backgroundColor: "#79b7f7",
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: "#fff"
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [
            '语音', '短信', '位置更新', '总量'
          ],
          y: "bottom",
          fontSize: 16
        },

        calculable: true,

        xAxis: [
          {
            // axisLabel: {
            // rotate: 30,
            // interval: 0
            // },
            axisLine: {
              lineStyle: {
                color: '#f00'
              }
            },
            type: 'category',
            boundaryGap: false,
            data: function() {
              var list = [];
              for (var i = 10; i < 18; i++) {
                if (i <= 12) {
                  list.push('2017-' + i + '-01');
                } else {
                  list.push('2018-' + (
                  i - 12) + '-01');
                }
              }
              return list;
            }()
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            }
          }
        ],
        series: [
          {
            name: '语音',
            type: 'line',
            symbol: 'none',
            smooth: 0.3,
            color: ['#66AEDE'],
            data: [
              100,
              300,
              500,
              700,
              200,
              400,
              600,
              800
            ]
          }, {
            name: '短信',
            type: 'line',
            symbol: 'none',
            smooth: 0.3,
            color: ['#90EC7D'],
            data: [
              600,
              300,
              400,
              200,
              300,
              300,
              200,
              400
            ]
          }, {
            name: '位置更新',
            type: 'line',
            symbol: 'none',
            smooth: 0.4,
            color: ['#ff0'],
            data: [
              100,
              300,
              500,
              300,
              200,
              200,
              100,
              200
            ]
          }, {
            name: '总量',
            type: 'line',
            symbol: 'none',
            smooth: 0.5,
            color: ['#f00'],
            data: [
              800,
              1200,
              1400,
              1200,
              700,
              900,
              900,
              1400
            ]
          }
        ]
      }
    }
  }

  render() {
    const {startValue, endValue, endOpen} = this.state;
    const data = [
      {
        key: '1',
        sourceCode: '002-100-001',
        purposeCode: '004-120-003',
        cicCode: '18',
        callNumber1: '1300000000',
        callNumber2: '1310000000',
        signType: '1'
      }, {
        key: '2',
        sourceCode: '002-100-001',
        purposeCode: '004-120-003',
        cicCode: '18',
        callNumber1: '1300000000',
        callNumber2: '1310000000',
        signType: '1'
      }, {
        key: '3',
        sourceCode: '002-100-001',
        purposeCode: '004-120-003',
        cicCode: '18',
        callNumber1: '1300000000',
        callNumber2: '1310000000',
        signType: '1'
      }, {
        key: '4',
        sourceCode: '002-100-001',
        purposeCode: '004-120-003',
        cicCode: '18',
        callNumber1: '1300000000',
        callNumber2: '1310000000',
        signType: '1'
      }, {
        key: '5',
        sourceCode: '002-100-001',
        purposeCode: '004-120-003',
        cicCode: '18',
        callNumber1: '1300000000',
        callNumber2: '1310000000',
        signType: '1'
      }, {
        key: '6',
        sourceCode: '002-100-001',
        purposeCode: '004-120-003',
        cicCode: '18',
        callNumber1: '1300000000',
        callNumber2: '1310000000',
        signType: '1'
      }, {
        key: '7',
        sourceCode: '002-100-001',
        purposeCode: '004-120-003',
        cicCode: '18',
        callNumber1: '1300000000',
        callNumber2: '1310000000',
        signType: '1'
      }, {
        key: '8',
        sourceCode: '002-100-001',
        purposeCode: '004-120-003',
        cicCode: '18',
        callNumber1: '1300000000',
        callNumber2: '1310000000',
        signType: '1'
      }
    ];

    const communications = [
      {
        title: '源信令点码',
        dataIndex: 'sourceCode',
        key: 'sourceCode'
      }, {
        title: '目的信令点码',
        dataIndex: 'purposeCode',
        key: 'purposeCode'
      }, {
        title: 'CIC编码',
        dataIndex: 'cicCode',
        key: 'cicCode'
      }, {
        title: '被叫号码',
        dataIndex: 'callNumber1',
        key: 'callNumber1'
      }, {
        title: '主叫号码',
        dataIndex: 'callNumber2',
        key: 'callNumber2'
      }, {
        title: '信令类型',
        dataIndex: 'signType',
        key: 'signType'
      }
    ];

    const messageNews = [
      {
        title: '主叫号码',
        dataIndex: 'sourceCode',
        key: 'sourceCode'
      }, {
        title: '被叫号码',
        dataIndex: 'purposeCode',
        key: 'purposeCode'
      }, {
        title: 'OPC',
        dataIndex: 'cicCode',
        key: 'cicCode'
      }, {
        title: 'CIS',
        dataIndex: 'callNumber1',
        key: 'callNumber1'
      }, {
        title: 'TS',
        dataIndex: 'callNumber2',
        key: 'callNumber2'
      }, {
        title: '语言编码格式',
        dataIndex: 'signType',
        key: 'signType'
      }
    ];

    const mapSign = [
      {
        title: 'IMSI No',
        dataIndex: 'sourceCode',
        key: 'sourceCode'
      }, {
        title: 'MSC Num',
        dataIndex: 'purposeCode',
        key: 'purposeCode'
      }, {
        title: 'MSISDN',
        dataIndex: 'cicCode',
        key: 'cicCode'
      }, {
        title: 'MAP_IMSI',
        dataIndex: 'callNumber1',
        key: 'callNumber1'
      }, {
        title: '漫游号码',
        dataIndex: 'callNumber2',
        key: 'callNumber2'
      }
    ];

    return (<div>
      {/* 左侧搜索 */}
      <Layout>
        <Sider style={{
            backgroundColor: "#deeeff"
          }}>
          <div className="searchCondition">
            <p className="searchTitle">检索条件</p>
            <div className="datePicker">
              开始时间:
              <DatePicker disabledDate={this.disabledStartDate} showToday="showToday" showTime="showTime" format="YYYY-MM-DD HH:mm:ss" value={startValue} placeholder="Start" onChange={this.onStartChange} onOpenChange={this.handleStartOpenChange}/>
            </div>
            <div className="datePicker">
              结束时间:
              <DatePicker disabledDate={this.disabledEndDate} showTime="showTime" format="YYYY-MM-DD HH:mm:ss" value={endValue} placeholder="End" onChange={this.onEndChange} open={endOpen} onOpenChange={this.handleEndOpenChange}/>
            </div>
            <div className="frontNumber">
              关键字 ：
              <Input placeholder="关键字"/>
            </div>
            <Button type="primary" className="searchButton">搜索</Button>
            {/* 功能菜单 */}
            <div className="functionMenu">
              <p className="functionTitle">功能菜单</p>
              <div style={{
                  margin: "auto",
                  width: 80,
                  height: 80
                }}>
                <img src="/inconfont.svg" alt="图片加载失败"/>
                <p>活跃度准则</p>
              </div>
            </div>
          </div>
        </Sider>
        <Layout>
          <Row>
            <Col span={15}>
              <div>
                <ReactEcharts option={this.state.option} style={{
                    height: "350px",
                    backgroundColor: "#e6e6e6",
                    width: "100%"
                  }}/>
              </div>
              <div className="cardMobileShow">
                {/* 一卡多机消息 */}
                <div className="mobileCard">
                  <p>一卡多机消息</p>
                  <div>
                    {/* 这要用echarts来进行手机的卡和手机信息的展示 */}
                    盒子1
                  </div>
                </div>
                {/* 一机多卡消息 */}
                <div className="cardMobile">
                  <p>一机多卡消息</p>
                  <div>
                    {/* 这要用echarts来进行手机的卡和手机信息的展示 */}
                    盒子2
                  </div>
                </div>
              </div>
            </Col>
            <Col span={9}>
              {/* 通联消息 */}
              <div className="communications">
                <p>通联消息</p>
                <Table columns={communications} dataSource={data} pagination={false}/>
              </div>
              {/* 报文消息 */}
              <div className="messageNews communications">
                <p>报文消息</p>
                <Table columns={messageNews} dataSource={data} pagination={false}/>
              </div>
              {/* MAP信令 */}
              <div className="mapSign communications">
                <p>MAP信令</p>
                <Table columns={mapSign} dataSource={data} pagination={false}/>
              </div>
            </Col>
          </Row>
        </Layout>

      </Layout>
    </div>)
  }
  //日期控件
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({[field]: value});
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({endOpen: true});
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({endOpen: open});
  }
}
