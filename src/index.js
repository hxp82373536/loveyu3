import "babel-polyfill"

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';

import App from './views/SignallingAnalyse/index'
import store from './store.js';
import registerServiceWorker from './registerServiceWorker';
import DevTools from './redux/middlewares/DevTools'

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';


ReactDOM.render(<Provider store={store}>
  <div>
    <LocaleProvider locale={zh_CN}><App /></LocaleProvider>
    <DevTools/>
  </div>
</Provider>, document.getElementById('root'));
registerServiceWorker();
