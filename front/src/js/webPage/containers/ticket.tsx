import React from "react";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";

import {MenuIcon} from "js/webPage/components/menu";
import {Footer} from "js/webPage/components/footer";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            background: '#f5f5f5',
        },
        title: {
            textAlign: 'center',
            [theme.breakpoints.between('sm', 'md')]: {
                fontSize: '50px',
            },
        },
        content: {
            height: 100,
            textAlign: 'center',
            [theme.breakpoints.between('sm', 'md')]:{
                fontSize: '35px',
                marginBottom: '100%',
            }
        },
    })
);



export const Ticket = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.body}>
                <MenuIcon/>
                <div style={{padding: 100}}>
                    <h3 className={classes.title}>TICKET</h3>
                    <div className={classes.content}>COMING SOON</div>
                </div>
                <Footer/>
            </div>
        </>
    )
}

