const initialState = {
    login: false
};

export const reducerFunc = (state=initialState, action) =>{
    switch (action.type){
        case 'login':
            let login = false
            if(action.data.bool === 'true') login = true
            return {...state, data: action.data, login: login, user: action.data.user}
        case 'logout':
            return {}
        case 'idea':
            return {...state}
        default:
            return state
    }
}








