import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useParams} from "react-router";
import _ from "lodash";

import {webPage} from "js/webPage";
import {webApp} from "js/webApp";
import {RoutesType} from "js/webPage/routes/routes";


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


export const Routes = () => {
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