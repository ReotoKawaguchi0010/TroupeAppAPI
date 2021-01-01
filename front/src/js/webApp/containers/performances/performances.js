import React from "react";
import {Switch, useRouteMatch} from "react-router";
import {Link} from "react-router-dom";
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
    link: {
        color: "initial",
        textDecoration: 'none',
    }
}));

const data = [
    {
        id: 1,
        title: '快楽と健康',
    },
    {
        id: 2,
        title: '海辺の墓場までハイキング',
    },
]

const Main = () => {
    const classes = useStyles()
    const {url, path} = useRouteMatch()
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {
                    _.map(data, (v, i) => {
                        return (
                        <Grid item xs={3} key={i}>
                            <Paper>
                                <Box><Link to={`${path}/${v.id}`} className={classes.link}>{v.title}</Link></Box>
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