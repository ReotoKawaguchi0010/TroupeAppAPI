import {AJAX} from "../action";
import HOST from "../../config/config";

const initialState = { name: '' }

const ajax = (test) => {
    let req = new XMLHttpRequest()
    req.onreadystatechange = () => {
        if(req.readyState === 4){
            if(!Boolean(req.response)) alert('error')
        }
    }
    let url = HOST + 'mail'
    req.open('POST', url, true)
    req.responseType = 'json'
    req.send(JSON.stringify(test))
    return { name: 'init' }
}

export default (state= initialState, action) => {
    switch (action.type) {
        case AJAX:
            return ajax(action.test)
        default:
            return state
    }
}
