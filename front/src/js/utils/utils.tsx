import React from "react";
import {Paper, Drawer, Button} from "@material-ui/core";
import axios from "axios";

import {API_PATH} from "js/configs/config";

export interface AlertUIType {
    open: boolean
    onClose: () => void
    text: string
}

export const AlertUI: React.FC<AlertUIType> = ({open, text, onClose}) => {
    return (
        <>
            <Drawer open={open} ModalProps={{hideBackdrop: true, onClose: onClose}} anchor={'top'}>
                <Paper>
                    <div>{text}</div>
                    <div>
                        <Button onClick={onClose}>はい</Button>
                    </div>
                </Paper>
            </Drawer>
        </>
    )
}



export const paramObj = (locationSearch: string) => {
    let paramObj: {[key: string]: string}  = {};
    let searchArray: string[] = locationSearch.substr(1).split('&');
    for(let i in searchArray){
        let splitSearch: string[] = searchArray[i].split('=');
        paramObj[splitSearch[0]] = splitSearch[1]
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