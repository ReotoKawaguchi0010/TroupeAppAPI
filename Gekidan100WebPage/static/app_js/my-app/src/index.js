import React from 'react';
import ReactDOM from 'react-dom';

import './css/bootatrap.min.css'
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from './components/reducers'
import Test from "./routings";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer)


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Test />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);