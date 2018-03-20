import {createStore, compose, combineReducers , applyMiddleware} from 'redux';
import SignallingCheck from './views/SignallingAnalyse/SignallingCheck/SignallingCheckRedux'
import DevTools from './redux/middlewares/DevTools';
import createSagaMiddleware from 'redux-saga'
import sagas from './redux/middlewares/sagas'


// 整体的初始状态
// 就是把每个组件自己的初始状态组合起来, 注意key的名字和组件名一致
const initState = {
   SignallingCheck:SignallingCheck.initialState
};


// 定义reducer
// 每个组件自己的reducer负责维护自己的状态, 注意key的名字和组件名一致
const reducers = {
   SignallingCheck:SignallingCheck.reducer
};


// 组合最终的store
const createStoreWithMiddleware = compose(
  applyMiddleware(createSagaMiddleware(...sagas)),
  DevTools.instrument()
)(createStore);

const store = createStoreWithMiddleware(combineReducers(reducers), initState);

export default store;
