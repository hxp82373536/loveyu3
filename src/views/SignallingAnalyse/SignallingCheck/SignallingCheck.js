import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadSIGNALLING} from './SignallingCheckRedux'
import CheckTable from './table'

// const actions = {
//   loadSignalling,
//   loadSignallingSuccess,
//   loadSignallingError,
//   fetchSignalling
// };

@connect(
  state => ({
    signallingList: state.SignallingCheck.signallingList,
  }),
  dispatch => ({
    loadSignallings: bindActionCreators(loadSIGNALLING, dispatch)
  })
)
class SignallingCheck extends React.PureComponent {

// export default class SignallingCheck extends Component {
  render() {
    return (
      <div>
        <CheckTable {...this.props} />
      </div>
    );
  }
}

export default SignallingCheck;
