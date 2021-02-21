import React, {useContext, useEffect} from "react";
import {Switch, Redirect} from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import clsx from "clsx";
import _ from "lodash";

import {AppContext} from "js/webApp/contexts/AppContext";
import {Header} from "js/webApp/components/header";
import {Performances} from "js/webApp/containers/performances/performances";
import {Idea} from "js/webApp/containers/idea/idea";
import {Manual} from "js/webApp/containers/manual";
import {Contract} from "js/webApp/containers/contract";
import {Profile} from "js/webApp/containers/profile";
import {RouteWithSubRoutes} from "js/routings/routings";
import {Ttest} from "js/webApp/containers/edit_home_page";
import {RoutesType} from "js/webPage/routings/routings";
import {config} from "js/configs/config";
import {create} from "js/utils/utils"

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    closeMenuMain: {
        width: '100%',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    openMenuMain: {
        marginLeft: 240,
        width: 'calc(100% - 240px)',
    },
    main: {
        marginTop: 64,
    },

}));

const MainBody = () => {
    return (
        <Container>
            main
            <Ttest />
        </Container>
    )
}

const routes: RoutesType[] = [
    {
        path: '/app/performance',
        component: Performances,
    },
    {
        path: '/app/idea',
        component: Idea,
    },
    {
        path: '/app/manual',
        component: Manual,
    },
    {
        path: '/app/contract',
        component: Contract,
    },
    {
        path: '/app/profile',
        component: Profile,
    },
    {
        path: '/app',
        component: MainBody,
    },
    {
        path: '*',
        component: () => <div>404</div>,
    },
];

export const Main = () => {
    const {state, dispatch} = useContext(AppContext)
    const classes = useStyles()


    const getUserData = async (type: string) => {
        const res = await create.get('/app/', {
            params: {type: type}
        })
        if(String(res.status).match(/200?/)) dispatch({type: type, data: res.data})
    }

    useEffect(() =>{
        getUserData('get_user_data')
    }, [])



    return (
        <React.Fragment>
            {
                config.devMode ? '' : state.reducerFunc ? !state.reducerFunc.login ? <Redirect to="/app/login" /> : <></> : <></>
            }
            <Header />
            <div className={clsx(classes.main, {
                [classes.openMenuMain]: state.viewReducer.sideMenu,
                [classes.closeMenuMain]: !state.viewReducer.sideMenu,
            })}>
                <Switch>
                    {_.map(routes, (route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </React.Fragment>
    )
}