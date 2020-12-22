import React from "react"
import ReactDom from "react-dom"
import Routing from "./routings/routings";
import { BrowserRouter } from "react-router-dom";

ReactDom.render(
    <React.Fragment>
        <BrowserRouter>
            <Routing />
        </BrowserRouter>
    </React.Fragment>,
    document.getElementById('root')
)