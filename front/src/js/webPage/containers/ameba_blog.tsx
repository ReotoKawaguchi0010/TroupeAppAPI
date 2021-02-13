import React, {useContext} from "react";
import { Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import _ from "lodash"

import {PageStoreContext} from "js/webPage/contexts/PageStoreContext";


const useStyles = makeStyles((theme: Theme) => createStyles({
    [theme.breakpoints.between('md', 'xl')]: {
        title: {},
        paper: {
            display:'inline-block',
            width:'33%',
            height: '500px',
            overflow: 'auto',
            wordWrap:'break-word',
        },
        ul: {
            listStyle: 'none',
            paddingInlineStart: '0',
        },
        link: {
            textDecoration: 'none',
            color: '#000000'
        }
    },
    [theme.breakpoints.between('sm', 'md')]: {
        title: {
        fontSize: '50px',
        },
        paper: {
            display:'inline-block',
            width:'70%',
            height: '500px',
            overflow: 'auto',
            wordWrap:'break-word',
        },
        ul: {
            listStyle: 'none',
            paddingInlineStart: '0',
            fontSize: '35px',
            '& h2': {
                color: 'red',
            },
        },
    },
}));

export default function AmeBlo() {
    const value = useContext(PageStoreContext)
    const classes = useStyles();
    return (
        <React.Fragment>
            <h2 className={classes.title}>Blog</h2>
            <Paper elevation={3} className={classes.paper}>
                <ul className={classes.ul}>
                    {value.state.http ? (
                        _.map(value.state.http.texts.blog, (value, key)=>{
                        return (<li key={key}><a href={value.link} target="_blank" rel="noopener norefferer" className={classes.link}>{value.title}</a><hr style={{color: '#f5f5f5'}} /></li>)
                    })
                    ) : ''}
                </ul>
            </Paper>
        </React.Fragment>
    )
}