import React, {useState, useContext} from "react";
import {useParams} from "react-router";
import {IconButton, makeStyles, Drawer, TextField} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';

import {AppContext} from "js/webApp/contexts/AppContext";

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


const CreateBudget: React.FC = () => {
    const classes = useStyles()
    return (
        <>
            <div>この公演の予算</div>
            <div><TextField /></div>
            <div></div>
        </>
    )
}





const ExistBudget = () => {
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


    return (
        <>
            <SettingBudget open={createState.open} onClose={settingClose} />
            <div className={classes.settingIcon}>
                <IconButton onClick={settingOpen}><SettingsIcon /></IconButton>
            </div>
        </>
    )
}


interface ParamsType {
    performance_id: any
}

export const Budget = () => {
    const {state} = useContext(AppContext)
    const classes = useStyles()
    const { performance_id } = useParams<ParamsType>()

    return (
        <>
            <div>予算</div>
            <div>
                {state.performanceReducer.budget.fullBudget ? <ExistBudget /> : <CreateBudget />}
            </div>
        </>
    )
}