import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CheckTable from './CheckTable'
import * as ActionCreators from './SignallingCheckRedux'

import DatePicker11 from './DataPicker';
import { Button,DatePicker } from 'antd';
const { RangePicker } = DatePicker;

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
let startTime,endTime,keyWord
class SignallingCheck extends React.PureComponent {
  componentDidMount() {
    this.props.loadSignalling("");
    console.info(this.props);
  }

  onOk11(datas,dateStrings){
    console.info("onchange111111");
    console.info(datas,dateStrings);
    startTime = dateStrings[0];
    endTime = dateStrings[1];
    // console.info(startTime,endTime);
  }

  onClick(){
    console.info(startTime,endTime,keyWord);
    let param={
      startTime:startTime,
      endTime:endTime,
      keyWord:keyWord
    }
    this.props.loadSignalling(param);
  }

  render() {
    return (<div>
      <Button onClick={this.onClick.bind(this)}/>
      <RangePicker
        format="YYYY-MM-DD HH:mm"
        placeholder={['Start Time', 'End Time']}
        onChange={this.onOk11.bind(this)}
      />
      <CheckTable {...this.props}/>
    </div>);
  }
}

export default connect(state => ({
  result: state.SignallingCheck.result,
  loading: state.SignallingCheck.status.loading,
  error: state.SignallingCheck.status.error,
}), dispatch => bindActionCreators(ActionCreators, dispatch))(SignallingCheck)
