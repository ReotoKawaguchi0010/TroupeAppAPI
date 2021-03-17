import { combineReducers } from "redux";

import {userReducer} from "js/webApp/reducers/user_reducer";
import {performanceReducer} from "js/webApp/reducers/performance_reducer";
import {viewReducer} from "js/webApp/reducers/view_reducer";

import {ScheduleTime, InitialStateType} from "js/types/using_reducer_types";


export const initialTime: ScheduleTime = {
    date: 0, day: '', hours: 0, minute: 0, month: 0, year: '',
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
        budget: {
            fullBudget: 0,
            budget: [],
            balance: 0,
        },
        users: [],
    },
    viewReducer: {
        sideMenu: true,
    },
}





export default combineReducers({userReducer, performanceReducer, viewReducer})