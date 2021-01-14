import {create} from "../../utils/utils";
import {uploadFile} from "../../utils/utils";

export const performance_action = async (action, dispatch) => {
    try{
        let sendData = {}
        if(Boolean(action.sendData)) sendData = action.sendData
        sendData.type = action.type
        const res = await create.post(`/app/`, JSON.stringify(sendData))
        action.data = res.data
        dispatch(action)

    }catch (e) {
        console.log(e)
    }
}

export const uploadFileAction = async (action, dispatch) => {
    try{
        const file = action.sendData
        console.log(file)
        const params = new FormData()
        params.append('file', file)
        const res = await uploadFile.post(`/app/`, params)
        action.data = res.data
        dispatch(action)
    }catch (e) {

    }
}