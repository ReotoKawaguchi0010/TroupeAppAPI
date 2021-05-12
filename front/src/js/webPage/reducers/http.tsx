import { GET_ROOT_PATH, SEND_MAIL } from "js/webPage/actions/action"
import {initialState, InitialStateType, HttpType} from "js/webPage/reducers";
import {changeCamelCase} from "js/utils/utils";


export default (state: InitialStateType=initialState, action: any) => {
    switch (action.type){
        case GET_ROOT_PATH:
            let data: HttpType = changeCamelCase<HttpType>(action.data, initialState.http)
            console.log(data)
            return {...action.state.http, ...data}
        case SEND_MAIL:
            let status = action.data.status_code
            let bool = action.data.bool === 'true'
            return {...action.state.http, status: status, bool: bool}
        default:
            return state
    }
}