


const initialState = {
    test: 'hello',
};

export const reducerFunc = (state=initialState, action) =>{
    switch (action.type){
        case 'increment':
            return {test: 'test'}
        default:
            return {}
    }
}








