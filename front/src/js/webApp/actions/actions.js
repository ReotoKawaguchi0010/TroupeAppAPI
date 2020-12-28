import {create} from "../../utils/utils";

export const login = async (action, dispatch) => {
    try{
        const res = await create.post(`/app/`, JSON.stringify({test: 'test'}))
        action.data = res.data
        dispatch(action)
    }catch (e) {
        console.log(e)
    }
}


export const send = () => {

}



