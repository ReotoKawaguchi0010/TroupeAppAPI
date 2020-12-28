const initialState = {
    login: false
};

export const reducerFunc = (state=initialState, action) =>{
    switch (action.type){
        case 'login':
            return {...state, data: action.data}
        default:
            return state
    }
}








