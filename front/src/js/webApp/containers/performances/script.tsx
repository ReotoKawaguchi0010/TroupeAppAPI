import React, {useState, useContext, useEffect} from "react";
import {useParams} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import {Input, Button, Select, MenuItem, Drawer} from "@material-ui/core";
import _ from "lodash";

import {uploadFileAction} from "js/webApp/actions/performance_action";
import {AppContext} from "js/webApp/contexts/AppContext";
import {getScript} from "js/webApp/actions/performance_action";
import {create, AlertUI} from "js/utils/utils"

const useStyles = makeStyles(() => ({
    upload: {
        position: 'absolute',
        opacity: 0,
    },
    book: {
        height: '75%',
        width: '100%',
        overflow: 'auto',
    },
    pageNum: {
        textAlign: 'center',
    },
    scriptBox: {
        margin: '2% 15% 0px 15%',
        padding: 15,
        borderRadius: 15,
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
    const {dispatch} = useContext(AppContext)
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

const DeleteScript = () => {
    const { performance_id } = useParams<ParamsType>()
    const [versionState, setVersionState] = useState('1');
    const [alertState, setAlertState] = useState({
        open: false,
        text: '',
    })

    const handleClose = () => {
        setAlertState({...alertState, open: false})
    }

    const deleteScript = async () => {
        const confirmData = confirm('削除しますか？')
        if(confirmData){
            const res = await create.delete('/app/', {
                params: {
                    type: 'delete_script',
                    performance_id: performance_id,
                },
            })
            if (String(res.status).match(/200?/)) setAlertState({...alertState, open: true, text: '削除に成功しました'})
        }
        handleClose()
    }

    return (
        <>
            <div>
                <Button onClick={deleteScript}>delete</Button>
                <AlertUI open={alertState.open} text={alertState.text} onClose={handleClose} />
                <Select value={versionState} >
                    <MenuItem value={'1'}>1</MenuItem>
                </Select>
            </div>
        </>
    )
}

interface BoxInScriptType {
    open: boolean
    onClose: () => void
}

const BoxInScript: React.FC<BoxInScriptType> = ({open, onClose}) => {
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

    const handleLeftClick = () => {
        if(pageState.pageNum <= 0) return ''
        if(pageState.pageNum >= state.performanceReducer.scripts.totalPageNum) return ''
        let pageNum = pageState.pageNum + 1
        setPageState({...pageState, pageNum: pageNum})
    }

    const handleRightClick = () => {
        if(pageState.pageNum <= 1) return ''
        if(pageState.pageNum > state.performanceReducer.scripts.totalPageNum) return ''
        let pageNum = pageState.pageNum - 1
        setPageState({...pageState, pageNum: pageNum})
    }

    return (
        <Drawer anchor={'top'} open={open} ModalProps={{hideBackdrop: true, onClose: onClose}} classes={{paper: classes.scriptBox}}>
            <div className={classes.book} style={{writingMode: 'vertical-rl'}}>
                {
                    _.map(state.performanceReducer.scripts.scripts[pageState.pageNum-1], (script, i) => {
                        return (
                            <div key={i} style={{fontSize: Number(script.font_size)*1.5}}>
                                {script.text === '' ? <br /> : script.text}
                            </div>
                        )
                    })
                }
            </div>

            <div className={classes.pageNum}>
                <Button onClick={handleLeftClick}>{'<'}</Button>
                {pageState.pageNum}/{state.performanceReducer.scripts.totalPageNum}
                <Button onClick={handleRightClick}>{'>'}</Button>
            </div>
        </Drawer>
    )
}


export const Script = () => {
    const classes = useStyles()
    const {state} = useContext(AppContext)
    const [scriptOpenState, setScriptOpenState] = useState(false)

    const handleScriptOpen = () => {
        setScriptOpenState(true)
    }

    const scriptBoxClose = () => {
        setScriptOpenState(false)
    }

    return (
        <>
            <div>{state.performanceReducer.scripts.title}</div>
            <div>台本</div>
            <UploadScript />
            <DeleteScript />
            <BoxInScript
                open={scriptOpenState}
                onClose={scriptBoxClose}
            />
            <Button onClick={handleScriptOpen}>台本をみる</Button>
        </>
    )
}