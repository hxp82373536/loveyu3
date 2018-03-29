import React from 'react';
import { Tabs } from 'antd';
import SignallingCheck from './SignallingCheck/SignallingCheck'
import DataAnalysis from './SignallingdataAnalysis/DataAnalysis'
import UserActiveShow from './UserdataAnalysis/UserActiveShow'
const TabPane = Tabs.TabPane;




class SignallingAnalyse extends React.PureComponent {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="信令检索" key="1"><SignallingCheck /></TabPane>
        <TabPane tab="用户多维展示" key="2"><UserActiveShow /></TabPane>
        <TabPane tab="用户数据分析" key="3">11111</TabPane>
        <TabPane tab="信令数据分析" key="4"><DataAnalysis/></TabPane>
        <TabPane tab="目标用户专项分析" key="5">Content of Tab Pane 5</TabPane>
      </Tabs>
    );
  }
}

export default SignallingAnalyse;
