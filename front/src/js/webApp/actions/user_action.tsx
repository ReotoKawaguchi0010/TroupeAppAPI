import React from "react";

import {DefaultGetActionTypes} from "js/types/using_action_types";
import {create} from "js/utils/utils";


export const getUserData = async (action: DefaultGetActionTypes, dispatch: React.Dispatch<any>) => {
    try{
        const res = await create.get(`/app/`, {
            params: {
                type: action.type,
            }})

        if(String(res.status).match(/200?/)) dispatch({type: action.type, data: res.data})
        return res.status
    }catch (e) {
        console.log(e)
        return false
    }
}
