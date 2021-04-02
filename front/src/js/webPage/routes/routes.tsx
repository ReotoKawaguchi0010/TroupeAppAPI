import React, {useState} from "react";
import {RouteWithSubRoutes} from "js/routes/routes";
import {Switch, useHistory, useLocation, Redirect} from "react-router-dom";
import _ from "lodash"

import {Main} from "js/webPage/components/main";
import {Member} from "js/webPage/containers/member";
import {Ticket} from "js/webPage/containers/ticket";
import {Contact} from "js/webPage/containers/contact";
import {VideoTicket} from "js/webPage/containers/video_ticket";
import {Contents} from "js/webPage/containers/contents";
import {paramObj} from "js/utils/utils";
import {Loading} from "js/webPage/containers/loading";

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
        path: '/check',
        component: () => <Loading />,
    },
    {
        path: '/',
        component: Main,
    },
]


export const Routes = () => {
    const [historyState, setHistoryState] = useState("")
    const history = useHistory()
    history.listen(() => {
        if(historyState !== history.location.pathname) {
            setHistoryState(history.location.pathname)
            window.scroll(0, 0)
        }
    })

    const params = paramObj(useLocation().search)


    return (
        <>
            {
                params.PayerID !== undefined ? <Redirect to={'/check'} /> : (
                    <Switch>
                        {_.map(routes, (route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                )
            }
        </>
    )
}