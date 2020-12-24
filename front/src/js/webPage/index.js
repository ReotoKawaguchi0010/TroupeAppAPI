import React, {useReducer} from "react";

import reducers from "./reducers"
import { Routings } from "./routings/routings";
import {PageStoreContext} from "./contexts/PageStoreContext";

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducers, {});
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