import React, {useContext, useEffect} from "react";
import {Switch, Redirect} from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import {Container} from "@material-ui/core";


import {AppContext} from "../contexts/AppContext";
import {login} from "../actions/actions";
import {Header} from "./header";
import {Side} from "./side";
import {Performances} from "../containers/performances/performances";
import {Idea} from "../containers/idea/idea";
import {RouteWithSubRoutes} from "../../routings/routings";
import _ from "lodash";

const MainBody = () => {
    return (
        <Container>main</Container>
    )
}

const routes = [
    {
        path: '/app/performance',
        component: Performances,
    },
    {
        path: '/app/idea',
        component: Idea,
    },
    {
        path: '/app',
        component: MainBody,
    },
];

export const Main = () => {
    const {state, dispatch} = useContext(AppContext)

    useEffect(() =>{
        login({type: 'login'}, dispatch)
    }, [])

    return (
        <React.Fragment>
            {state.reducerFunc ? !state.reducerFunc.login ? <Redirect to="/app/login" /> : <></> : <></>}
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