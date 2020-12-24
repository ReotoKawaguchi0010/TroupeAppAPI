import axios from "axios";

import { API_PATH } from "../configs/config";

export const GET_ROOT_PATH = 'GET_ROOT_PATH';

export const create = axios.create({
    baseURL: API_PATH,
    headers: {
        
    },
    responseType: 'json',
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true,
});

export const getRootPath = (action, dispatch) =>{
    try {
        const res =  create.get(`/`, null)
        res.then(res => {
            action.data = res.data
            dispatch(action)
        })
    }catch (e) {
       console.log(e)
    }
}

