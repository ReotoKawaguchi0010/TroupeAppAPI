import React, {useReducer} from "react";

import reducers from "js/webPage/reducers"
import { Routings } from "js/webPage/routings/routings";
import {PageStoreContext} from "js/webPage/contexts/PageStoreContext";
import {initialState, InitialStateType} from "js/webPage/reducers";

interface ProvideTypes {
    children: object
}


const Provider: React.FC<ProvideTypes> = ({children}) => {
    const [state, dispatch] = useReducer<any>(reducers, initialState);
    return <PageStoreContext.Provider value={{state, dispatch}}>{children}</PageStoreContext.Provider>
}

export const webPage = () => {
    return (
        <Provider>
            <div className="web-page">
                <Routings />
            </div>
        </Provider>
    )
}