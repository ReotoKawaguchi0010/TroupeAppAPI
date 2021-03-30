import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { StyledBreadcrumbs } from "js/webPage/styles/style"
import instagramIcon from "images/icons/instagram_logo_official.png";
import twitterIcon from "images/icons/twitter_logo_official.png";
import youtubeIcon from "images/icons/youtube_logo_official.png";
import footerImage from "images/movie_theater_img.jpg"

const iconSize = {
    youtube: 40,
    instagram: 20,
    twitter: 40,
}


const useStyles = makeStyles((theme) => ({
    figure: {
        position: 'relative',
        bottom: 0,
        margin: 0,
    },
    footerImg: {
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        [theme.breakpoints.between('xs', 'md')]: {
            height: '44vh',
        },
    },
    icons: {
        display: 'flex',
        width: '100%',
        bottom:  'calc(-550px + 123px)',
        position: 'absolute',
        [theme.breakpoints.between('xs', 'md')]: {
            bottom: 'calc(-570px + 175px)',
        },
    },
    youtubeIco:{
        width: `${100-iconSize.instagram-iconSize.twitter}%`,
        textAlign: 'right',
    },
    instagramIco:{
        width: `${100-iconSize.youtube-iconSize.twitter}%`,
        textAlign: 'center',
    },
    twitterIco:{
        width: `${100-iconSize.youtube-iconSize.instagram}%`,
        textAlign: 'left',
    },
    footerLink: {
        position: 'absolute',
        bottom: 'calc(-550px + 77px)',
        width: '100%',
        color: '#ffffff',
        [theme.breakpoints.between('xs', 'md')]: {
            bottom: 'calc(-570px + 110px)',
        },
    },
    privacyPolicy: {
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        color: '#ffffff',
        bottom: 'calc(-550px + 32px)',
        [theme.breakpoints.between('xs', 'md')]: {
            bottom: 'calc(-570px + 50px)',
            fontSize: '25px',
        },
    },
    copyright: {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        color: '#ffffff',
        bottom: '-550px',
        [theme.breakpoints.between('xs', 'md')]: {
            bottom: '-570px',
            fontSize: '25px',
        },
    },
    link: {
        textDecoration: 'none',
        [theme.breakpoints.between('xs', 'md')]: {
            color: '#ffffff',
        },
    },
}));

export const Footer = () =>{
    const classes = useStyles();
    return (
        <footer>
            <figure className={classes.figure}>
                <img src={footerImage} alt={'footerImage'} className={classes.footerImg} />
                <div className={classes.icons}>
                    <div className={classes.youtubeIco}>
                        <a href="https://www.youtube.com/channel/UC2avfYxoYQZxchEmVxypnrg" target="_blank" rel="noopener norefferer">
                            <img src={youtubeIcon} alt={'youtubeIcon'} />
                        </a>
                    </div>
                    <div className={classes.instagramIco}>
                        <a href="https://www.instagram.com/gekidan_futsu" target="_blank" rel="noopener norefferer">
                            <img src={instagramIcon} alt={'instagramIcon'} />
                        </a>
                    </div>
                    <div className={classes.twitterIco}>
                        <a href="https://twitter.com/100doooc" target="_blank" rel="noopener norefferer">
                            <img src={twitterIcon} alt={'twitterIcon'} />
                        </a>
                    </div>
                </div>
                <div className={classes.footerLink}>
                    <StyledBreadcrumbs aria-label="breadcrumb" maxItems={3} separator="|">
                        <Link className={classes.link} to="/member">member</Link>
                        <Link className={classes.link} to="/ticket">ticket</Link>
                        <Link className={classes.link} to="/contact">contact</Link>
                    </StyledBreadcrumbs>
                </div>
                <div className={classes.privacyPolicy}>プライバシーポリシー</div>
                <div className={classes.copyright}>Copyright Futsu Theater Company</div>
            </figure>
        </footer>
    )
}