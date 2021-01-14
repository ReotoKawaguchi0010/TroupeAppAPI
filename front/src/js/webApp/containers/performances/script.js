import React, {useState, useContext} from "react";
import {useParams} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import {Input, Box, Button} from "@material-ui/core";
import _ from "lodash";

import {uploadFileAction} from "../../actions/performance_action";
import {AppContext} from "../../contexts/AppContext";

const useStyles = makeStyles((theme) => ({
    upload: {
        position: 'absolute',
        opacity: 0,
    },
}));



const UploadScript = () => {
    const [sendState, setSendState] = useState({
        sendData: '',
    })
    const {state, dispatch} = useContext(AppContext)
    const classes = useStyles()


    const handleUpload = e => {
        let file = e.target.files.item(0)
        _.map(file, (v) => {
            console.log(v)
        })
        setSendState({...sendState, sendData: file})

    }

    const handleSendClick = () => {
        uploadFileAction({type: 'upload_script', sendData: sendState.sendData}, dispatch)
    }
    return (
        <>
            <Button>
                アップロード
                <Input type="file" className={classes.upload} onChange={handleUpload} />
            </Button>
            <Button onClick={handleSendClick}>send</Button>
        </>
    )
}




export const Script = () => {
    const { performance_id } = useParams()

    return (
        <>
            <div>staff</div>
            <UploadScript />
        </>
    )
}