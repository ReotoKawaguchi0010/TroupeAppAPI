import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import {Input, Button} from "@material-ui/core";
import _ from "lodash";

import {uploadFileAction} from "js/webApp/actions/performance_action";
import {AppContext} from "js/webApp/contexts/AppContext";
import {getPerformances, getScript} from "js/webApp/actions/performance_action";

const useStyles = makeStyles((theme) => ({
    upload: {
        position: 'absolute',
        opacity: 0,
    },
    book: {
        height: '75%',
        width: '100%',
        overflow: 'auto',
    },
}));


interface ParamsType {
    performance_id: any
}

const UploadScript = () => {
    const { performance_id } = useParams<ParamsType>()
    const [sendState, setSendState] = useState({
        sendData: '',
        filename: '',
    })
    const {state, dispatch} = useContext(AppContext)
    const classes = useStyles()

    const handleUpload = (e: any) => {
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

interface BoxInScriptType {
    value: any
}

const BoxInScript: React.FC<BoxInScriptType> = ({value}) => {
    return (
        <>
            {
                _.map(value, (script, i) => {
                    return (
                        <div key={i} style={{fontSize: Number(script.font_size)*1.5}}>
                            {script.text === '' ? <br /> : script.text}
                        </div>
                    )
                })
            }
        </>
    )
}


export const Script = () => {
    const classes = useStyles()
    const { performance_id } = useParams<ParamsType>()
    const [pageState, setPageState] = useState({
        pageNum: 1,
    })
    const {state, dispatch} = useContext(AppContext)

    useEffect(() => {
        if(!Boolean(state.performanceReducer.scripts.scripts[pageState.pageNum-1])){
            let action = {
                type: 'get_script',
                performanceId: Number(performance_id),
                scriptNum: pageState.pageNum,
            }
            getScript(action, dispatch)
        }

    }, [pageState])

    const handleLeftClick = (e: any) => {
        if(pageState.pageNum <= 0) return ''
        if(pageState.pageNum >= state.performanceReducer.scripts.totalPageNum) return ''
        let pageNum = pageState.pageNum + 1
        setPageState({...pageState, pageNum: pageNum})
    }

    const handleRightClick = (e: any) => {
        if(pageState.pageNum <= 1) return ''
        if(pageState.pageNum > state.performanceReducer.scripts.totalPageNum) return ''
        let pageNum = pageState.pageNum - 1
        setPageState({...pageState, pageNum: pageNum})
    }

    return (
        <>
            <div>{state.performanceReducer.scripts.title}</div>
            <div>台本</div>
            <UploadScript />
            <div className={classes.book} style={{writingMode: 'vertical-rl'}}>
                <BoxInScript value={state.performanceReducer.scripts.scripts[pageState.pageNum-1]} />
            </div>
            <div>
                <div onClick={handleLeftClick}>{'<'}</div>
                {pageState.pageNum}/{state.performanceReducer.scripts.totalPageNum}
                <div onClick={handleRightClick}>{'>'}</div>
            </div>
        </>
    )
}