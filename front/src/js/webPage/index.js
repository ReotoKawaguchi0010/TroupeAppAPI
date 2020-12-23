import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux"
import React from "react";
import thunk from "redux-thunk";

import { Routings } from "./routings/routings";
import reducer from "./reducers"

const store = createStore(reducer, applyMiddleware(thunk))

export default class webPage extends React.Component{
    render(){
        return (
            <React.Fragment>
                <Provider store={store}>
                    <div className="web-page">
                        <Routings />
                    </div>
                </Provider>
            </React.Fragment>
        )
    }
}