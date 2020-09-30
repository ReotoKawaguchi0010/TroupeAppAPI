import React from 'react';
import Header from "./header";
import Footer from "./footer";
import Main from "./main";
import {Route} from "react-router-dom";
import Member from "./individuals/member";
import Contact from "./individuals/contact";
import Overview from "./individuals/overview";
import Schedule from "./individuals/schedule";
import Ticket from "./individuals/ticket";
import '../../css/index.css'

class MainArea extends React.Component {
    render() {
        return (
            <React.Fragment>
            <div className="main-area">
                <Header />
                <Route exact path="/" component={Main} />
                <Route exact path="/overview" component={Overview} />
                <Route exact path="/member" component={Member} />
                <Route exact path="/schedule" component={Schedule} />
                <Route exact path="/ticket" component={Ticket} />
                <Route exact path="/contact" component={Contact} />
                <Footer />
            </div>
            </React.Fragment>
        )
    }
}


export default MainArea