import React from "react";

interface PageStore {
    state: any
    dispatch: React.Dispatch<any>
}

export const PageStoreContext = React.createContext<PageStore>({} as PageStore)