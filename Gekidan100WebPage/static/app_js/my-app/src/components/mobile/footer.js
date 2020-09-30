import React from 'react';
import {Link} from "react-router-dom";
import {Breadcrumbs} from "@material-ui/core";

import TwitterIcon from '../../img/twitter_icon.png'
import InstaglamIcon from '../../img/instaglam_icon.png'
import YoutubeLogo from '../../img/youtube_icon.png'


class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <footer>
                    <div className="icons">
                        <div><a href="https://twitter.com/100doooc" target="_blank" rel="noopener noreferrer"><img src={TwitterIcon} alt="twitter_icon" /></a></div>
                        <div><a href="https://www.instagram.com/gekidan_futsu" target="_blank" rel="noopener noreferrer"><img src={InstaglamIcon} alt="insatglam_icon" /></a></div>
                        <div><a href="https://www.youtube.com/channel/UC2avfYxoYQZxchEmVxypnrg" target="_blank" rel="noopener noreferrer"><img src={YoutubeLogo} alt="youtube_icon" /></a></div>
                    </div>
                    <Breadcrumbs aria-label="breadcrumb" style={{color: '#dddddd', marginLeft: '7%'}}>
                        <Link to='/overview'>Overview</Link>
                        <Link to='/member'>Member</Link>
                        <Link to='/schedule'>Schedule</Link>
                        <Link to='/ticket'>Ticket</Link>
                        <Link to='/contact'>Contact</Link>
                    </Breadcrumbs>
                    <div className="privacy-policy">プライバシーポリシー</div>
                    <div className="line"></div>
                    <div className="copyright">Copyright Futsu Theater Company</div>
                </footer>
            </div>
        )
    }
}

export default Footer;