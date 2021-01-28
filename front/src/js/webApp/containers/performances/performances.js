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
import {create} from "../../../utils/utils";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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

    console.log(state)
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
            <Button onClick={handleCreateClick}>公演を始める</Button>
            <Grid container spacing={3}>
                {
                    _.map(state.reducerPerformance.performances, (v, i) => {
                        return (
                        <Grid item xs={3} key={i}>
                            <Paper>
                                <Box><Link to={`${path}/${v.id}`} className={classes.link}>{v.title}</Link></Box>
                                <Box>{v.date}</Box>
                            </Paper>
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