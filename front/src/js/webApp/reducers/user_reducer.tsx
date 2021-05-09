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
            login = action.data.bool
            if(login){
                state = {
                    login: login,
                    user: {
                        username: action.data.user.username,
                        contact: action.data.user.contact,
                        email: action.data.user.email,
                        introduction: action.data.user.introduction,
                        firstName: action.data.user.first_name,
                        lastName: action.data.user.last_name,
                        profileImageUrl: action.data.user.profile_image,
                    },
                }
            }
            return state
        default:
            return state
    }
}