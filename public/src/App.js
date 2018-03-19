import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
const TabPane = Tabs.TabPane;

const Main = () => <h2>Main</h2>
const Sandwiches = () => <h2>Sandwiches</h2>
const Tacos = ({ routes }) => (
  <div>
    <h2>Tacos</h2>

       <Link to="/tacos/bus"><div>社会新闻</div></Link>
       <Link to="/tacos/cart"><div>社会新闻1</div></Link>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))}
  </div>
)

const Bus = () => <h3>Bus</h3>
const Cart = () => <h3>Cart</h3>


const routes = [
  { path: '/sandwiches',
    component: Sandwiches
  },
  { path: '/tacos',
    component: Tacos,
    routes: [
      { path: '/tacos/bus',
        component: Bus
      },
      { path: '/tacos/cart',
        component: Cart
      }
    ]
  }
]

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    <route.component {...props} routes={route.routes}/>
  )}/>
)

const App = () => (
  <Router>
    <div style={{width:'100px',display: 'inline'}}>
        <Link to="/tacos" style={{width:'50px',paddingLeft:'50px'}}>Tacos</Link>
      <Link to="/sandwiches" style={{width:'50px',paddingLeft:'50px'}}>Sandwiches</Link>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </div>
  </Router>
)

export default App;
