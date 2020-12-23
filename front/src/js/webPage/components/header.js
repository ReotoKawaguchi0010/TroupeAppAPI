import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import mainGif from "../../../../images/main_gif.gif";
import {MenuIcon} from "./menu";

const pcStyles = {
    mainHeader: {
        height: 935,
    },
    figure: {
        margin: 0,
        position: 'relative',
    },
    img: {
        width: '100vw',
        height: '935px',
    },
    title: {
        position: 'absolute',
        top: '30%',
        width: '100%',
        color: '#ffffff',
    },
    jaTitle: {
        textAlign: 'center',
        fontSize: 105,
        lineHeight: '105px',
    },
    enTitle: {
        textAlign: 'center',
        fontSize: 26,
    },
}

const mobStyles = {
    mainHeader: {
        height: '',
    },
    figure: {
        margin: 0,
        position: 'relative',
    },
    img: {
        width: '100%',
    },
    title: {
        position: 'absolute',
        top: '30%',
        width: '100%',
        color: '#ffffff',
    },
    jaTitle: {
        textAlign: 'center',
        fontSize: 105,
        lineHeight: '105px',
    },
    enTitle: {
        textAlign: 'center',
        fontSize: 26,
    },
}


const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: pcStyles,
    [theme.breakpoints.between('xs', 'md')]: mobStyles,
}));

const HeaderFunc = () => {
    const classes = useStyles();
    return (
        <header className={classes.mainHeader}>
            <figure className={classes.figure}>
                <div><img src={mainGif} alt={"mainGif"} className={classes.img} /></div>
                <MenuIcon />
                <div className={classes.title}>
                    <div className={classes.jaTitle}>劇団沸</div>
                    <div className={classes.enTitle}>Futsu Theater Company</div>
                </div>
            </figure>
        </header>
    )
}


export const Header = () => {
    return (
        <React.Fragment>
            <HeaderFunc />
        </React.Fragment>
    )
}
