import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'antd/dist/antd.min.css';
import store from "./store/store";
import {Provider} from "react-redux";
import {makeServer} from './api/fake-backend';
import App from "./App";

makeServer();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
