import React from "react";
import { Link } from "react-router-dom";
import {Switch, useRouteMatch} from "react-router";
import {Box, Button} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


import {MenuIcon} from "js/webPage/components/menu"
import {VideoTicket} from "js/webPage/containers/video_ticket";
import {RouteWithSubRoutes} from "js/routes/routes";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            margin: '120px 0',
            padding: '0 7%',
        },
    })
);



const Main = () => {
    const classes = useStyles()
    const {path} = useRouteMatch()
    return (
        <div className={classes.body}>
            <Box>Contents</Box>
            <div>
                <div><Link to={`${path}/video`}><Button>Video</Button></Link></div>
                <div><Link to={`${path}/music`}><Button>Music</Button></Link></div>
            </div>
        </div>
    )
}




export const Contents = () => {
    const {path} = useRouteMatch()
    const routes = [
        {
            path: `${path}/video`,
            component: VideoTicket,
        },
        {
            path: path,
            component: Main,
        }
    ];
    console.log(path)
    return (
        <>
            <MenuIcon />
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </>
    )
}
