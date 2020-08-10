import React from "react";
import {Route, Switch} from "react-router-dom";
import App from "./components/App";
import Sub from "./components/subMenu";

class Test extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/menu" component={Sub} />
                <Route exact path="/overview" component={App} />
                <Route exact path="/member" component={App} />
                <Route exact path="/schedule" component={App} />
                <Route exact path="/ticket" component={App} />
                <Route exact path="/contact" component={App} />
            </Switch>
        )

    }
}

export default Test