import React, {useEffect, useState, useContext} from "react";
import {Switch} from "react-router";
import {useRouteMatch} from "react-router-dom";
import {Grid, Paper, Box, Button, Fab, Drawer, Input, TextField, IconButton} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core/styles";
import _ from "lodash";

import {RouteWithSubRoutes} from "js/routings/routings";
import {create} from "js/utils/utils";
import {AppContext} from "js/webApp/contexts/AppContext";
import {createIdea} from "js/webApp/actions/actions";
import {AlertUI} from "js/utils/utils";
import {GetIdea} from "js/types/json_types";
import {IdeaType} from "js/types/using_reducer_types";

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
    form: {
        textAlign: 'center',
        width: '100%',
        marginTop: 45,
    },
    wrapInput: {
        width: '35%',
    },
    modal: {
        textAlign: 'center',
    },
    wrapCreateContent: {
        width: '50%',
        display: 'inline-block',
        marginTop: 45,
        outline: 0,
    },
    readIdeaPaper: {
        margin: '2% 15% 0px 15%',
        padding: 15,
        borderRadius: 15,
    },
    createWrapCloseBtn: {
        textAlign: 'right'
    },
    readIdeaWrapTitle: {
        display: 'flex',
        margin: '0 auto'
    },
    readIdeaTitle: {
        padding: '12px 0',
        fontSize: 15,
        fontWeight: 'bold',
    },
}));


interface CreateContentType {
    open: boolean
    onClose: () => void
}

interface ReadContentType {
    open: boolean
    onClose: () => void
    contentNum: number
}


const CreateIdea: React.FC<CreateContentType> = ({open, onClose}) => {
    const {state, dispatch} = useContext(AppContext)
    const [itemsState, setItemsState] = useState({
        items: [
            {name: 'タイトル', value: ''},
        ],
    })
    const [itemInputState, setItemInputState] = useState('')
    const [sendState, setSendState] = useState<any>({
            author: state.userReducer.user.username,
            itemValues: [],
    })
    const [alertState, setAlertState] = useState({
        open: false,
        text: '',
    })
    const classes = useStyles()

    const creatItem = () => {
        let items = itemsState.items
        items.push({name: itemInputState, value: ''})
        setItemsState({...items, items: items})
        setItemInputState('')
    }

    const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemInputState(e.target.value)
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, itemNum: number) => {
        let data = {
            name: decodeURI(e.target.name),
            value: e.target.value,
        }
        let itemValues = sendState.itemValues
        itemValues[itemNum] = data
        setSendState({...sendState, itemValues: itemValues})
    }

    const handleClickSendBtn = () => {
        if(sendState.itemValues.length < itemsState.items.length){
            setAlertState({...alertState, open: true, text: '未入力の項目があります。',})
        }else{
            createIdea({type: 'idea', sendData: sendState}, dispatch)
        }
    }

    const alertOnClose = () => {
        setAlertState({...alertState, open: false})
    }

    return (
        <Drawer anchor={'top'}
                open={open}
                ModalProps={{hideBackdrop: true, onClose: onClose}}
                classes={{paper: classes.readIdeaPaper}}
        >
            <AlertUI open={alertState.open} onClose={alertOnClose} text={alertState.text} />
            <div>
                <Box className={classes.createWrapCloseBtn}><IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton></Box>
                <Box>項目の名前</Box>
                <Box><Input onChange={handleChangeItem} value={itemInputState} /></Box>
                <Box>
                    <Button onClick={creatItem}>項目を追加</Button>
                    <Button>項目を削除</Button>
                </Box>
                <form className={classes.form}>
                    {
                        _.map(itemsState.items, (v, i) => {
                            return (
                                <Box key={i}>
                                    <Box>{v.name}</Box>
                                    <Box>
                                        <TextField className={classes.wrapInput} multiline
                                                   onChange={event => handleContentChange(event, i)}
                                                   name={encodeURI(v.name)}
                                        />
                                    </Box>
                                </Box>
                            )
                        })
                    }
                    <Button onClick={handleClickSendBtn}>作成</Button>
                </form>
            </div>
        </Drawer>
    )
}




const ReadIdea: React.FC<ReadContentType> = ({open, onClose, contentNum}) => {
    const {state, dispatch} = useContext(AppContext)
    const classes = useStyles()

    const deleteIdea = async (idea: any, type: string) => {
        const res = await create.delete('/app/', {
            params: {
                type: type,
                title: idea.title,
                author: idea.author,
                username: state.userReducer.user.username,
            },
        })
        if(String(res.status).match(/200?/)) {
            let copyArray = [...state.performanceReducer.idea]
            copyArray = copyArray.filter(n => n !== contentNum)
            dispatch({type: type, data: copyArray})
        }
        onClose()
    }
    console.log(state)

    const deleteBtnClick = () => {
        const title = state.performanceReducer.idea[contentNum].title
        const isDelete = confirm(`${title}を削除しますか？`)
        if(isDelete) deleteIdea(state.performanceReducer.idea[contentNum], 'delete_idea')
    }


    return (
        <Drawer anchor={'top'} open={open} ModalProps={{hideBackdrop: true, onClose: onClose}} classes={{paper: classes.readIdeaPaper}}>
            <Box className={classes.createWrapCloseBtn}><IconButton onClick={onClose}>
                <CloseIcon />
            </IconButton></Box>
            <Box className={classes.readIdeaWrapTitle}>
                <Box className={classes.readIdeaTitle}>{state.performanceReducer.idea[contentNum].title}</Box>
                <Box>
                    <IconButton onClick={deleteBtnClick}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box>
                {_.map(state.performanceReducer.idea[contentNum].contents, (i, contents) => {
                    _.map(contents, (k, v) => {
                        return (
                            <Box key={i}>
                                <Box>{k}</Box>
                                <Box>{v}</Box>
                            </Box>
                        )
                    })
                })}
            </Box>
            <Box>{state.performanceReducer.idea[contentNum].author}</Box>
        </Drawer>
    )
}

const IdeaRoot = () => {
    const classes = useStyles()
    const {state, dispatch} = useContext(AppContext)
    const [createState, setCreateState] = useState(false)
    const [readState, setReadState] = useState({
        open: false,
        contentNum: 0,
    })

    const getALlIdea = async () => {
        let res = await create.get('/app/', {
            params: {
                type: 'idea',
                data: 'all',
            }
        })
        if(String(res.status).match(/200?/)){
            const jsonData: GetIdea[] = res.data
            dispatch({type: 'get_idea', data: jsonData})
        }
        return res.data
    }
    useEffect(() => {
        getALlIdea()
    }, [])

    const createContentOpen = () => {
        setCreateState(true)
    }
    const createContentClose = () => {
        setCreateState(false)
    }


    const readContentClose = () => {
        setReadState({...readState, open: false})
    }
    const readContentOpen = (contentNum: number) => {
        setReadState({...readState, open: true, contentNum: contentNum})
    }



    return (
        <>
            <CreateIdea open={createState} onClose={createContentClose} />
            <ReadIdea open={readState.open} contentNum={readState.contentNum} onClose={readContentClose} />
            <div className={classes.root}>
                <Box component="h2" className={classes.title}>企画</Box>
                <div className={classes.addBtnBlock}>
                    <Fab onClick={createContentOpen}>
                        <AddIcon />
                    </Fab>
                </div>
                <Grid container spacing={3}>
                    {
                        _.map(state.performanceReducer.idea, (v: IdeaType, i: number) => {
                            return v.initial === undefined ?  (
                                <Grid key={i} item xs={3}>(
                                    <Paper>
                                        <Button className={classes.contentButton} onClick={() => readContentOpen(i)}>
                                            <Box component={'h3'} className={classes.wrapContentTitle}>
                                                {v.title}
                                            </Box>
                                            <Box className={classes.author}>作成者: {v.author}</Box>
                                        </Button>
                                    </Paper>
                                </Grid>
                            ) : ''
                        })
                    }
                </Grid>
            </div>
        </>
    )
}

export const Idea = () => {
    let { url } = useRouteMatch();

    const routes = [
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