import React from 'react';
import { Link } from "react-router-dom";
import {DehazeOutlined} from "@material-ui/icons";
import CancelIcon from "@material-ui/icons/Cancel"
import {Popover, withStyles} from "@material-ui/core"

import Icon from '../../img/100logo.png'
import youtube_logo_official from "../../img/youtube_logo_official.png";
import instagram_logo_official from "../../img/instagram_logo_official2.png";
import twitter_logo_official from "../../img/twitter_logo_official.png";

let paperStyle = {
    'width': '100%',
    'height': '100%',
    'border-radius': '50px',
}

let rootStyle = {
}

const CustomPop = withStyles({
    paper: paperStyle,
    root: rootStyle
})(Popover)



class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
        }
    }

    handleClick = (e) => {
        this.setState({open: true, anchorEl: e.currentTarget,});
    }

    handleClose = () => {
        this.setState({open: false, anchorEl: null,});
    }
    render() {
        const {open, anchorEl} = this.state;
        return (
            <React.Fragment>
                <CustomPop open={open} anchorEl={anchorEl} style={{background: '#808080'}}>
                    <div className="sub-wrap-menu">
                        <div className="cross-mark" onClick={this.handleClose}><CancelIcon /></div>
                        <h3>Menu</h3>
                        <div className="menu-index"><Link to='/overview' onClick={this.handleClose}>Overview</Link><hr /></div>
                        <div className="menu-index"><Link to='/member' onClick={this.handleClose}>Member</Link><hr /></div>
                        <div className="menu-index"><Link to='/schedule' onClick={this.handleClose}>Schedule</Link><hr /></div>
                        <div className="menu-index"><Link to='/ticket' onClick={this.handleClose}>Ticket</Link><hr /></div>
                        <div className="menu-index"><Link to='/contact' onClick={this.handleClose}>Contact</Link><hr /></div>
                        <div className="sub-icons" style={{display: 'flex'}}>
                            <div><a href="https://www.youtube.com/channel/UC2avfYxoYQZxchEmVxypnrg" target="_blank" rel="noopener noreferrer">
                                <img src={youtube_logo_official} alt="youtube_logo_official" onClick={this.handleClose} />
                            </a></div>
                            <div className="sub-icons-center"><a href="https://www.instagram.com/gekidan_futsu" target="_blank" rel="noopener noreferrer">
                                <img src={instagram_logo_official} alt="instagram_logo_official" onClick={this.handleClose} />
                            </a></div>
                            <div><a href="https://twitter.com/100doooc" target="_blank" rel="noopener noreferrer">
                                <img src={twitter_logo_official} alt="twitter_logo_official" onClick={this.handleClose} />
                            </a></div>
                        </div>
                    </div>
                </CustomPop>
                <div className="header">
                    <header>
                        <div className="logo" style={{position: 'relative', textAlign: 'center'}}><Link to="/"><img src={Icon} alt="icon" /></Link>
                            <DehazeOutlined style={{color: '#E9ECEF', fontSize: 68, position: 'absolute', right: 0, top: 25}} onClick={this.handleClick} />
                        </div>
                    </header>
                </div>
            </React.Fragment>
        )
    }
}


export default Header