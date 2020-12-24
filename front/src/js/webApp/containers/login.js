import React, {useState, useReducer, useContext} from "react";
import {Input} from '@material-ui/core';

import reducers from "../reducers"
import {AppContext} from "../contexts/AppContext";

import {create} from "../../webPage/actions/action";

const useStyles = {
    wrapField: {
        textAlign: 'center'
    },
}

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducers, {});
    return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>
}


const Main = () => {
    const {state, dispatch} = useContext(AppContext)


    const handleClick = () => {
        create.get('/').then(resp => {
            dispatch({type: 'respData', data: resp.data})
        })
    }

    return (
        <main>
            <div>{state.reducerFunc ? <div>{state.reducerFunc.data.message}</div> : ''}</div>
            <form>
                <div style={useStyles.wrapField}><Input label="Username" type="text" placeholder="username" /></div>
                <div style={useStyles.wrapField}><Input label="Password" type="password" placeholder="password" /></div>
                <button onClick={handleClick}>test</button>
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