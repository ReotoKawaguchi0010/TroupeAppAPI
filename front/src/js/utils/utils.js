import axios from "axios";
import {API_PATH} from "../configs/config";

export const paramObj = locationSearch => {
    let paramObj = {};
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