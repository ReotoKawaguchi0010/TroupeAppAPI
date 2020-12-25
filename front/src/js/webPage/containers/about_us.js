import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const pcStyles = (theme) => ({
    aboutUsTitle: {
        width: '33%',
        textAlign: 'right',
        margin: 0,
    },
    aboutUsContent: {
        width: 'calc(77% - 5px)',
        lineHeight: '1.5em',
        margin: 'auto 5px',
    },
})

const mobStyles = (theme) => ({
    aboutUsTitle: {
        margin: 0,
        width: '100%',
        textAlign: 'center',
        fontSize: '50px',
    },
    aboutUsContent: {
        width: '100%',
        lineHeight: '1.5em',
        margin: 'auto 5px',
        fontSize: '35px',
        wordWrap: 'break-word'
    },
})

const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('sm', 'xl')]: pcStyles(theme),
    [theme.breakpoints.between('xs', 'sm')]: mobStyles(theme),
}));


export default function AboutUs(){
    const classes = useStyles();

    const about_us = {
        data: {
            'title': 'About us',
            'content': '私たちは、2019年3月に結成、2019年8月に旗揚げ公演、2020年1月に第2回公演を終えました。',
        },
    }
    return (
        <React.Fragment>
            <h2 className={classes.aboutUsTitle}>{about_us.data.title}</h2>
            <div className={classes.aboutUsContent}>{about_us.data.content}</div>
        </React.Fragment>
    )
}