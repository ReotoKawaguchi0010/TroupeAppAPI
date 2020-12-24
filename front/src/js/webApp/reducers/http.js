import {create} from "../../webPage/actions/action";


const initialState = {
    test: 'hello',
};

export const reducerFunc = (state=initialState, action) =>{
    switch (action.type){
        case 'increment':
            return {...state, test: 'test'}
        case 'send':
            create.get('/').then((resp) => {
                return {test: resp}
            })
            return {}
        case 'respData':
            console.log(action.data)
            return {data: action.data}
        default:
            return state
    }
}








