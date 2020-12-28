import React, {useContext} from "react";
import {Switch} from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import {Container} from "@material-ui/core";


import {AppContext} from "../contexts/AppContext";
import {login} from "../actions/actions";
import {Header} from "./header";
import {Side} from "./side";
import {Performance} from "../containers/performance";
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
        component: Performance,
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


    login({type: 'login'}, dispatch)




    return (
        <React.Fragment>
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