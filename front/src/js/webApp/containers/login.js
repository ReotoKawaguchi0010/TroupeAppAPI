import React from "react";
import TextField from '@material-ui/core/TextField';

const useStyles = {
    wrapField: {
        textAlign: 'center'
    },
}





export default class Login extends React.Component{
    render(){
        return (
            <React.Fragment>
                <main>
                    <form>
                        <div style={useStyles.wrapField}><TextField label="Username" /></div>
                        <div style={useStyles.wrapField}><TextField label="Password" type="password" /></div>
                    </form>
                </main>
            </React.Fragment>
        )
    }
}