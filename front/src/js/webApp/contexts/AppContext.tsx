import React, {createContext} from "react";

interface AppContextState {
    state: any
    dispatch: React.Dispatch<any>
}

export const AppContext = createContext<AppContextState>({} as AppContextState)
