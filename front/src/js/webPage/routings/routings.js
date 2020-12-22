import React from "react";
import { Route } from "react-router-dom";

import Main from "../components/main";
import Member from "../containers/member";
import Ticket from "../containers/ticket";
import Contact from "../containers/contact";
import ScrollToTop from "../../routings/scroll";

import "../../../css/style.scss"


export default class Routings extends React.Component{
    componentDidMount() {
        window.screenTop
    }

    render(){
        return (
            <React.Fragment>
                <ScrollToTop />
                <Route exact path='/' component={Main} />
                <Route exact path='/member' component={Member} />
                <Route exact path='/ticket' component={Ticket} />
                <Route exact path='/contact' component={Contact} />
            </React.Fragment>
        )
    }
}