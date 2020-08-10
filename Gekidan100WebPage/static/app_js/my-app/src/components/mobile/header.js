import React from 'react';
import {ajax, toggle} from "../action";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import Icon from '../../img/100logo.png'

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <header>
                    <div className="logo"><Link to="/"><img src={Icon} alt="icon" /></Link></div>
                    <div>
                        <div className="select-line">
                            <Link to="/menu">
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                            </Link>
                        </div>

                    </div>
                </header>
            </div>
        )
    }
}

const mapStateToProps = state => ({ show: state.toggle.show, hide: state.toggle.hide })
const mapDispatchToProps = dispatch => ({
    ajax: () => dispatch(ajax()),
    toggle: () => dispatch(toggle())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)