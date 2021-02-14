import { GET_ROOT_PATH, SEND_MAIL } from "js/webPage/actions/action"
import {initialState, InitialStateType} from "js/webPage/reducers";


export default (state: InitialStateType=initialState, action: any) => {
    switch (action.type){
        case GET_ROOT_PATH:
            return {...action.state.http, ...action.data}
        case SEND_MAIL:
            let status = action.data.status_code
            let bool = action.data.bool === 'true'
            return {...action.state.http, status: status, bool: bool}
        default:
            return state
    }
}