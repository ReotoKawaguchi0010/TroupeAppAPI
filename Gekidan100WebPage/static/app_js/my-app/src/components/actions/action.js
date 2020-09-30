export const READ = 'read_api'
export const AJAX = 'ajax'
export const SEND_API_LOGIN = 'send_api_login'
export const TOGGLE = 'toggle'


export const ajax = (test) => {
    return {
        type: AJAX,
        test: test
    }
}

export const toggle = () => {
    return {
        type: TOGGLE
    }
}

export const send_api_login = (username, password) => {
    return {
        type: SEND_API_LOGIN,
        username: username,
        password: password,
    }
}

