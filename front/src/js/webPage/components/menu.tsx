import React from "react";
import {createStyles, withStyles, makeStyles} from "@material-ui/core/styles";
import DehazeIcon from '@material-ui/icons/Dehaze';
import CloseIcon from '@material-ui/icons/Close';
import {Drawer, Button} from "@material-ui/core";
import {Link} from "react-router-dom";

import youtubeIcon from "images/icons/youtube_logo_official.png";
import instagramIcon from "images/icons/instagram_logo_official.png";
import twitterIcon from "images/icons/twitter_logo_official.png";
import logo from "images/futsu_logo.png";


const useStyles = makeStyles((theme) => createStyles({
    logo: {
        width: '4%',
        position: 'fixed',
        top: '30px',
        left: '2%',
        zIndex: 1,
        '& a': {
            width: '100%',
        },
        '& img': {
            width: '100%',
        },
    },
    menuIcon: {
        position: 'fixed',
        top: '30px',
        left: 'calc(100% - 100px)',
        zIndex: 1,
        [theme.breakpoints.between('xs', 'md')]: {
            left: 'calc(100% - 170px)',
        },
    },
    menuHeader: {
        display: 'flex',
        height: '150px',
        [theme.breakpoints.between('xs', 'md')]: {
            height: '300px',
        },
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
        [theme.breakpoints.between('xs', 'md')]: {
            height: '220px',
            fontSize: '50px',
        },
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
        cursor: 'pointer',
        [theme.breakpoints.between('xs', 'md')]: {
            fontSize: '150px',
        },
    },
    closeIconStyle:{
        fontSize: '70px',
        cursor: 'pointer',
        color: '#C14949',
        position: 'absolute',
        right: 30,
        top: 30,
        [theme.breakpoints.between('xs', 'md')]: {
            fontSize: '150px',
        },
        '& svg': {
            fontSize: 60,
        },
    },
    linkStyle:{
        justifyContent: 'center',
        color: '#ffffff',
        textDecoration: 'none',
        '& button': {
            color: '#ffffff',
            padding: 0,
        },
    },
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


export const MenuIcon = () => {
    const classes = useStyles()
    const [state, setState] = React.useState({
        anchor: false,
    });

    const handleClick = () =>{
        setState({anchor: true})
    }

    const drawerClose = () => {
        setState({anchor: false})
    }

    return (
        <>
            <div>
                <div className={classes.logo}>
                    <Link to="/">
                        <Button><img src={logo} alt="Logo" /></Button>
                    </Link>
                </div>
                <div className={classes.menuIcon}>
                    <Button>
                        <DehazeIcon className={classes.iconStyle}
                                    onClick={handleClick}/>
                    </Button>
                </div>
            </div>
            <StyledDrawer open={state.anchor} onClose={drawerClose} anchor={'right'}>
                <div className="menu">
                    <div className={classes.menuHeader}>
                        <div className={classes.menuLogo}>
                            <Link to="/" className={classes.linkStyle}>
                                <Button>
                                    <img className={classes.menuImage} src={logo} alt="Logo" />
                                </Button>
                            </Link>
                        </div>
                        <div className="menu-close-icon">
                            <Button className={classes.closeIconStyle}>
                                <CloseIcon onClick={drawerClose} />
                            </Button>
                        </div>
                    </div>
                    <div className={classes.menuContent}>
                        <Link to="/member" className={classes.linkStyle}>
                            <Button>Member</Button>
                        </Link>
                        <hr />
                    </div>
                    <div className={classes.menuContent}>
                        <Link to="/ticket" className={classes.linkStyle}>
                            <Button>Ticket</Button>
                        </Link>
                        <hr />
                    </div>
                    <div className={classes.menuContent}>
                        <Link to="/contact" className={classes.linkStyle}>
                            <Button>Contact</Button>
                        </Link>
                        <hr />
                    </div>
                    <div className={classes.menuContent}>
                        <Link to="/contents" className={classes.linkStyle}>
                            <Button>Contents</Button>
                        </Link>
                        <hr />
                    </div>
                    <div className={classes.menuFooter}>
                        <div className={classes.youtubeIco}>
                            <a href="https://www.youtube.com/channel/UC2avfYxoYQZxchEmVxypnrg"
                               target="_blank"
                               rel="noopener norefferer">
                                <Button>
                                    <img className={classes.img} src={youtubeIcon} alt={'youtubeIcon'} />
                                </Button>
                            </a>
                        </div>
                        <div className={classes.instagramIco}>
                            <a href="https://www.instagram.com/gekidan_futsu"
                               target="_blank"
                               rel="noopener norefferer">
                                <Button>
                                    <img className={classes.img} src={instagramIcon} alt={'instagramIcon'} />
                                </Button>
                            </a>
                        </div>
                        <div className={classes.twitterIco}>
                            <a href="https://twitter.com/100doooc" target="_blank" rel="noopener norefferer">
                                <Button>
                                    <img className={classes.img} src={twitterIcon} alt={'twitterIcon'} />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </StyledDrawer>
        </>
    )
}