import {TOGGLE} from '../action'


const initialStateToggle = { show: '', hide: 'hidden' }

const toggle = (state) => {
    let result = {
        show: 'hidden',
        hide: ''
    }
    if(state.show === 'hidden'){
        result = {
            show: '',
            hide: 'hidden'
        }
        return result
    }
    return result
}

export default (state= initialStateToggle, action) => {
    switch (action.type) {
        case TOGGLE:
            return toggle(state)
        default:
            return state
    }
}

