const initialState = {
    login: false
};

export const reducerPerformance = (state=initialState, action) =>{
    switch (action.type){
        case 'crete_performance':
            return {...state, data: 'test'}
        default:
            return state
    }
}