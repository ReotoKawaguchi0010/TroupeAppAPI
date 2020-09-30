import {AJAX, SEND_API_LOGIN} from "../actions/action";
import {HOST} from "../../config/config";

const initialState = {username: '', password: '', message: 'test'}
let req = new XMLHttpRequest()
const ajax = (test) => {
    let url = HOST + 'mail'
    req.open('POST', url, true)
    req.responseType = 'json'
    req.send(JSON.stringify(test))
    req.onreadystatechange = () => {
        if(req.readyState === 4){
            if(!Boolean(req.response)) alert('error')
        }
    }
    return { name: 'init' }
}

const send_api_login = (username, password) => {
    req.onreadystatechange = () => {
        if(req.readyState === 4){
            console.log('hello')
            window.location.href = '/auth/top_page';
        }
    }
    let url = HOST + 'auth/'
    req.open('POST', url, true)
    req.responseType = 'json'
    req.withCredentials = true;
    let post_data = encodeURIComponent('username')+'='+encodeURIComponent(username)+
        '&'+encodeURIComponent('password')+'='+encodeURIComponent(password)
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    req.send(post_data)
    return {username: username, password: password}
}

export default (state= initialState, action) => {
    switch (action.type) {
        case AJAX:
            return ajax(action.test)
        case SEND_API_LOGIN:
            return send_api_login(action.username, action.password)
        default:
            return state
    }
}
