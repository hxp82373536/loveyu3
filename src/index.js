import "babel-polyfill"

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';

import App from './views/SignallingAnalyse/index'
import store from './store.js';
import registerServiceWorker from './registerServiceWorker';
import DevTools from './redux/middlewares/DevTools'

ReactDOM.render(<Provider store={store}>
  <div>
    <App/>
    <DevTools/>
  </div>
</Provider>, document.getElementById('root'));
registerServiceWorker();
