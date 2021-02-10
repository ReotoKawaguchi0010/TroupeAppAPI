import React, {useState, useContext} from "react";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import {Input, TextField, Box, Button, Modal, Paper} from "@material-ui/core";
import _ from "lodash";

import {AppContext} from "../../contexts/AppContext";
import {idea} from "../../actions/actions";

const useStyles = makeStyles((theme) =>
    createStyles({
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
    }))
;

export const IdeaCreate = () => {
    const {state, dispatch} = useContext(AppContext)
    const [fieldState, setFieldState] = useState({
        content: [
            {name: 'タイトル', value: ''},
            {name: '作成者', value: ''},
        ],
        addButton: false,
    })
    const [contentState, setContentState] = useState({
        name: '',
    })

    const [sendState, setSendState] = useState<any>({sendData: {}})

    const classes = useStyles()

    const handleAddBtnClick = () => {
        setFieldState({...fieldState, addButton: true})
    }

    const handleCloseContent = (e: any) => {
        let content = fieldState.content
        if(e.target.innerText === '作成'){
            content.push({name: contentState.name, value: ''})
        }
        setFieldState({...fieldState, addButton: false, content: content})
    }

    const handleChangeContent = (e: any) => {
        setContentState({...contentState, name: e.target.value})
    }

    const handleChangeContentInput = (e: any) => {
        let data = {
            name: decodeURI(e.target.name),
            value: e.target.value,
        }
        let sendData = sendState.sendData
        let id = e.target.id
        sendData[id] = data
        setSendState({...sendState, sendData: sendData})
    }

    const handleClickSendBtn = (e: any) => {
        if(Object.keys(sendState.sendData).length < fieldState.content.length){
            alert('未入力の項目があります。')
        }else{
            idea({type: 'idea', sendData: sendState.sendData}, dispatch)
        }
    }

    return (
        <>
            <Modal open={fieldState.addButton} className={classes.modal}>
                <Paper className={classes.wrapCreateContent}>
                    <Box>項目の名前</Box>
                    <Box><Input onChange={handleChangeContent} /></Box>
                    <Box>
                        <Button onClick={handleCloseContent}>キャンセル</Button>
                        <Button onClick={handleCloseContent}>作成</Button>
                    </Box>
                </Paper>
            </Modal>
            <Box>
                <Button onClick={handleAddBtnClick}>項目を追加</Button>
                <Button>項目を削除</Button>
            </Box>
            <form className={classes.form}>
                {
                    _.map(fieldState.content, (v, i) => {
                        return (
                            <Box key={i}>
                                <Box>{v.name}</Box>
                                <Box><TextField className={classes.wrapInput} multiline
                                                onChange={handleChangeContentInput}
                                                name={encodeURI(v.name)}
                                                id={`content${i}`}
                                /></Box>
                            </Box>
                        )
                    })
                }
                <Button onClick={handleClickSendBtn}>作成</Button>
            </form>
        </>
    )
}