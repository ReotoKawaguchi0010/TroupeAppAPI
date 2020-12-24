import { GET_ROOT_PATH } from "../actions/action"

export default (state={}, action) => {
    switch (action.type){
        case GET_ROOT_PATH:
            return {...action.data}
        default:
            return state
    }
}