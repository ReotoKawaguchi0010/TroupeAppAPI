import {START_LOADING, END_LOADING} from "../actions/loading";

export default (state={isLoading: false}, action) => {
    switch (action.type){
        case START_LOADING:
            state.isLoading = true;
            return state
        case END_LOADING:
            state.isLoading = false;
            return state
        default:
            return state
    }
}