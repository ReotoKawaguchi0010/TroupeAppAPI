import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import _ from "lodash"

import webPage from "../webPage/index";
import webApp from "../webApp/index";

const routes = [
    {
        path: '/app',
        component: webApp,
    },
    {
        path: '/',
        component: webPage,
    },
    {
        path: '*',
        component: <div>not found</div>,
    },
]



export const RouteWithSubRoutes = (route) => {
    return (
        <Route
            path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    )
}


export const Routing = () => {
    return (
        <Router>
            <Switch>
                {_.map(routes, (route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </Router>
    )

}