import React from 'react';
import {Tabs} from 'antd';
import SignallingCheck from './SignallingCheck/SignallingCheck';
import MultidimensionalUser from "./MultidimensionalUser/MultidimensionalUser";
import SignallingdataAnalysis from "./SignallingdataAnalysis/SignallingdataAnalysis";
import TargetUserAnalysis from "./TargetuserAnalysis/TargetUserAnalysis";
import UserdataAnalysis from "./UserdataAnalysis/UserdataAnalysis"
const TabPane = Tabs.TabPane;

class SignallingAnalyse extends React.PureComponent {
  render() {
    return (
    //  默认展示哪个页面
    <Tabs defaultActiveKey="1">
      <TabPane tab="信令检索" key="1">
        <SignallingCheck/>
      </TabPane>
      <TabPane tab="用户多维展示" key="2">
        <MultidimensionalUser/>
      </TabPane>
      <TabPane tab="用户数据分析" key="3">
        <UserdataAnalysis/>
      </TabPane>
      <TabPane tab="信令数据分析" key="4">
        <SignallingdataAnalysis/>
      </TabPane>
      <TabPane tab="目标用户专项分析" key="5">
        <TargetUserAnalysis/>
      </TabPane>
    </Tabs>);
  }
}

export default SignallingAnalyse;
