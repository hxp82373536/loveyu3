import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CheckTable from './CheckTable'
import * as ActionCreators from './SignallingCheckRedux'

//es7修饰器写法  需要侵入creact-react-app
// @connect(
//   state => ({
//     signallingList: state.SignallingCheck.signallingList,
//   }),
//   dispatch => bindActionCreators(ActionCreators, dispatch)
//   // dispatch => ({
// 	// loadSignallings: bindActionCreators(ActionCreators, dispatch)
//   // })
// )

class SignallingCheck extends React.PureComponent {
  componentDidMount() {
     this.props.loadSignalling("");
     console.info(this.props);
  }

  render() {
    return (
      <div>
        <CheckTable {...this.props} />
      </div>
    );
  }
}

export default connect(
  state => ({
    signallingList: state.SignallingCheck.signallingList,
    loading:state.SignallingCheck.loading,
    error:state.SignallingCheck.error
  }),
  dispatch => bindActionCreators(ActionCreators, dispatch)
)(SignallingCheck)
