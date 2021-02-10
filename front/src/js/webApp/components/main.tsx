import React, {useContext, useEffect} from "react";
import {Switch, Redirect} from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import {Container, Button} from "@material-ui/core";


import {AppContext} from "../contexts/AppContext";
import {login, logout} from "../actions/actions";
import {Header} from "./header";
import {Side} from "./side";
import {Performances} from "../containers/performances/performances";
import {Idea} from "../containers/idea/idea";
import {Manual} from "../containers/manual";
import {Contract} from "../containers/contract";
import {Profile} from "../containers/profile";
import {RouteWithSubRoutes} from "../../routings/routings";
import _ from "lodash";
import {Ttest} from "../containers/edit_home_page";
import {RoutesType} from "../../webPage/routings/routings";

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

}));

const MainBody = () => {
    return (
        <Container>
            main
            <Ttest />
        </Container>
    )
}

const routes: RoutesType[] = [
    {
        path: '/app/performance',
        component: Performances,
    },
    {
        path: '/app/idea',
        component: Idea,
    },
    {
        path: '/app/manual',
        component: Manual,
    },
    {
        path: '/app/contract',
        component: Contract,
    },
    {
        path: '/app/profile',
        component: Profile,
    },
    {
        path: '/app',
        component: MainBody,
    },
    {
        path: '*',
        component: () => <div>404</div>,
    },
];

export const Main = () => {
    const {state, dispatch} = useContext(AppContext)
    const classes = useStyles()

    useEffect(() =>{
        login({type: 'login'}, dispatch)
    }, [])

    return (
        <React.Fragment>
            {/*state.reducerFunc ? !state.reducerFunc.login ? <Redirect to="/app/login" /> : <></> : <></>*/}
            <Header />
            <div style={{display: 'flex'}}>
                <Side />
                <Switch>
                    {_.map(routes, (route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </React.Fragment>
    )
}