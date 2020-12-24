import axios from "axios";

import { API_PATH } from "../configs/config";

export const TEST = 'TEST';
export const GET_SPECIAL = 'GET_SPECIAL';

export const create = axios.create({
    baseURL: API_PATH,
    headers: {
        
    },
    responseType: 'json',
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true,
});

export const test = () => async dispatch =>{
    try {
        const res =  await create.get(`/`, null)
        dispatch({type: TEST, res})
    }catch (e) {
       console.log(e)
    }
}

