const initialState = {
    login: false
};

export const reducerFunc = (state=initialState, action) =>{
    switch (action.type){
        case 'login':
            let login = false
            if(action.data.bool === 'true') login = true
            return {...state, data: action.data, login: login}
        case 'idea':
            return {...state}
        default:
            return state
    }
}








