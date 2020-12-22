import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import MenuIcon from "../components/menu";
import Footer from "../components/footer";


const pcStyles = (theme) => ({
    body: {
        background: '#f5f5f5',
    },
    title: {
        textAlign: 'center',
    },
    content: {
        height: 100,
        textAlign: 'center',
    }
})

const mobStyles = (theme) => ({
    body: {
        background: '#f5f5f5',
    },
    title: {
        fontSize: '50px',
        textAlign: 'center',
    },
    content: {
        height: 100,
        fontSize: '35px',
        textAlign: 'center',
        marginBottom: '100%',
    }
})

const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: pcStyles(theme),
    [theme.breakpoints.between('sm', 'md')]: mobStyles(theme),
}));



function Ticket(){
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.body}>
                <MenuIcon />
                <div style={{padding: 100}}>
                    <h3 className={classes.title}>TICKET</h3>
                    <div className={classes.content}>COMING SOON</div>
                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default Ticket