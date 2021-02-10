import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
    [theme.breakpoints.between('sm', 'xl')]: {
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
    },
    [theme.breakpoints.between('xs', 'sm')]: {
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
    },
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