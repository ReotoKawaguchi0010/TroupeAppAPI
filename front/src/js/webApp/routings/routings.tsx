import React, {useContext, useEffect} from "react";
import _ from "lodash";
import {Switch} from "react-router";

import { Main } from "js/webApp/components/main";
import { Login } from "js/webApp/containers/login";
import {RouteWithSubRoutes} from "js/routings/routings";

const routes = [
    {
        path: '/app/login',
        component: Login,
    },
    {
        path: '/app',
        component: Main,
    },
    {
        path: '*',
        component: () => (<div>404</div>),
    },

];


export const Routings = () => {


    return (
        <React.Fragment>
            <Switch>
                {_.map(routes, (route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </React.Fragment>
    )
}