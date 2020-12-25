import axios from "axios";

import { API_PATH } from "../configs/config";

export const GET_ROOT_PATH = 'GET_ROOT_PATH';

export const create = axios.create({
    baseURL: API_PATH,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    responseType: 'json',
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true,
});

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

