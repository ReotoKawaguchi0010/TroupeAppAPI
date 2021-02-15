import React from "react";

import {create} from "js/utils/utils";

export const GET_ROOT_PATH = 'GET_ROOT_PATH';
export const SEND_MAIL = 'SEND_MAIL';

export const getRootPath = async (action: any, dispatch: React.Dispatch<any>) =>{
    try {
        const res = await create.get(`/`)
        action.data = res.data
        dispatch(action)
    }catch (e) {
       console.log(e)
    }
}