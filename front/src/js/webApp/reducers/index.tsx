import { combineReducers } from "redux";

import {reducerFunc} from "./http";
import {reducerPerformance} from "./performance_reducer";

export const initialState = {
    reducerFunc: {},
    reducerPerformance: {
        performances: [],
        scripts: {
            total_page_num: 0,
            page_num: 1,
            script: [],
        },
        schedule: {
            readEvent: {},
            title: '',
            start: {
                month: 0, date: 0, hours: 0,
                minute: 0, day: '', year: '',
            },
            end: {
                month: 0, date: 0, hours: 0,
                minute: 0, day: '', year: '',
            },
            description: '',
        },
    }
}





export default combineReducers({reducerFunc, reducerPerformance})