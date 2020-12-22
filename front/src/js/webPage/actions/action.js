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
        const searchObj = location.search
        let res;
        if(searchObj){
            res =  await create.get(`/${searchObj}`, null)
        }else{
            res =  await create.get('/', null)
        }
        dispatch({type: TEST, res})
    }catch (e) {
       console.log(e)
    }
}

export const get_special = () => async dispatch => {
    try {
        const url = location.pathname;
        const res = await create.get(url);
        dispatch({type: GET_SPECIAL, res})
    }catch (e){
        console.log(e)
    }
}