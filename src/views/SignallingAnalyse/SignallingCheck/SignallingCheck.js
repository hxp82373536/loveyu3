import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CheckTable from './CheckTable'
import * as ActionCreators from './SignallingCheckRedux'

import { DatePicker,message,Input } from 'antd';
const { RangePicker } = DatePicker;
const Search = Input.Search;

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
let param={
  startTime:"",
  endTime:"",
  keyWord:""
}
class SignallingCheck extends React.PureComponent {
  componentDidMount() {
    this.props.loadSignalling(param);
    this.error();
  }

  error(){
    if(this.props.error)
    message.error('This is a message of error');
  }

  onOk11(datas,dateStrings){
    param.startTime = dateStrings[0];
    param.endTime = dateStrings[1];
  }

  onClick(value){
    param.keyWord=value;
    this.props.loadSignalling(param);
    this.error();
  }

  render() {
    return (
    <div>
      <RangePicker
        format="YYYY-MM-DD HH:mm"
        placeholder={['Start Time', 'End Time']}
        onChange={this.onOk11.bind(this)}
      />
      <Search
        placeholder="关键字"
        enterButton="检索"
        onSearch={this.onClick.bind(this)}
        style={{ width: 200 }}
      />
      <CheckTable {...this.props}/>
    </div>);
  }
}

export default connect(state => ({
  result: state.SignallingCheck.result,
  loading: state.SignallingCheck.table_status.loading,
  error: state.SignallingCheck.table_status.error,
  modalVisible:state.SignallingCheck.detail_status.modalVisible
}), dispatch => bindActionCreators(ActionCreators, dispatch))(SignallingCheck)
