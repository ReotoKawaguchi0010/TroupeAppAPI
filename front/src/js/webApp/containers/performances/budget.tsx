import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router";
import {
    IconButton, makeStyles, Drawer, TextField, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';

import {AppContext} from "js/webApp/contexts/AppContext";
import {create} from "js/utils/utils";

const useStyles = makeStyles(() => ({
    settingIcon: {
        textAlign: 'right',
    },
    createDrawer: {
        margin: '2% 15% 0px 15%',
        padding: 15,
        borderRadius: 15,
    },
}));

interface MyDrawerProps {
    open: boolean
    onClose: () => void
}


const SettingBudget: React.FC<MyDrawerProps> = ({open, onClose}) => {
    const classes = useStyles()
    return (
        <Drawer open={open} anchor={'top'}
                ModalProps={{hideBackdrop: true, onClose: onClose}}
                classes={{paper: classes.createDrawer}}>
            <div>
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </div>
            <div>目標金額の設定</div>
            <div><TextField /></div>
            <div>予算の作成</div>
        </Drawer>
    )
}


const CreateBudget: React.FC<MyDrawerProps> = ({open, onClose}) => {
    const classes = useStyles()
    const { performance_id } = useParams<ParamsType>()
    const [sendState, setSendState] = useState({
        fullBudget: '',
    })

    const postBudget = async () => {
        const sendData = {
            type: 'create_budget',
            performanceId: performance_id,
            fullBudget: sendState.fullBudget,
        }
        const res = await create.post('/app/', sendData)
        if(String(res.status).match(/200?/)) onClose()
    }

    return (
        <Drawer open={open} anchor={'top'}
                ModalProps={{hideBackdrop: true, onClose: onClose}}
                classes={{paper: classes.createDrawer}}>
            <div>
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </div>
            <div>この公演の予算</div>
            <div><TextField onChange={(e: any) => {setSendState({...sendState, fullBudget: e.target.value})}} /></div>
            <div><Button onClick={postBudget}>設定</Button></div>
        </Drawer>
    )
}



interface BudgetDataProps {
    data: any
}

const ExistBudget: React.FC<BudgetDataProps> = ({data}) => {
    const classes = useStyles()
    const [createState, setCreateState] = useState({
        open: false
    })

    const settingOpen = () => {
        setCreateState({...createState, open: true})
    }
    const settingClose = () => {
        setCreateState({...createState, open: false})
    }

    console.log(data)


    return (
        <>
            <SettingBudget open={createState.open} onClose={settingClose} />
            <div className={classes.settingIcon}>
                <IconButton onClick={settingOpen}><SettingsIcon /></IconButton>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>予算</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>目標予算</TableCell>
                            <TableCell>{data.fullBudget}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}


interface ParamsType {
    performance_id: any
}

export const Budget = () => {
    const { performance_id } = useParams<ParamsType>()
    const {state, dispatch} = useContext(AppContext)
    const [createState, setCreateState] = useState({
        open: true
    })

    const createOnClose = () => {
        setCreateState({...createState, open: false})
    }

    const getBudget = async () => {
        const res = await create.get('/app/', {
            params: {
                type: 'get_budget',
                performanceId: performance_id,
            }
        })
        let data = {
            fullBudget: res.data.full_budget
        }
        dispatch({type: 'get_budget', data: data})
    }

    useEffect(() => {
        getBudget()
    }, [])


    return (
        <>
            <div>予算</div>
            <div>
                {state.performanceReducer.budget.fullBudget ? <ExistBudget data={state.performanceReducer.budget} /> : <CreateBudget open={createState.open}
                                                                                              onClose={createOnClose}/>}
            </div>
        </>
    )
}