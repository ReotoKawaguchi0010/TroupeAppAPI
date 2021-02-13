import React, {useEffect, useState} from "react";
import {Switch, useParams, useRouteMatch} from "react-router";
import {Link} from "react-router-dom";
import { Box, List, ListItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import _ from "lodash";

import {Cast} from "js/webApp/containers/performances/cast";
import {Staff} from "js/webApp/containers/performances/staff";
import {Schedule} from "js/webApp/containers/performances/schedule";
import {Script} from "js/webApp/containers/performances/script";
import {Budget} from "js/webApp/containers/performances/budget";
import {RouteWithSubRoutes} from "js/routings/routings";
import {create} from "js/utils/utils";

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

interface ParamsType {
    performance_id: any
}

const PerformanceRoot = () => {
    const classes = useStyles()
    const [performState, setPerformState] = useState({
        id: '',
        title: '',
    })
    const { performance_id } = useParams<ParamsType>()
    const {url, path} = useRouteMatch()

    useEffect(() => {
        create.get('/app/', {
            params: {
                type: 'performance',
                data: performance_id,
            }
        }).then(res => {
            setPerformState({...performState, title: res.data.title, id: res.data.id})
        })
    }, [])


    return (
        <>
            <Box component="h2" className={classes.title}>{performState.title}</Box>
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




