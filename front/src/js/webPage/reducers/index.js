import { combineReducers } from "redux";

import http from "./http";
import loading from "./loading";

export default combineReducers({http, loading})