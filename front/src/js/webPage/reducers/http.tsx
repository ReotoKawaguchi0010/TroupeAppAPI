import { GET_ROOT_PATH, SEND_MAIL } from "../actions/action"

export default (initialState={}, action: any) => {
    switch (action.type){
        case GET_ROOT_PATH:
            return {...action.state.http, ...action.data}
        case SEND_MAIL:
            return {...action.state.http, ...action.data}
        default:
            return initialState
    }
}