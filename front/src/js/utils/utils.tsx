import axios from "axios";
import {API_PATH} from "js/configs/config";

export const paramObj = (locationSearch: string) => {
    let paramObj: any = {};
    let searchArray = locationSearch.substr(1).split('&');
    for(let i in searchArray){
        let splitSearch = searchArray[i].split('=');
        paramObj[splitSearch[0]] = splitSearch[1];
    }
    return paramObj
}

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

export const uploadFile = axios.create({
    baseURL: API_PATH,
    headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest',
    },
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true,
})

export const scrollTop = (path: string, prevPath: string) => {
    if(path !== prevPath){
        window.scrollTo(0, 0);
    }
}