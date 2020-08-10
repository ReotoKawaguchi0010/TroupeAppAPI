import React from 'react';
import Header from "./header";
import Footer from "./footer";
import Main from "./main";
import { ajax, toggle } from "../action";
import { connect } from "react-redux";
import {Route} from "react-router-dom";
import Member from "../individuals/mobile/member";
import Contact from "../individuals/mobile/contact";
import Overview from "../individuals/mobile/overview";
import Schedule from "../individuals/mobile/schedule";
import Ticket from "../individuals/mobile/ticket";
import '../../css/mobile-area.css'

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

const mapStateToProps = state => ({ show: state.toggle.show, hide: state.toggle.hide })
const mapDispatchToProps = dispatch => ({
    ajax: () => dispatch(ajax()),
    toggle: () => dispatch(toggle())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainArea)