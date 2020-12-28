import React, {useState, useContext} from "react";
import {Input} from '@material-ui/core';

import {AppContext} from "../contexts/AppContext";
import {login} from "../actions/actions";

const useStyles = {
    wrapField: {
        textAlign: 'center'
    },
}




const Main = () => {
    const {state, dispatch} = useContext(AppContext)

    return (
        <main>
            <div>{state.reducerFunc ? <div>{state.reducerFunc.data.message}</div> : ''}</div>
            <form>
                <div style={useStyles.wrapField}><Input label="Username" type="text" placeholder="username" /></div>
                <div style={useStyles.wrapField}><Input label="Password" type="password" placeholder="password" /></div>
                <button>test</button>
            </form>
        </main>
    )
}


export const Login = () => {
    return (
        <>
            <Main />
        </>
    )
}