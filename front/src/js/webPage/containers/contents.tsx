import React from "react";
import { Link } from "react-router-dom";
import {Switch, useRouteMatch} from "react-router";
import {Box, Button, List, ListItem} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


import {MenuIcon} from "js/webPage/components/menu";
import {Videos} from "js/webPage/containers/video";
import {RouteWithSubRoutes} from "js/routes/routes";
import {Footer} from "js/webPage/components/footer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            margin: '120px 0',
            padding: '0 7%',
        },
        title: {
            textAlign: 'center',
        },
        list: {
            '& li': {
                borderBottom: 'solid 1px #000000',
            },
            '& div': {
                textAlign: 'center',
            },
        },
        contentsLink: {
            textDecoration: 'none',
        },
    })
);



const Main = () => {
    const classes = useStyles()
    const {path} = useRouteMatch()
    return (
        <>
            <div className={classes.body}>
                <Box className={classes.title} component={'h3'}>Contents</Box>
                <List className={classes.list}>
                    <Link className={classes.contentsLink} to={`${path}/video`}>
                        <Button>
                            <ListItem>
                                <div>Video</div>
                            </ListItem>
                        </Button>
                    </Link>
                    <Link className={classes.contentsLink} to={`${path}/music`}>
                        <Button>
                            <ListItem>
                                <div>Music</div>
                            </ListItem>
                        </Button>
                    </Link>
                </List>
            </div>
        </>
    )
}




export const Contents = () => {
    const {path} = useRouteMatch()
    const routes = [
        {
            path: `${path}/video`,
            component: Videos,
        },
        {
            path: path,
            component: Main,
        }
    ];
    return (
        <>
            <MenuIcon />
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
            <Footer />
        </>
    )
}
