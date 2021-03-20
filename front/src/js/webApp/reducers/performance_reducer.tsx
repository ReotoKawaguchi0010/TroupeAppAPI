import _ from "lodash"

import {ScriptsType, UsersProps} from "js/types/using_reducer_types";
import {initialState} from "js/webApp/reducers";

interface GetUsers {
    username: string
    first_name: string
    last_name: string
}

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
            let data: UsersProps[] = []
            action.data.map((v: GetUsers) => {
                let user: UsersProps = {
                    username: v.username,
                    firstName: v.first_name,
                    lastName: v.last_name,
                }
                data.push(user)
            })
            return {...state, users: data}
        default:
            return state
    }
}