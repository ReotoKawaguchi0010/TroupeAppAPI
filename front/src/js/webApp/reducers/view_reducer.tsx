import {initialState} from "js/webApp/reducers"


export const viewReducer = (state=initialState.viewReducer, action: any) => {
    switch (action.type){
        case 'menu_open':
            return {...state, sideMenu: true}
        case 'menu_close':
            return {...state, sideMenu: false}
        default:
            return {...state}
    }
}


