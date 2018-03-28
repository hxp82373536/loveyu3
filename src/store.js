import {createStore, compose, combineReducers , applyMiddleware} from 'redux';
import SignallingCheck from './views/SignallingAnalyse/SignallingCheck/SignallingCheckRedux'
import DevTools from './redux/middlewares/DevTools';
import createSagaMiddleware from 'redux-saga'
import RootSaga from './redux/middlewares/RootSaga'


// 定义reducer
// 每个组件自己的reducer负责维护自己的状态, 注意key的名字和组件名一致
const reducers = combineReducers({
   SignallingCheck:SignallingCheck.reducer
});

// 整体的初始状态
// 就是把每个组件自己的初始状态组合起来, 注意key的名字和组件名一致
const initState = {
   SignallingCheck:SignallingCheck.initialState
};


// 组合中间件   使用comose函数
const sagaMiddleware = createSagaMiddleware()
const middleware=compose(applyMiddleware(sagaMiddleware),DevTools.instrument())

//组合最终的store
const store = createStore(
  reducers,
  initState,
  middleware
);

sagaMiddleware.run(RootSaga)
export default store;
// export default store;
