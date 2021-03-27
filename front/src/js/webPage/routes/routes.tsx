import React, {useState} from "react";
import {RouteWithSubRoutes} from "js/routes/routes";
import {Switch, useHistory, useLocation, } from "react-router-dom";
import {History} from "history";
import _ from "lodash"

import {Main} from "js/webPage/components/main";
import {Member} from "js/webPage/containers/member";
import {Ticket} from "js/webPage/containers/ticket";
import {Contact} from "js/webPage/containers/contact";
import {VideoTicket} from "js/webPage/containers/video_ticket";
import {Contents} from "js/webPage/containers/contents";

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
        path: '/content',
        component: VideoTicket,
    },
    {
        path: '/contents',
        component: Contents,
    },
    {
        path: '/',
        component: Main,
    },
]


interface ParamsSplit{
    () : {}
}


export const Routes = () => {
    const [historyState, setHistoryState] = useState("")
    const [paramsState, setParamsState] = useState({})
    const history = useHistory()
    history.listen(() => {
        if(historyState !== history.location.pathname) {
            setHistoryState(history.location.pathname)
            window.scroll(0, 0)
        }
    })

    console.log(useLocation().search)

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