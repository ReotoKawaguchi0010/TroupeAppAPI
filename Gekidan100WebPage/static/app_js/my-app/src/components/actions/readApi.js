import Axios from "axios";
import {HOST} from "../../config/config";
export const READ = 'read_api'
export const READ_TOP_MESSAGE = 'readTopMessage'
export const READ_INDIVIDUALS = 'readIndividuals'

const QUERYSTRING = 'auth/top_page/';

export const readApi = () => async dispatch => {
    const myHttpClient = Axios.create({
        xsrfHeaderName: 'X-CSRF-Token',
        withCredentials: true
    })
    const response = await myHttpClient.post(`${HOST}${QUERYSTRING}`)
    dispatch({type: READ, response})
}

export const readTopMessage = () => async dispatch => {
    const myHttpClient = Axios.create({
        xsrfHeaderName: 'X-CSRF-Token',
        withCredentials: true
    })
    const response = await myHttpClient.post(`${HOST}`)
    dispatch({type: READ_TOP_MESSAGE, response})
}

export const readIndividuals = () => async dispatch => {
    let path = window.location.pathname.replace('/', '')
    const myHttpClient = Axios.create({
        xsrfHeaderName: 'X-CSRF-Token',
        withCredentials: true
    })
    const response = await myHttpClient.get(`${HOST}${path}`)
    dispatch({type: READ_INDIVIDUALS, response})
}