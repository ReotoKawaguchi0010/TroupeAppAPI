import React from "react";
import _ from "lodash";
import {Switch} from "react-router";

import { Main } from "../components/main";
import { Login } from "../containers/login";
import ScrollToTop from "../../routings/scroll";
import {RouteWithSubRoutes} from "../../routings/routings";

const routes = [
    {
        path: '/app/login',
        component: Login,
    },
    {
        path: '/app',
        component: Main,
    },
];


export const Routings = () => {
        return (
            <React.Fragment>
                <ScrollToTop />
                <Switch>
                    {_.map(routes, (route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </React.Fragment>
        )
}