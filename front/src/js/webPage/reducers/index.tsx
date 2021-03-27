import { combineReducers } from "redux";

import http from "js/webPage/reducers/http";

export interface BlogType {
    title: string
    link: string
}

export interface TwitterType{
    text: string
    urls: string[]
}

export interface HttpTextType {
    aboutUs: string
    blog: BlogType[]
    news: string
    recruitment: string
    twitter: TwitterType[]
}


export interface HttpType {
    bool: boolean
    status: number
    texts: HttpTextType
    contents: any
}


export interface InitialStateType {
    http: HttpType
}

export const initialState: InitialStateType = {
    http: {
        bool: false,
        status: 0,
        texts: {
            aboutUs: '',
            blog: [],
            news: '',
            recruitment: '',
            twitter: [],
        },
        contents: {},
    },
}

export default combineReducers({http})