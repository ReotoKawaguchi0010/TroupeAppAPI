import React from 'react';
import ReactDOM from 'react-dom';
import thunk from "redux-thunk";
import './css/bootatrap.min.css'
import './css/memberpage.css'
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from './components/reducers'
import Routing from "./routings";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer, applyMiddleware(thunk))


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routing />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);