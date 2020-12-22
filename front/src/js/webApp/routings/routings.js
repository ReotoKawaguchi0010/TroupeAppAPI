import React from "react";

import Main from "../components/main";
import Login from "../containers/login";
import { Route } from "react-router-dom";
import ScrollToTop from "../../routings/scroll";


export default class Routings extends React.Component{

    render(){
        return (
            <React.Fragment>
                <ScrollToTop />
                <Route exact path='/auth' component={Login} />
                <Route exact path='/auth/top_page' component={Main} />
            </React.Fragment>
        )
    }
}