import _ from "lodash"

import {PerformanceType, ScheduleTime, ScriptsType,
ScriptType, ScheduleType, InitialPerformance} from "js/types";
import {initialState} from "js/webApp/reducers";

export const performanceReducer = (
    state=initialState.performanceReducer,
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
            let list = []
            let scriptsInScripts = state.scripts.scripts
            if(Boolean(scriptsInScripts.length)) {
                _.map(scriptsInScripts, (v) => {
                    list.push(v)
                })
            }
            list.push(action.data.scripts)
            let scripts: ScriptsType = {
                title: action.data.title,
                totalPageNum: action.data.total_page_num,
                pageNum: action.data.page_num,
                scripts: list
            }
            return {...state, scripts: scripts}
        case 'get_idea':
            return {...state, idea: action.data}
        case 'delete_idea':
            return {...state, idea: action.data}
        case 'get_budget':
            return {...state, budget: action.data}
        case 'get_users':

            return {...state, users: action.data}
        default:
            return state
    }
}