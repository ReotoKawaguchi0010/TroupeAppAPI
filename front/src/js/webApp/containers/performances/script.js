import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import {Input, Box, Button} from "@material-ui/core";
import _ from "lodash";

import {uploadFileAction} from "../../actions/performance_action";
import {AppContext} from "../../contexts/AppContext";
import {getPerformances} from "../../actions/performance_action";

const useStyles = makeStyles((theme) => ({
    upload: {
        position: 'absolute',
        opacity: 0,
    },
}));



const UploadScript = () => {
    const [sendState, setSendState] = useState({
        sendData: '',
        filename: '',
    })
    const {state, dispatch} = useContext(AppContext)
    const classes = useStyles()

    const handleUpload = e => {
        let file = e.target.files.item(0)
        Boolean(file)? setSendState({...sendState, sendData: file, filename: file.name}) : ''

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
            <span>{sendState.filename}</span>
            <Button onClick={handleSendClick}>send</Button>
        </>
    )
}




export const Script = () => {
    const { performance_id } = useParams()
    const {state, dispatch} = useContext(AppContext)

    useEffect(() => {
        if(!state.reducerPerformance.performances.length){
            getPerformances({type: 'get_performance', data: 'all'}, dispatch)
        }
    }, [])
    return (
        <>
            {_.map(state.reducerPerformance.performances, (v, i) => {
                return Number(v.id) === Number(performance_id) ? (<div key={i}>{state.reducerPerformance.performances[i].title}</div>) : ''
            })}
            <div>台本</div>
            <UploadScript />
        </>
    )
}