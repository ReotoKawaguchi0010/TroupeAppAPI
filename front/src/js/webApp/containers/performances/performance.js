import React from "react";
import {Switch, useParams, useRouteMatch} from "react-router";
import {Link} from "react-router-dom";
import { Box, Container, List, ListItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import _ from "lodash";

import {Cast} from "./cast";
import {Staff} from "./staff";
import {Schedule} from "./schedule";
import {Script} from "./script";
import {Budget} from "./budget";
import {RouteWithSubRoutes} from "../../../routings/routings";

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none',
        color: "initial",
        margin: '0 auto',
    },
}));

const data = [
    {
        id: 1,
        title: '快楽と健康',
        script: '',
    },
    {
        id: 2,
        title: '海辺の墓場までハイキング',
        script: '',
    },
]

const PerformanceRoot = () => {
    const classes = useStyles()
    const { performance_id } = useParams()
    const {url, path} = useRouteMatch()
    const performance_data = _.find(data, ['id', Number(performance_id)])

    return (
        <>
            <Box component="h2" className={classes.title}>{performance_data.title}</Box>
            <List>
                <ListItem button><Link to={`${url}/cast`} className={classes.link}>キャスト</Link></ListItem>
                <ListItem button><Link to={`${url}/staff`} className={classes.link}>スタッフ</Link></ListItem>
                <ListItem button><Link to={`${url}/script`} className={classes.link}>台本</Link></ListItem>
                <ListItem button><Link to={`${url}/schedule`} className={classes.link}>スケジュール</Link></ListItem>
                <ListItem button><Link to={`${url}/budget`} className={classes.link}>予算</Link></ListItem>
            </List>
        </>
    )
}




export const Performance = () => {
    const {url, path} = useRouteMatch()

    const routes = [
        {
            path: `${path}/cast`,
            component: Cast,
        },
        {
            path: `${path}/staff`,
            component: Staff,
        },
        {
            path: `${path}/schedule`,
            component: Schedule,
        },
        {
            path: `${path}/script`,
            component: Script,
        },
        {
            path: `${path}/budget`,
            component: Budget,
        },
        {
            path: `${path}`,
            component: PerformanceRoot,
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




