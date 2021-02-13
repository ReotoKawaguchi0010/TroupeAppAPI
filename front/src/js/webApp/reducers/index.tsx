import { combineReducers } from "redux";

import {reducerFunc} from "js/webApp/reducers/http";
import {reducerPerformance} from "js/webApp/reducers/performance_reducer";

import {PerformanceType, InitialPerformance,
    ScheduleType, ScriptType,
    ScriptsType, ScheduleTime} from "js/types";


export const initialTime: ScheduleTime = {
    date: 0, day: '', hours: 0, minute: 0, month: 0, year: '',
}


export const initialState = {
    reducerFunc: {},
    reducerPerformance: {
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
    }
}





export default combineReducers({reducerFunc, reducerPerformance})