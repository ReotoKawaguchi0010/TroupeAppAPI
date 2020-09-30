import React from "react";
import {send_api_login} from "../actions/action";
import {connect} from "react-redux";
import {TextField, Button} from "@material-ui/core";

const loginObj = {
    'username': '',
    'password': '',
}

class AuthTopPage extends React.Component {
    render() {
        let props = this.props
        const username = (event) => loginObj.username = event.currentTarget.value;
        const password = (event) => loginObj.password = event.currentTarget.value;
        const submitSend = () => {
            let test = props.send_api_login(loginObj.username, loginObj.password);
            console.log(test.location)
        }

        return (
            <div className="auth-top-page">
                <div style={{textAlign: "center"}}>
                    <h3>admin login</h3>
                    <div><TextField label="username" variant="filled" onChange={username} /></div>
                    <div><TextField label="password" variant="filled" onChange={password} /></div>
                    <div><Button onClick={submitSend} variant="contained" color="primary">送信</Button></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ })
const mapDispatchToProps = dispatch => ({
    send_api_login: (username, password) => dispatch(send_api_login(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthTopPage)