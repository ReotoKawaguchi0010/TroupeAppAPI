const initialState = {
    login: false
};

export const reducerPerformance = (state=initialState, action) =>{
    switch (action.type){
        case 'crete_performance':
            return {...state, data: 'test'}
        case 'create_schedule':
            console.log(action.data)
            return {...state}
        case 'upload_script':
            return {...state}
        case 'get_performance':
            return {...state, performances: action.data}
        default:
            return state
    }
}