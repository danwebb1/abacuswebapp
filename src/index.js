import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./configureStore";
require('dotenv').config({path: '/'});

const store = configureStore();
ReactDOM.render(
<React.StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

