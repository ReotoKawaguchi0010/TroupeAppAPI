import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import _ from "lodash";

import {webPage} from "../webPage";
import {webApp} from "../webApp";
import {RoutesType} from "../webPage/routings/routings";

const routes: RoutesType[] = [
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
        component: () => <div>not found</div>,
    },
]

export const RouteWithSubRoutes: React.FC<RoutesType> = (route: any) => {
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