import { combineReducers } from "redux";

import {userReducer} from "js/webApp/reducers/user_reducer";
import {performanceReducer} from "js/webApp/reducers/performance_reducer";
import {viewReducer} from "js/webApp/reducers/view_reducer";

import {ScheduleTime, InitialPerformance} from "js/types";


export const initialTime: ScheduleTime = {
    date: 0, day: '', hours: 0, minute: 0, month: 0, year: '',
}


interface UserInUserReducerType {
    contact: string
    email: string
    firstName: string
    lastName: string
    introduction: string
    profileImageUrl: string
    username: string
}

export interface UserReducerType {
    login: boolean
    user: UserInUserReducerType
}

export interface IdeaType {
    author: string
    contents: []
    title: string
}

export interface PerformanceReducerType {
    performances: any
    schedule: any
    scripts: any
    idea: IdeaType[]
}

interface InitialStateType {
    userReducer: UserReducerType
    performanceReducer: PerformanceReducerType
    viewReducer: any
}



export const initialState: InitialStateType = {
    userReducer: {
        login: false,
        user: {
            contact: '',
            email: '',
            firstName: '',
            lastName: '',
            introduction: '',
            profileImageUrl: '',
            username: '',
        },
    },
    performanceReducer: {
        performances: [],
        schedule: {
            description: '',
            end: initialTime,
            readEvent: {},
            start: initialTime,
            title: '',
        },
        scripts: {
            pageNum: 0,
            scripts: [],
            title: '',
            totalPageNum: 0,
        },
        idea: [{title: '', contents: [], author: ''}],
    },
    viewReducer: {
        sideMenu: true,
    },
}





export default combineReducers({userReducer, performanceReducer, viewReducer})