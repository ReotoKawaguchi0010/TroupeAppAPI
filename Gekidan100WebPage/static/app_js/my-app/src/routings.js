import React from "react";
import {Route, Switch} from "react-router-dom";
import App from "./components/App";
import MemberRouting from "./components/memberPage/routings";
import AuthTopPage from "./components/memberPage/loginPage";

class Routing extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/overview" component={App} />
                <Route exact path="/member" component={App} />
                <Route exact path="/schedule" component={App} />
                <Route exact path="/ticket" component={App} />
                <Route exact path="/contact" component={App} />
                <Route exact path="/auth/login" component={AuthTopPage} />
                <Route exact path="/auth/:id" component={MemberRouting} />
                <Route exact path="/auth/:id/:id2" component={MemberRouting} />
                <Route exact path="/auth/:id/:id2/:id3" component={MemberRouting} />
                <Route exact path="/auth" component={MemberRouting} />
            </Switch>
        )
    }
}

export default Routing