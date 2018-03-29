import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CheckTable from './CheckTable'
import * as ActionCreators from './SignallingCheckRedux'

import {DatePicker, message, Input, Layout, Button} from 'antd';

//样式
import "./signlingCheck.css";
const {RangePicker} = DatePicker;
// const Search = Input.Search;
const {Header, Footer, Sider, Content} = Layout;

//es7修饰器写法  需要侵入creact-react-app
// @connect(
//   state => ({
//     signallingList: state.SignallingCheck.signallingList,
//   }),
//   dispatch => bindActionCreators(ActionCreators, dispatch)
//    dispatch => ({
//   loadSignallings: bindActionCreators(ActionCreators, dispatch)
//    })
// )
let param = {
  startTime: "",
  endTime: "",
  keyWord: ""
}
class SignallingCheck extends React.PureComponent {
  componentDidMount() {
    this.props.loadSignalling(param);
    this.error();
  }

  error() {
    if (this.props.error)
      message.error('This is a message of error');
    }

  onChange(datas, dateStrings) {
    param.startTime = dateStrings[0];
    param.endTime = dateStrings[1];
  }

  onClick(value) {
    param.keyWord = value;
    this.props.loadSignalling(param);
    this.error();
  }

  render() {
    return (<div>
      <Layout>
        {/* 左边栏 */}
        <Sider>
          {/* 条件检索 */}
          <div className="searchCondition">
            <p>检索条件</p>
            <RangePicker format="YYYY-MM-DD HH:mm" onChange={this.onChange.bind(this)}/>
            <div className="keyWords">
              关键字 ：
              <Input placeholder="关键字"/>
            </div>
            <Button type="primary" className="searchButton" onClick={this.onClick.bind(this)}>搜索</Button>
          </div>

          <div className="functionMenu">
            <p>功能菜单</p>
          </div>

        </Sider>
        {/* 右边内容栏 */}
        <Content>
          <CheckTable {...this.props}/>
        </Content>
      </Layout>

    </div>);
  }
}

export default connect(state => ({
  total: state.SignallingCheck.total,
  result: state.SignallingCheck.result,
  detail_result: state.SignallingCheck.detail_result,
  loading: state.SignallingCheck.table_status.loading,
  error: state.SignallingCheck.table_status.error,
  modalVisible: state.SignallingCheck.detail_status.modalVisible
}), dispatch => bindActionCreators(ActionCreators, dispatch))(SignallingCheck)
