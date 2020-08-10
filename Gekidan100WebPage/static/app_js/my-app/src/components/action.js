
export const AJAX = 'ajax'
export const TOGGLE = 'toggle'


export const ajax = (test) => {
    return {
        type: 'ajax',
        test: test
    }
}

export const toggle = () => {
    return {
        type: TOGGLE
    }
}