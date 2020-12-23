import React, {useState, useReducer, useContext} from "react";
import {Input} from '@material-ui/core';

import reducers from "../reducers"
import {AppContext} from "../contexts/AppContext";

const useStyles = {
    wrapField: {
        textAlign: 'center'
    },
}


const Test = () => {
    const value = useContext(AppContext);
    console.log(value)
    return (
        <div>test</div>
    )
}



export const Login = () => {
    const [state, dispatch] = useReducer(reducers, {})

    const handleClick = () => {
        dispatch({type: 'increment'})
    }

    return (
        <AppContext.Provider value={state}>
            <main>
                <Test />
                <button onClick={handleClick}>test</button>
                <form>
                    <div style={useStyles.wrapField}><Input label="Username" type="text" placeholder="username" /></div>
                    <div style={useStyles.wrapField}><Input label="Password" type="password" placeholder="password" /></div>
                </form>
            </main>
        </AppContext.Provider>
    )
}