import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DehazeIcon from '@material-ui/icons/Dehaze';
import CloseIcon from '@material-ui/icons/Close';
import {Drawer} from "@material-ui/core";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import youtubeIcon from "images/icons/youtube_logo_official.png";
import instagramIcon from "images/icons/instagram_logo_official.png";
import twitterIcon from "images/icons/twitter_logo_official.png";
import logo from "images/futsu_logo.png"

const pcStyles = {
    headImg: {
        width: "15%",
        height: 'auto',
    },
    logo: {
        position: 'fixed',
        top: '30px',
        left: '2%',
        zIndex: '1',
    },
    menuIcon: {
        position: 'fixed',
        top: '30px',
        left: 'calc(100% - 100px)',
        zIndex: '1',
    },
    menuHeader: {
        display: 'flex',
        height: '150px',
    },
    menuLogo: {
        width: '100%',
        textAlign: 'center',
        color: '#ffffff',
        position: 'absolute',
        top: '30px',
    },
    menuImage: {
        width: '15%',
    },
    menuContent: {
        textAlign: 'center',
        color: '#ffffff',
        height: '110px',
    },
    menuFooter: {
        display: 'flex',
        width: '100%',
    },
    youtubeIco:{
        width: '33%',
        textAlign: 'right',
    },
    instagramIco:{
        width: '33%',
        textAlign: 'center',
    },
    twitterIco:{
        width: '33%',
        textAlign: 'left',
    },
    img: {
        width: '70%',
    },
    iconStyle: {
        color: '#C14949',
        fontSize: '70px',
        cursor: 'pointer'
    },
    closeIconStyle:{
        fontSize: '70px',
        cursor: 'pointer',
        color: '#C14949',
        position: 'absolute',
        right: 30,
        top: 30,
    },
    linkStyle:{
        justifyContent: 'center',
        color: '#ffffff',
        textDecoration: 'none',
    },
}

const mobStyles = {
    headImg: {
        width: "25%",
        height: 'auto',
    },
    logo: {
        position: 'fixed',
        top: '30px',
        left: '2%',
        zIndex: '1',
    },
    menuIcon: {
        position: 'fixed',
        top: '30px',
        left: 'calc(100% - 170px)',
        zIndex: '1',
    },
    menuHeader: {
        display: 'flex',
        height: '300px',
    },
    menuLogo: {
        width: '100%',
        textAlign: 'center',
        color: '#ffffff',
        position: 'absolute',
        top: '30px',
    },
    menuImage: {
        width: '15%',
    },
    menuContent: {
        textAlign: 'center',
        color: '#ffffff',
        height: '220px',
        fontSize: '50px',
    },
    menuFooter: {
        display: 'flex',
        width: '100%',
    },
    youtubeIco:{
        width: '33%',
        textAlign: 'right',
    },
    instagramIco:{
        width: '33%',
        textAlign: 'center',
    },
    twitterIco:{
        width: '33%',
        textAlign: 'left',
    },
    img: {
        width: '70%',
    },
    iconStyle: {
        color: '#C14949',
        fontSize: '150px',
        cursor: 'pointer'
    },
    closeIconStyle:{
        fontSize: '150px',
        cursor: 'pointer',
        color: '#C14949',
        position: 'absolute',
        right: 30,
        top: 30,
    },
    linkStyle:{
        justifyContent: 'center',
        color: '#ffffff',
        textDecoration: 'none',
    },
}

const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: pcStyles,
    [theme.breakpoints.between('xs', 'md')]: mobStyles,
}));

const StyledDrawer = withStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: {
        paper: {
            width: 400,
            background: '#000000',
        },
    },
    [theme.breakpoints.between('sm', 'md')]: {
        paper: {
            width: '100%',
        },
    },
}))(Drawer)




function HeadIcon(){
    const [state, setState] = React.useState({
        anchor: false,
    });

    const handleClick = () =>{
        setState({anchor: true})
    }

    const drawerClose = () => {
        setState({anchor: false})
    }
    const mouseOver = (e: any) => {
        e.currentTarget.style.color = '#4c1c1c';
    }
    const mouseOut = (e: any) => {
        e.currentTarget.style.color = '#C14949';
    }

    const classes = useStyles()

    return (
        <React.Fragment>
            <div>
                <div className={classes.logo}><Link to="/"><img className={classes.headImg} src={logo} alt="Logo" /></Link></div>
                <div className={classes.menuIcon}>
                    <DehazeIcon className={classes.iconStyle} onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={handleClick}/>
                </div>
            </div>
            <StyledDrawer open={state.anchor} onClose={drawerClose} anchor={'right'}>
                <div className="menu">
                    <div className={classes.menuHeader}>
                        <div className={classes.menuLogo}><Link to="/" className={classes.linkStyle}><img className={classes.menuImage} src={logo} alt="Logo" /></Link></div>
                        <div className="menu-close-icon"><CloseIcon onClick={drawerClose} className={classes.closeIconStyle} /></div>
                    </div>
                    <div className={classes.menuContent}><Link to="/member" className={classes.linkStyle}>Member</Link><hr /></div>
                    <div className={classes.menuContent}><Link to="/ticket" className={classes.linkStyle}>Ticket</Link><hr /></div>
                    <div className={classes.menuContent}><Link to="/contact" className={classes.linkStyle}>Contact</Link><hr /></div>
                    <div className={classes.menuFooter}>
                        <div className={classes.youtubeIco}>
                            <a href="https://www.youtube.com/channel/UC2avfYxoYQZxchEmVxypnrg" target="_blank" rel="noopener norefferer">
                                <img className={classes.img} src={youtubeIcon} alt={'youtubeIcon'} />
                            </a>
                        </div>
                        <div className={classes.instagramIco}>
                            <a href="https://www.instagram.com/gekidan_futsu" target="_blank" rel="noopener norefferer">
                                <img className={classes.img} src={instagramIcon} alt={'instagramIcon'} />
                            </a>
                        </div>
                        <div className={classes.twitterIco}>
                            <a href="https://twitter.com/100doooc" target="_blank" rel="noopener norefferer">
                                <img className={classes.img} src={twitterIcon} alt={'twitterIcon'} />
                            </a>
                        </div>
                    </div>
                </div>
            </StyledDrawer>
        </React.Fragment>
    )
}

export const MenuIcon = () => {
    return (
        <React.Fragment>
           <HeadIcon />
        </React.Fragment>
    )
}