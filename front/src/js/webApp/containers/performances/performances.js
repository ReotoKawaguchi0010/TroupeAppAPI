import React, {useState, useContext, useEffect} from "react";
import {Switch, useRouteMatch} from "react-router";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper, Box, Container, Button, Input, Modal} from "@material-ui/core";
import _ from "lodash";

import {RouteWithSubRoutes} from "../../../routings/routings";
import {Performance} from "./performance";
import {performance_action, getPerformances} from "../../actions/performance_action";
import {AppContext} from "../../contexts/AppContext";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    categoryTitle: {
        fontSize: 19,
        fontWeight: 'bolder',
    },
    paperRoot: {
        height: 100,
    },
    paperInBox: {
        height: 'calc(100% - 24px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bolder',
    },
    dateBox: {
        height: 24,
        textAlign: 'right',
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
}));

const CreatePerformance = ({open, onClose}) => {
    useEffect(() => {
        open ? setOpenState({...openState, open: true}) : setOpenState({...openState, open: false})
    }, [open])

    const {state, dispatch} = useContext(AppContext)
    const [openState, setOpenState] = useState({open: false})
    const [sendState, setSendState] = useState({title: ''})

    const classes = useStyles()

    const handleCreate = e => {
        if(sendState.title !== ''){
            performance_action({type: 'crete_performance', sendData: {title: sendState.title}}, dispatch)
            onClose()
        } else alert('タイトルを記入してください')
    }

    const handleInputChange = e => {
        setSendState({...sendState, title: e.target.value})
    }

    return(
        <Modal open={openState.open} className={classes.modal} onClose={onClose}>
            <Paper className={classes.wrapCreateContent}>
                <Box component='h2'>新しい公演</Box>
                <Box>タイトル</Box>
                <Box><Input name="title" onChange={handleInputChange} /></Box>
                <Box>
                    <Button onClick={onClose}>キャンセル</Button>
                    <Button onClick={handleCreate}>作成</Button>
                </Box>
            </Paper>
        </Modal>
    )
}

const Main = () => {
    const {state, dispatch} = useContext(AppContext)
    const classes = useStyles()
    const {url, path} = useRouteMatch()

    useEffect(() => {
        getPerformances({type: 'get_performance', data: 'all'}, dispatch)
    }, [])

    const [openState, setOpenState] = useState(false)
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
                <Button onClick={handleCreateClick}>公演を始める</Button>
            </Box>
            <Box className={classes.categoryTitle}>過去の公演</Box>
            <Grid container spacing={3}>
                {
                    _.map(state.reducerPerformance.performances, (v, i) => {
                        return (
                        <Grid item xs={3} key={i}>
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