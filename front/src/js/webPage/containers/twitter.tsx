import React, {useContext} from "react";
import { Paper } from "@material-ui/core";
import _ from "lodash"
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";

import {PageStoreContext} from "js/webPage/contexts/PageStoreContext";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            [theme.breakpoints.between('xs', 'md')]: {
                fontSize: 50,
            }
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
                fontSize: 35,
            },
        },
        link: {
            textDecoration: 'none',
            color: '#000000'
        },
    })
);


export default function Twitter(){
    const value = useContext(PageStoreContext)

    const classes = useStyles();
    return (
        <React.Fragment>
            <h2 className={classes.title}>Twitter</h2>
            <Paper elevation={3} className={classes.paper}>
                <ul className={classes.ul}>
                    {(
                        _.map(value.state.http.texts.twitter, (value, key)=>{
                            return (
                                <li key={key}>
                                    <a href={value.urls} target="_blank" rel="noopener norefferer"
                                        className={classes.link}>{value.text}</a><hr style={{color: '#f5f5f5'}} />
                                </li>
                            )
                        })
                    )}
                </ul>
            </Paper>
        </React.Fragment>
    )
}

