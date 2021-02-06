import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import {Input, Box, Button} from "@material-ui/core";
import _ from "lodash";

import {uploadFileAction} from "../../actions/performance_action";
import {AppContext} from "../../contexts/AppContext";
import {getPerformances, getScript} from "../../actions/performance_action";

const useStyles = makeStyles((theme) => ({
    upload: {
        position: 'absolute',
        opacity: 0,
    },
    book: {
        height: '75%',
        width: '100%',
        overflow: 'auto',
        writingMode: 'vertical-rl',
    },
}));



const UploadScript = () => {
    const { performance_id } = useParams()
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
        uploadFileAction({type: 'upload_script', sendData: sendState.sendData, performanceID: performance_id}, dispatch)
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
    const classes = useStyles()
    const { performance_id } = useParams()
    const [pageState, setPageState] = useState({
        pageNum: 1,
    })
    const {state, dispatch} = useContext(AppContext)

    console.log(state)

    useEffect(() => {
        let action = {
            type: 'get_script',
            performanceId: Number(performance_id),
            scriptNum: pageState.pageNum,
        }
        getScript(action, dispatch)
    }, [pageState])

    const handleLeftClick = e => {
        if(pageState.pageNum <= 0) return ''
        if(pageState.pageNum >= state.reducerPerformance.scripts.total_page_num) return ''
        let pageNum = pageState.pageNum + 1
        setPageState({...pageState, pageNum: pageNum})
    }

    const handleRightClick = e => {
        if(pageState.pageNum <= 1) return ''
        if(pageState.pageNum > state.reducerPerformance.scripts.total_page_num) return ''
        let pageNum = pageState.pageNum - 1
        setPageState({...pageState, pageNum: pageNum})
    }

    return (
        <>
            <div>{state.reducerPerformance.scripts.title}</div>
            <div>台本</div>
            <UploadScript />
            <div className={classes.book}>
                {_.map(state.reducerPerformance.scripts.script, (v, i) => {
                    return <div key={i} style={{fontSize: Number(v.font_size)*1.5}}>{v.text === '' ? <br /> : v.text}</div>
                })}
            </div>
            <div>
                <div onClick={handleLeftClick}>{'<'}</div>
                {state.reducerPerformance.scripts.page_num}/{state.reducerPerformance.scripts.total_page_num}
                <div onClick={handleRightClick}>{'>'}</div>
            </div>
        </>
    )
}