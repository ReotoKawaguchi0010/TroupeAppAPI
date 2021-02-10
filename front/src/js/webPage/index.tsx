import React, {useReducer} from "react";

import reducers from "./reducers"
import { Routings } from "./routings/routings";
import {PageStoreContext} from "./contexts/PageStoreContext";

interface ProvideTypes {
    children: object
}


const Provider: React.FC<ProvideTypes> = ({children}) => {
    const [state, dispatch] = useReducer<any>(reducers, {});
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