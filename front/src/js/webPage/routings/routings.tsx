import React, {useEffect, useState} from "react";
import {RouteWithSubRoutes} from "../../routings/routings";
import {Switch, useHistory} from "react-router-dom";
import _ from "lodash"

import {Main} from "../components/main";
import {Member} from "../containers/member";
import {Ticket} from "../containers/ticket";
import {Contact} from "../containers/contact";
import {scrollTop} from "../../utils/utils";

import "../../../css/style.scss"

export interface RouteType {
    path: string
    Component: React.FC
}

export interface RoutesType {
    path: string
    component: React.FC
    routes?: RouteType[]
}

const routes: RoutesType[] = [
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
    const [historyState, setHistoryState] = useState("")
    const history = useHistory()
    history.listen(() => {
        if(historyState !== history.location.pathname) {
            setHistoryState(history.location.pathname)
            window.scroll(0, 0)
        }
    })

    return (
        <>
            <Switch>
                {_.map(routes, (route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </>
    )
}