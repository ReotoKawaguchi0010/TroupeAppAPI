import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import webPage from "../webPage/index";
import webApp from "../webApp/index";


export default class Routing extends React.Component{
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={webPage} />
                    <Route exact path='/member' component={webPage} />
                    <Route exact path='/ticket' component={webPage} />
                    <Route exact path='/contact' component={webPage} />
                    <Route exact path='/auth' component={webApp} />
                    <Route exact path='/auth/:page' component={webApp} />
                </Switch>
            </Router>
        )
    }
}