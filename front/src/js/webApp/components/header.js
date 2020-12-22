import React from "react";

import SearchAppBar from "../containers/app_bar";

export default class Header extends React.Component{
    render(){
        return (
            <React.Fragment>
                <SearchAppBar />
            </React.Fragment>
        )
    }
}