import React, {useContext} from "react";
import { Paper } from "@material-ui/core";
import _ from "lodash"
import {makeStyles} from "@material-ui/core/styles";

import {PageStoreContext} from "../contexts/PageStoreContext";

const pcStyles = (theme) => ({
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
})

const mobStyles = (theme) => ({
    title: {
        fontSize: 50,
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
    },
})


const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('sm', 'xl')]: pcStyles(theme),
    [theme.breakpoints.between('xs', 'sm')]: mobStyles(theme),
}));


export default function Twitter(){
    const value = useContext(PageStoreContext)

    const classes = useStyles();
    return (
        <React.Fragment>
            <h2 className={classes.title}>Twitter</h2>
            <Paper elevation={3} className={classes.paper}>
                <ul className={classes.ul}>
                    {value.state.http ? (
                        _.map(value.state.http.texts.twitter, (value, key)=>{
                            return (
                                <li key={key}>
                                    <a href={value.urls} target="_blank" rel="noopener norefferer"
                                        className={classes.link}>{value.text}</a><hr style={{color: '#f5f5f5'}} />
                                </li>
                            )
                        })
                    ) : ''}
                </ul>
            </Paper>
        </React.Fragment>
    )
}

