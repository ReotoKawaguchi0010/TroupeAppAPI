import React, {useState, useContext, useEffect} from "react";
import {Switch, useRouteMatch} from "react-router";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Box, Container, Button, Input, Modal, useMediaQuery, useTheme} from "@material-ui/core";
import _ from "lodash";

import {RouteWithSubRoutes} from "js/routings/routings";
import {Performance} from "js/webApp/containers/performances/performance";
import {performance_action, getPerformances} from "js/webApp/actions/performance_action";
import {AppContext} from "js/webApp/contexts/AppContext";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    categoryTitle: {
        fontSize: 19,
        fontWeight: 'bolder',
        [theme.breakpoints.between('xs', 'md')]: {
            fontSize: 35,
        },
    },
    paperRoot: {
        height: 100,
        [theme.breakpoints.between('xs', 'md')]: {
            height: 200,
            padding: 20,
        },
    },
    paperInBox: {
        height: 'calc(100% - 24px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bolder',
        [theme.breakpoints.between('xs', 'md')]: {
            fontSize: 35,
        },
    },
    dateBox: {
        height: 24,
        textAlign: 'right',
        [theme.breakpoints.between('xs', 'md')]: {
            fontSize: 25,
        },
    },
    link: {
        color: "initial",
        textDecoration: 'none',
    },
    wrapCreateContent: {
        width: '50%',
        display: 'inline-block',
        marginTop: 45,
    },
    modal: {
        textAlign: 'center'
    },
    titleBtn: {
        display: 'block',
        width: '100%',
    },
    beginBtn: {
        [theme.breakpoints.between('xs', 'md')]: {
            fontSize: 24,
            padding: '35px 8px'
        },
    },
}));

interface ArgsProps {
    open: any
    onClose: any
}



const CreatePerformance = (props: ArgsProps) => {
    useEffect(() => {
        props.open ? setOpenState({...openState, open: true}) : setOpenState({...openState, open: false})
    }, [props.open])

    const {state, dispatch} = useContext(AppContext)
    const [openState, setOpenState] = useState({open: false})
    const [sendState, setSendState] = useState({title: ''})

    const classes = useStyles()

    const handleCreate = (e: any) => {
        if(sendState.title !== ''){
            performance_action({type: 'crete_performance', sendData: {title: sendState.title}}, dispatch)
            props.onClose()
        } else alert('タイトルを記入してください')
    }

    const handleInputChange = (e: any) => {
        setSendState({...sendState, title: e.target.value})
    }

    return(
        <Modal open={openState.open} className={classes.modal} onClose={props.onClose}>
            <Paper className={classes.wrapCreateContent}>
                <Box component='h2'>新しい公演</Box>
                <Box>タイトル</Box>
                <Box><Input name="title" onChange={handleInputChange} /></Box>
                <Box>
                    <Button onClick={props.onClose}>キャンセル</Button>
                    <Button onClick={handleCreate}>作成</Button>
                </Box>
            </Paper>
        </Modal>
    )
}

const Main = () => {
    const {state, dispatch} = useContext(AppContext)
    const [openState, setOpenState] = useState(false)
    const classes = useStyles()
    const {url, path} = useRouteMatch()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'))
    const spacing = !matches ? 3 : 6

    useEffect(() => {
        getPerformances({type: 'get_performance', data: 'all'}, dispatch)
    }, [])

    const handleCreateClick = () => {
        setOpenState(true)
    }

     const handleClose = () => {
        setOpenState(false)
    }

    return (
        <div className={classes.root}>
            <CreatePerformance open={openState} onClose={handleClose} />
            <Box className={classes.categoryTitle}>現在進行中の公演</Box>
            <Box>
                <Button className={classes.beginBtn} onClick={handleCreateClick}>公演を始める</Button>
            </Box>
            <Box className={classes.categoryTitle}>過去の公演</Box>
            <Grid container spacing={spacing}>
                {
                    _.map(state.performanceReducer.performances, (v, i) => {
                        return (
                        <Grid item xs={spacing} key={i}>
                            <Button className={classes.titleBtn}>
                                <Link to={`${path}/${v.id}`} className={classes.link}>
                                    <Paper classes={{root: classes.paperRoot}}>
                                        <Box className={classes.paperInBox}>
                                            {v.title}
                                        </Box>
                                        <Box className={classes.dateBox}>公演予定日:{v.date}</Box>
                                    </Paper>
                                </Link>
                            </Button>
                        </Grid>)
                    })
                }
            </Grid>
        </div>
    )
}


export const Performances = () => {
    const {url, path} = useRouteMatch()

    const routes = [
        {
            path: `${path}/:performance_id`,
            component: Performance,
        },
        {
            path: `${path}`,
            component: Main,
        },
    ];

    return (
        <Container>
            <Switch>
                {_.map(routes, (route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </Container>
    )
}