const initialState = {
    login: false
};

export const userReducer = (state=initialState, action: any) =>{
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