const initialState = {};

export const reducerFunc = (state=initialState, action) =>{
    switch (action.type){
        case 'increment':
            return {...state, test: 'test'}
        default:
            return state
    }
}








