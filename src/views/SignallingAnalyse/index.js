import React from 'react';
import { Tabs } from 'antd';
import SignallingCheck from './SignallingCheck/SignallingCheck';
import UserActiveShow from "./MultidimensionalUser/UserActiveShow";
import DataAnalysis from "./SignallingdataAnalysis/DataAnalysis";
import TargetUserAnalysis from "./TargetuserAnalysis/TargetUserAnalysis";
const TabPane = Tabs.TabPane;


class SignallingAnalyse extends React.PureComponent {
  render() {
    return (
      //  默认展示哪个页面
      <Tabs defaultActiveKey="1">
        <TabPane tab="信令检索" key="1">
            <SignallingCheck />
        </TabPane>
        <TabPane tab="用户多维展示" key="2">
            <UserActiveShow />
        </TabPane>
        <TabPane tab="用户数据分析" key="3">Content of Tab Pane 3</TabPane>
        <TabPane tab="信令数据分析" key="4">
            <DataAnalysis />
        </TabPane>
        <TabPane tab="目标用户专项分析" key="5">
            <TargetUserAnalysis/>
        </TabPane>
      </Tabs>
    );
  }
}

export default SignallingAnalyse;
