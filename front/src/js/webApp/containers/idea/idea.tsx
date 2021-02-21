import React, {useEffect, useState, useContext} from "react";
import {Switch} from "react-router";
import {Redirect ,useRouteMatch} from "react-router-dom";
import {Grid, Paper, Box, Button, Modal, ButtonGroup, Fab, Drawer, ModalProps} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import _ from "lodash";

import {RouteWithSubRoutes} from "js/routings/routings";
import {IdeaCreate} from "js/webApp/containers/idea/create";
import {create} from "js/utils/utils";
import {AppContext} from "js/webApp/contexts/AppContext";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 10,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    modalBox: {
        textAlign: 'center',
        outline: 0,
    },
    modalPaper: {
        display: 'inline-block',
        padding: '35px',
        marginTop: '10px',
    },
    addBtnBlock: {
        textAlign: 'center',
    },
    title: {
        textAlign: 'center'
    },
    wrapContentTitle: {
        textAlign: 'center',
        margin: 0,
        padding: 10,
    },
    contentTitle: {
        color: '#000000',
        textDecoration: 'none',
        width: '100%',
        height: '100%',
    },
    contentButton: {
        width: '100%',
        display: 'block',
    },
    author: {
        textAlign: 'right',
        padding: 10,
    },
    ideaContentPaper: {
        background: 'none',
    },
}));


interface IdeaContentType {
    open: boolean
    onClose: () => void
    contentNum: number
}

const IdeaContent: React.FC<IdeaContentType> = ({open, onClose, contentNum}) => {
    const classes = useStyles()
    return (
        <Drawer anchor={'top'} open={open} ModalProps={{hideBackdrop: true, onClose: onClose}}>
            <div>test</div>
        </Drawer>
    )
}

const IdeaRoot = () => {
    const classes = useStyles()
    const {state, dispatch} = useContext(AppContext)
    let { path, url } = useRouteMatch();
    const [ideaState, setIdeaState] = useState({
        createModal: false,
        create: false,
    })
    const [dataState, setDataState] = useState({
        data: []
    })
    const [contentState, setContentState] = useState({
        open: false,
        contentNum: 0,
    })

    const handleAddBtnClick = () => {
        setIdeaState({...ideaState, createModal: true})
    }

    const handleClose = (e: any) => {
        return e.target.innerText === 'はい' ? setIdeaState({...ideaState, create: true, createModal: false}) : setIdeaState({...ideaState, createModal: false})
    }

    const contentClose = () => {
        setContentState({...contentState, open: false})
    }

    const contentBtnClick = (e: any) => {
        console.log(e)
        setContentState({...contentState, open: true})
    }

    useEffect(() => {
        create.get('/app/', {
            params: {
                type: 'idea',
                data: 'all'
            }
        }).then(resp => {
            let data = resp.data
            setDataState({...dataState, data: data})
        })
    }, [])
    return (
        <>
            <IdeaContent open={contentState.open} contentNum={contentState.contentNum} onClose={contentClose} />
            <div className={classes.root}>
                {ideaState.create ? <Redirect to={`${url}/create`} /> : <></>}
                <Modal open={ideaState.createModal}>
                    <Box className={classes.modalBox}>
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
                <Box component="h2" className={classes.title}>企画</Box>
                <div className={classes.addBtnBlock}>
                    <Fab onClick={handleAddBtnClick}>
                        <AddIcon />
                    </Fab>
                </div>
                <Grid container spacing={3}>
                    {_.map(dataState.data, (v: any, i: number) => {
                        return(
                        <Grid key={i} item xs={3}>
                            <Paper>
                                <Button className={classes.contentButton} onClick={contentBtnClick}>
                                    <Box component={'h3'} className={classes.wrapContentTitle}>
                                        {v.title}
                                    </Box>
                                    <Box className={classes.author}>作成者: {v.author}</Box>
                                    {
                                        _.map(v.contents, (content, n) => {
                                            return(
                                            <Box key={n}>
                                                {content.name}:{content.value}
                                            </Box>
                                            )
                                        })
                                    }
                                </Button>
                            </Paper>
                        </Grid>
                        )
                    })}
                </Grid>
            </div>
        </>
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