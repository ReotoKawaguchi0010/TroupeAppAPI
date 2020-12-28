import {create} from "../../utils/utils";

export const GET_ROOT_PATH = 'GET_ROOT_PATH';

export const SEND_MAIL = 'SEND_MAIL';

export const getRootPath = async (action, dispatch) =>{
    try {
        const res = await create.get(`/`)
        action.data = res.data
        dispatch(action)
    }catch (e) {
       console.log(e)
    }
}

export const sendContactMail = async (action, dispatch) => {
    try {
        const res = await create.post('/mail', action.sendData)
        action.data = res.data
        dispatch(action)
    }catch (e){
        console.log(e)
    }
}

