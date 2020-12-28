import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Input, TextField, Box, Button, Modal, Paper} from "@material-ui/core";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
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
    },
}));

export const IdeaCreate = () => {
    const [fieldState, setFieldState] = useState({
        content: [
            {name: 'タイトル'},
            {name: '作成者'},
        ],
        addButton: false,
    })
    const [contentState, setContentState] = useState({
        name: '',
    })

    const classes = useStyles()

    const handleAddBtnClick = () => {
        setFieldState({...fieldState, addButton: true})
    }

    const handleCloseContent = (e) => {
        let content = fieldState.content
        if(e.target.innerText === '作成'){
            content.push({name: contentState.name})
        }
        setFieldState({...fieldState, addButton: false, content: content})
    }

    const handleChangeContent = e => {
        setContentState({...contentState, name: e.target.value})
    }

    return (
        <>
            <Modal open={fieldState.addButton} className={classes.modal}>
                <Paper tabIndex={'none'} className={classes.wrapCreateContent}>
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
                                <Box><TextField className={classes.wrapInput} multiline /></Box>
                            </Box>
                        )
                    })
                }
                <Button>作成</Button>
            </form>
        </>
    )
}






