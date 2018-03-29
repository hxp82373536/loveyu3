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
//样式
import "./dataAnalysis.css";

const {Sider} = Layout;

const columns = [
  {
    title: '类别',
    dataIndex: 'category',
    key: 'category'
  }, {
    title: '数量',
    key: 'number',
    render: (text, record) => (<span>
      {/* {record.name} */}
      2000
    </span>)
  }
];

const data = [
  {
    key: '1',
    category: '收到消息总数'
  }, {
    key: '2',
    category: '消息类型总数'
  }, {
    key: '3',
    category: '收到消息类型数'
  }, {
    key: '4',
    category: '未收到消息类型数'
  }
];

export default class DataAnalysis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      option: {
        backgroundColor: '#fff',
        title: {
          text: '信令类型分类',
          subtext: '2018年',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 24
          },
          subtextStyle: {
            fontWeight: 'normal',
            fontSize: 24
          }
        },
        // 鼠标移上去显示内容
        // tooltip: {
        //     trigger: 'item',
        //     formatter: "{a} <br/>{b}: {c} ({d}%)"
        // },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ["信令类型X", '信令类型说明', '信令分类', "信令展示"]
        },
        series: [// 中心圆的编辑地
          // {
          //     type:'pie',
          //     radius: [0, '36%'],
          //
          //     label: {
          //         normal: {
          //             position: 'inner'
          //         }
          //     },
          //
          //     labelLine: {
          //         normal: {
          //             show: true
          //         }
          //     },
          //     data:[
          //         {value:1,},
          //     ]
          // },
          {
            name: '信令类型XX',
            type: 'pie',
            radius: [
              '40%', '55%'
            ],
            label: {
              normal: {
                formatter: '{title|{a}}\n{hr|}\n  {b|{b}：}{c}',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                shadowBlur: 3,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: '#999',
                padding: [
                  0, 7
                ],
                rich: {
                  title: {
                    color: '#f00',
                    fontSize: 16,
                    lineHeight: 22
                  },

                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [
                      2, 4
                    ],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              {
                value: 10000,
                name: '信令类型X',
                label: {
                  normal: {
                    //添加的文字内容
                    formatter: ['{title|{b}}', '    {signCount|收到的信令数量:}{valueCount|10000}', '{hr|}', '    {signType|信令类型情况说明:}', '    {value|XXXXXXX},'].join('\n'),
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    shadowBlur: 3,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    shadowColor: '#999',
                    padding: [
                      0, 7
                    ],
                    //样式
                    rich: {
                      title: {
                        color: '#f00',
                        fontSize: 16
                      },
                      signCount: {
                        margin: 30,
                        height: 20
                      },
                      hr: {
                        borderColor: '#777',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                      },
                      signType: {
                        lineHeight: 25,
                        padding: [
                          10, 0
                        ],
                        marginTop: 20,
                        margin: [10, 5]
                      }
                    }
                  }
                }
              }, {
                value: 10000,
                name: '信令类型说明'
              }, {
                value: 10000,
                name: '信令分类'
              }, {
                value: 10000,
                name: '信令展示'
              }
            ]
          }
        ]
      }
    }
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

  render() {
    const {startValue, endValue, endOpen} = this.state;
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
              阵地号 ：
              <Input placeholder="阵地号"/>
            </div>
            <Button type="primary" className="searchButton">搜索</Button>
          </div>
          {/* 功能菜单 */}
          <div className="functionMenu">
            <p className="functionTitle">功能菜单</p>
          </div>
        </Sider>
        <Layout>
          {/* 头部 */}
          <Row>
            <Col span={15}>
              <p className="preview">统计预览</p>
              <ReactEcharts option={this.state.option} style={{
                  height: "660px",
                  backgroundColor: "#e6e6e6"
                }}/>
            </Col>
            <Col span={9} style={{
                height: "660px"
              }}>
              <div style={{
                  height: "330px",
                  backgroundColor: "#f0f2f5"
                }}>
                <Table columns={columns} dataSource={data}/>
              </div>
              <div style={{
                  height: "330px",
                  backgroundColor: "#f0f2f5"
                }}>
                <Table columns={columns} dataSource={data}/>
              </div>
            </Col>

          </Row>
        </Layout>
      </Layout>
    </div>)
  }
}
