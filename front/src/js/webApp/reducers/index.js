import { combineReducers } from "redux";

import {reducerFunc} from "./http";
import {reducerPerformance} from "./performance_reducer";

export default combineReducers({reducerFunc, reducerPerformance})