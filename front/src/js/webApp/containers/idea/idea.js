import React, {useEffect, useState} from "react";
import {Switch} from "react-router";
import {Link, Redirect ,useRouteMatch} from "react-router-dom";
import {Grid, Paper, Box, Button, Modal, ButtonGroup, Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";

import {RouteWithSubRoutes} from "../../../routings/routings";
import _ from "lodash";
import {IdeaCreate} from "./create";
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
    modalBox: {
        textAlign: 'center',
    },
    modalPaper: {
        display: 'inline-block',
        padding: '35px',
        marginTop: '10px',
    },
}));

const data = [
    {
        title: 'title',
        author: 'author',
        link: 'title',
    },
]

const IdeaRoot = () => {
    let { path, url } = useRouteMatch();
    const [ideaState, setIdeaState] = useState({
        createModal: false,
        create: false,
    })

    const handleAddBtnClick = (e) => {
        setIdeaState({...ideaState, createModal: true})
    }

    const handleClose = (e) => {
        return e.target.innerText === 'はい' ? setIdeaState({...ideaState, create: true, createModal: false}) : setIdeaState({...ideaState, createModal: false})
    }

    useEffect(() => {
        create.get('/app/', {
            params: {
                type: 'idea',
                data: 'all'
            }
        }).then(resp => {
            console.log(resp)
        })
    }, [])
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {ideaState.create ? <Redirect to={`${url}/create`} /> : <></>}
            <Modal open={ideaState.createModal}>
                <Box tabIndex={'none'} className={classes.modalBox}>
                    <Paper className={classes.modalPaper}>
                        <Box>企画を提案しますか？</Box>
                        <Box>
                            <ButtonGroup disableElevation variant="contained" color="secondary">
                                <Button onClick={handleClose}>はい</Button>
                                <Button onClick={handleClose}>いいえ</Button>
                            </ButtonGroup>
                        </Box>
                    </Paper>
                </Box>
            </Modal>
            <Fab onClick={handleAddBtnClick}>
                <AddIcon />
            </Fab>
            <Grid container spacing={3}>
                {_.map(data, (v, i) => {
                    return(
                    <Grid key={i} item xs={3}>
                        <Paper>
                            <Box><Link to={`${url}/${v.link}`}>タイトル: {v.title}</Link></Box>
                            <Box>作成者: {v.author}</Box>
                        </Paper>
                    </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export const Idea = () => {
    let { path, url } = useRouteMatch();

    const routes = [
        {
            path: `${url}/create`,
            component: IdeaCreate,
        },
        {
            path: `${url}`,
            component: IdeaRoot,
        },
    ]
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