import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
        paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export const Performance = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper>Performance</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper>Performance</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper>Performance</Paper>
                </Grid>
            </Grid>
        </div>
    )
}