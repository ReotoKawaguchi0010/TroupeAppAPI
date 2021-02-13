import {create} from "js/utils/utils";

export interface Action {
    type: string
    data: object
}

interface SendDataType {
    type: string
    data: object
}

export const login = async (action: any, dispatch: any) => {
    try{
        let sendData: SendDataType = {type: '', data: {}}
        if(Boolean(action.sendData)) sendData = action.sendData
        sendData.type = action.type
        const res = await create.post(`/app/`, JSON.stringify(sendData))
        action.data = res.data
        dispatch(action)
    }catch (e) {
        console.log(e)
    }
}

export const logout = async (action: any, dispatch: any) => {
    try{
        let sendData: SendDataType = {type: '', data: {}}
        if(Boolean(action.sendData)) sendData = action.sendData
        sendData.type = action.type
        const res = await create.post(`/app/`, JSON.stringify(sendData))
        action.data = res.data
        dispatch(action)
    }catch (e) {
        console.log(e)
    }
}

export const idea = async (action: any, dispatch: any) => {
    try{
        let sendData: SendDataType = {type: '', data: {}}
        if(Boolean(action.sendData)) sendData = action.sendData
        sendData.type = action.type
        const res = await create.post(`/app/`, JSON.stringify(sendData))
        action.data = res.data
        dispatch(action)

    }catch (e) {
        console.log(e)
    }
}