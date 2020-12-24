import React from "react";

import {Routings} from "./routings/routings";

export default class webApp extends React.Component{
    componentDidMount() {
        document.title = '劇団沸管理App'
    }

    render(){
        return (
            <React.Fragment>
                <Routings />
            </React.Fragment>
        )
    }
}