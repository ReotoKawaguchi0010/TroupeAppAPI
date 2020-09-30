import { combineReducers } from "redux";
import ajax from './xmaHttpRequest'
import toggle from './domAdmin'
import axios from "./axios";

export default combineReducers({ ajax, toggle, axios })