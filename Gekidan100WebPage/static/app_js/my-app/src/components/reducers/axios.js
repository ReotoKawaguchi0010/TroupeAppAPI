import {READ, READ_TOP_MESSAGE, READ_INDIVIDUALS} from "../actions/readApi";


export default (readContents= {}, action) => {
    switch (action.type) {
        case READ:
            return action.response.data
        case READ_TOP_MESSAGE:
            return action.response.data
        case READ_INDIVIDUALS:
            return action.response.data
        default:
            return readContents
    }
}