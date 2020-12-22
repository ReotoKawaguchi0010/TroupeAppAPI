import { createStore } from "redux";
import { Provider } from "react-redux"
import React from "react";

import Main from "./components/main";
import reducer from "./reducers"
import Routings from "./routings/routings";

//const store = createStore(reducer)

export default class webApp extends React.Component{
    componentDidMount() {
        document.title = '劇団沸管理App'
    }

    render(){
        return (
            <React.Fragment>
                <Routings />
                {/*<Provider>/!*<Provider store={store}>*!/*/}
                {/*    */}
                {/*</Provider>*/}
            </React.Fragment>
        )
    }
}