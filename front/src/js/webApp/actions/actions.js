import {create} from "../../utils/utils";

export const login = async (action, dispatch) => {
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

export const logout = async (action, dispatch) => {
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

export const idea = async (action, dispatch) => {
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


export const send = () => {

}



