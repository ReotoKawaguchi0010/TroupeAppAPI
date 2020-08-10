import { combineReducers } from "redux";
import ajax from './xmaHttpRequest'
import toggle from './domAdmin'

export default combineReducers({ ajax, toggle })