import React, {useContext} from "react";
import { Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import _ from "lodash"

import {PageStoreContext} from "js/webPage/contexts/PageStoreContext";


const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        [theme.breakpoints.between('xs', 'md')]: {
            fontSize: 50,
        },
    },
    paper: {
        display:'inline-block',
        width:'33%',
        height: 500,
        overflow: 'auto',
        wordWrap:'break-word',
        [theme.breakpoints.between('xs', 'md')]: {
            width:'70%',
            height: 700,
        },
    },
    ul: {
        listStyle: 'none',
        paddingInlineStart: '0',
        [theme.breakpoints.between('xs', 'md')]: {
            listStyle: 'none',
            paddingInlineStart: '0',
            fontSize: '35px',
            '& h2': {
                color: 'red',
            },
        },
    },
    link: {
        textDecoration: 'none',
        color: '#000000'
    },
}));

export default function AmeBlo() {
    const value = useContext(PageStoreContext)
    const classes = useStyles();
    console.log(value.state)
    return (
        <React.Fragment>
            <h2 className={classes.title}>Blog</h2>
            <Paper elevation={3} className={classes.paper}>
                <ul className={classes.ul}>
                    {
                        _.map(value.state.http.texts.blog, (value, key)=>{
                        return (
                                <li key={key}>
                                    <a href={value.link} target="_blank" rel="noopener norefferer" className={classes.link}>
                                        {value.title}
                                    </a>
                                    <hr style={{color: '#f5f5f5'}} />
                                </li>
                            )
                        })
                    }
                </ul>
            </Paper>
        </React.Fragment>
    )
}