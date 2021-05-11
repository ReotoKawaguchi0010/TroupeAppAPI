import React from "react";
import {Button, Drawer, Paper} from "@material-ui/core";
import axios from "axios";

import {API_PATH} from "js/configs/config";
import _ from "lodash";

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


const camelCase = (data: object) => {
    const obj = {}
    _.map(data, (v: any, k: string) => {
        let key: string = _.camelCase(k)
        if(typeof v === "object"){
            v = camelCase(v)
            Object(obj)[key] = v
        }
        Object(obj)[key] = v
    })
    return obj
}

export const changeCamelCase = <T extends {},>(data: object, t: T): T => {
    _.map(data, (v:string | number | object, k: string | number) => {
        let key: string = _.camelCase(String(k))
        if(typeof v === "object"){
            v = camelCase(v)
        }
        _.map(t, (tV: any, tK: string) => {
            if(tK == key) Object(t)[tK] = v
        })
    })

    return t
}

interface SnakeCaseType {
    [key: string]: any
}

export const changeSnakeCase = (data: object) => {
    const snakeCase: SnakeCaseType = {}
    _.map(data, (v:string | number | object, k: string | number) => {
        if(typeof v === "object" && !Array.isArray(v)){
            v = changeSnakeCase(v)
        }
        let key: string = _.snakeCase(String(k))
        snakeCase[key] = v
    })
    return snakeCase
}//url以外でスネークケースで使う場合がないから型はなし