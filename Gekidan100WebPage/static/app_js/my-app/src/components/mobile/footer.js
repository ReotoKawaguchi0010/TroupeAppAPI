import React from 'react';
import TwitterIcon from '../../img/twitter_icon.png'
import InstaglamIcon from '../../img/instaglam_icon.png'
import YoutubeLogo from '../../img/youtube_icon.png'
import {Link} from "react-router-dom";


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
                    <div className="footer-menu">
                        <ul>
                            <li><b><Link to='/overview'>Overview</Link></b></li>
                            <li><b><Link to='/member'>Member</Link></b></li>
                            <li><b><Link to='/schedule'>Schedule</Link></b></li>
                            <li><b><Link to='/ticket'>Ticket</Link></b></li>
                            <li><b><Link to='/contact'>Contact</Link></b></li>
                        </ul>
                    </div>
                    <div className="privacy-policy">プライバシーポリシー</div>
                    <div className="line"></div>
                    <div className="copyright">Copyright Futsu Theater Company</div>
                </footer>
            </div>
        )
    }
}

export default Footer;