import { combineReducers } from "redux";

import {userReducer} from "js/webApp/reducers/user_reducer";
import {performanceReducer} from "js/webApp/reducers/performance_reducer";
import {viewReducer} from "js/webApp/reducers/view_reducer";

import {ScheduleTime, InitialPerformance} from "js/types";


export const initialTime: ScheduleTime = {
    date: 0, day: '', hours: 0, minute: 0, month: 0, year: '',
}

interface InitialStateType {

}


export const initialState = {
    userReducer: {},
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
    },
    viewReducer: {
        sideMenu: true,
    },
}





export default combineReducers({userReducer, performanceReducer, viewReducer})