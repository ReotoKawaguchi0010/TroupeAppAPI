import React, {useEffect, useReducer} from "react";

import {Routings} from "js/webApp/routings/routings";
import reducers, {initialState} from "js/webApp/reducers";
import {AppContext} from "js/webApp/contexts/AppContext";

interface PropsType {
    children: any
}


const Provider = (props: PropsType) => {
    const [state, dispatch] = useReducer<any>(reducers, initialState);
    return <AppContext.Provider value={{state, dispatch}}>{props.children}</AppContext.Provider>
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