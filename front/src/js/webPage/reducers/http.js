import { TEST } from "../actions/action"

export default (state={}, action) => {
    switch (action.type){
        case TEST:
            action.res.data.isLoading = false;
            return action.res.data
        default:
            return state
    }
}