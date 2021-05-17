import {initialState} from "js/webApp/reducers";
import {UserReducerType} from "js/types/using_reducer_types";

let login: boolean
let newState: UserReducerType
export const userReducer = (state=initialState.userReducer, action: any) =>{
    switch (action.type){
        case 'login':
            login = action.data.bool
            newState = {
                login: login,
                user: {
                    username: action.data.username,
                    contact: action.data.contact,
                    email: action.data.email,
                    introduction: action.data.introduction,
                    firstName: action.data.first_name,
                    lastName: action.data.lest_name,
                    profileImageUrl: action.data.profile_image,
                }
            }
            return newState
        case 'logout':
            return state
        case 'get_user_data':
            console.log(action.data.bool)
            if(action.data.bool){
                return {...state, login: true}
            }
            return state
        default:
            return state
    }
}