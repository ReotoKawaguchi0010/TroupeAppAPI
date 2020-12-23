import React from "react";
import {RouteWithSubRoutes} from "../../routings/routings";
import {Switch} from "react-router-dom";
import _ from "lodash"

import {Main} from "../components/main";
import {Member} from "../containers/member";
import {Ticket} from "../containers/ticket";
import {Contact} from "../containers/contact";
import ScrollToTop from "../../routings/scroll";

import "../../../css/style.scss"

const routes = [
    {
        path: '/member',
        component: Member,
    },
    {
        path: '/ticket',
        component: Ticket,
    },
    {
        path: '/contact',
        component: Contact,
    },
    {
        path: '/',
        component: Main,
    },
]

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