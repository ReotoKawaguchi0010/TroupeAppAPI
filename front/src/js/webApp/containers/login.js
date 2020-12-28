import React, {useState, useContext} from "react";
import {Input, Button, InputAdornment, IconButton} from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

import {AppContext} from "../contexts/AppContext";
import {login} from "../actions/actions";
import {Redirect} from "react-router";

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100vw',
        height: '100vh',
        textAlign: 'center',
    },
    title: {
        textAlign: 'center'
    },
    usernameBlock: {
        textAlign: 'center',
    },
    usernameRoot: {
        width: '20em',
        margin: '20px 0',
    },
    wrapForm: {
        justifyContent: 'center',
        verticalAlign: 'middle',
    },
    gridRoot: {
        width: '100%',
        margin: 0,
    },
}));




const Main = () => {
    const classes = useStyles()
    const {state, dispatch} = useContext(AppContext)
    const [loginState, setLoginState] = useState({
        type: 'password',
        sendData: {
            username: '',
            password: '',
        },
    });

    const handleInputChange = (e) => {
        const setData = loginState.sendData
        setData[e.target.name] = e.target.value
        setLoginState({...loginState, sendData: setData})
    }

    const handleClickShowPass = () => {
        loginState.type === 'password' ? setLoginState({...loginState, type: 'text'}) : setLoginState({...loginState, type: 'password'})
    }

    const handleClickSubmit = () => {
        login({type: 'login', sendData: loginState.sendData}, dispatch)
    }

    return (
        <>
            {state.reducerFunc ? state.reducerFunc.login ? <Redirect to="/app" /> : <></> : <></>}
            <main className={classes.main}>
                <h3 className={classes.title}>Login</h3>
                <div className={classes.usernameBlock}>
                    <Input
                        required
                        placeholder="ユーザーネーム"
                        classes={{root: classes.usernameRoot}}
                        name="username"
                        onChange={handleInputChange}
                    />
                </div>
                <div className={classes.usernameBlock}>
                    <Input
                        required
                        type={loginState.type}
                        placeholder="パスワード"
                        classes={{root: classes.usernameRoot}}
                        name="password"
                        onChange={handleInputChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPass}
                                >
                                    {loginState.type === 'password' ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <div className={classes.usernameBlock}>
                    <Button variant="contained" color="primary" onClick={handleClickSubmit}>
                        ログイン
                    </Button>
                </div>
            </main>
        </>
    )
}


export const Login = () => {
    return (
        <>
            <Main />
        </>
    )
}