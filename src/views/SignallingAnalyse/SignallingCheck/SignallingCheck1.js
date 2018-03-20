import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadSIGNALLING} from './SignallingCheckRedux'
import {CheckTable} from './table'
//import {bindActionCreators} from 'redux';
// import TodoItem from './todoItem.js';
// import {toggleTodo, removeTodo} from '../actions.js';
// import {FilterTypes} from '../../constants.js';

@connect(
  state => ({
    signallingList: state.signallingList,
  }),
  dispatch => ({
    loadaAtions: bindActionCreators(loadSIGNALLING, dispatch)
  })
)
export default class SignallingCheck extends Component {
  render() {
    return (
      <div>
        <CheckTable {...this.props.signallingList} />
      </div>
    );
  }
}
