import React, {useEffect, useReducer} from "react";

import {Routings} from "./routings/routings";
import reducers, {initialState} from "./reducers";
import {AppContext} from "./contexts/AppContext";

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducers, initialState);
    return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>
}

export const webApp = () => {
    useEffect(() => {
        document.title = '劇団沸管理App'
    })

    return (
        <React.Fragment>
            <Provider>
                <Routings />
            </Provider>
        </React.Fragment>
    )
}