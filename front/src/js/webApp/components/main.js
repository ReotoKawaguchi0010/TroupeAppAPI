import React from "react";
import Header from "./header";
import Footer from "./footer";


export default class Main extends React.Component{
    constructor() {
        super();
        this.state = {
            sideBar: true,
        }
    }



    render(){
        return (
            <React.Fragment>
                <Header />
                <main>main</main>
            </React.Fragment>
        )
    }
}