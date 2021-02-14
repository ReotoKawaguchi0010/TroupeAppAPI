import { combineReducers } from "redux";

import http from "js/webPage/reducers/http";


export interface HttpType {
    bool: boolean
    status: number
}


export interface InitialStateType {
    http: HttpType
}

export const initialState: InitialStateType = {
    http: {
        bool: false,
        status: 400,
    }
}

export default combineReducers({http})