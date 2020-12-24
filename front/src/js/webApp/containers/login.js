import React, {useState, useReducer, useContext} from "react";
import {Input} from '@material-ui/core';

import reducers from "../reducers"
import {AppContext} from "../contexts/AppContext";

const useStyles = {
    wrapField: {
        textAlign: 'center'
    },
}

const createStore = (reducer, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return { state, dispatch }
}

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducers, {});
    return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>
}


const Test = () => {
    const {state, dispatch} = useContext(AppContext)

    const handleClick = () => {
        dispatch({type: 'test'})
    }

    return (
        <div onClick={handleClick}>test</div>
    )
}

const Main = () => {
    const {state, dispatch} = useContext(AppContext)


    const handleClick = () => {
        dispatch({type: 'increment'})
    }

    console.log(state)
    return (
        <main>
            <Test />
            <button onClick={handleClick}>test</button>
            <form>
                <div style={useStyles.wrapField}><Input label="Username" type="text" placeholder="username" /></div>
                <div style={useStyles.wrapField}><Input label="Password" type="password" placeholder="password" /></div>
            </form>
        </main>
    )
}


export const Login = () => {
    return (
        <Provider>
            <Main />
        </Provider>
    )
}