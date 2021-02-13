import {PerformanceType, ScheduleTime, ScriptsType,
ScriptType, ScheduleType, InitialPerformance} from "js/types";

import {initialState} from "js/webApp/reducers";

export const reducerPerformance = (
    state=initialState.reducerPerformance,
    action: any) =>
{
    switch (action.type){
        case 'crete_performance':
            return {...state, data: 'test'}
        case 'create_schedule':
            return {...state}
        case 'upload_script':
            return {...state}
        case 'get_performance':
            return {...state, performances: action.data}
        case 'get_script':
            return {...state, scripts: action.data}
        default:
            return state
    }
}