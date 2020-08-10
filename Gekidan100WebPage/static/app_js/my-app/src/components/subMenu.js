import React from "react";
import {ajax, toggle} from "./action";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import twitter_logo_official from '../img/twitter_logo_official.png'
import youtube_logo_official from '../img/youtube_logo_official.png'
import instagram_logo_official from '../img/instagram_logo_official2.png'

class Sub extends React.Component {
    render() {
        const props = this.props
        console.log(youtube_logo_official)
        console.log(instagram_logo_official)
        return (
            <div className="menu-wrap">
                <div className="sub-wrap-menu">
                    <div className="cross-mark" onClick={props.history.goBack}>×</div>
                    <h3>Menu</h3>
                    <div><Link to='/overview'>Overview</Link></div>
                    <hr />
                    <div><Link to='/member'>Member</Link></div>
                    <hr />
                    <div><Link to='/schedule'>Schedule</Link></div>
                    <hr />
                    <div><Link to='/ticket'>Ticket</Link></div>
                    <hr />
                    <div><Link to='/contact'>Contact</Link></div>
                    <hr />
                    <div className="sub-icons">
                        <div><a href="https://www.youtube.com/channel/UC2avfYxoYQZxchEmVxypnrg" target="_blank" rel="noopener noreferrer">
                            <img src={youtube_logo_official} alt="youtube_logo_official" />
                        </a></div>
                        <div className="sub-icons-center"><a href="https://www.instagram.com/gekidan_futsu" target="_blank" rel="noopener noreferrer">
                            <img src={instagram_logo_official} alt="instagram_logo_official" />
                        </a></div>
                        <div><a href="https://twitter.com/100doooc" target="_blank" rel="noopener noreferrer">
                            <img src={twitter_logo_official} alt="twitter_logo_official" />
                        </a></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ show: state.toggle.show, hide: state.toggle.hide })
const mapDispatchToProps = dispatch => ({
    ajax: () => dispatch(ajax()),
    toggle: () => dispatch(toggle())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sub)