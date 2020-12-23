import React from "react";

import { Routings } from "./routings/routings";

export default class webPage extends React.Component{
    render(){
        return (
            <React.Fragment>
                    <div className="web-page">
                        <Routings />
                    </div>
            </React.Fragment>
        )
    }
}