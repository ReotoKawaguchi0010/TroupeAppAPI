import React from "react";
import {Switch, useRouteMatch} from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Box} from "@material-ui/core";
import _ from "lodash";

import {RouteWithSubRoutes} from "../../../routings/routings";
import {Performance} from "./performance";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
        paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const data = [
    {
        title: '快楽と健康',
        date: '2019年4月',
    },
    {
        title: '海辺の墓場までハイキング',
        date: '2020年1月',
    },
]

const Main = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {
                    _.map(data, (v, i) => {
                        return (
                        <Grid item xs={3} key={i}>
                            <Paper>
                                <Box>{v.title}</Box>
                                <Box>{v.date}</Box>
                            </Paper>
                        </Grid>)
                    })
                }
            </Grid>
        </div>
    )
}


export const Performances = () => {
    const {url, path} = useRouteMatch()

    const routes = [
        {
            path: `${path}/:title`,
            component: Performance,
        },
        {
            path: `${path}`,
            component: Main,
        },
    ];



    return (
        <>
            <Switch>
                {_.map(routes, (route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </>
    )
}