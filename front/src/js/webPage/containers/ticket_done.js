import React, {useEffect} from "react";
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from "react-router";


const pcStyles = (theme) => ({
    wrapPlayer: {
        textAlign: 'center',
        background: '#000000',
    },
    player: {
        width: '100%',
        height: '100%',
    },
})

const mobStyles = (theme) => ({
    wrapPlayer: {
        textAlign: 'center',
    },
    player: {
        display: 'inline-block'
    },
})


const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: pcStyles(theme),
    [theme.breakpoints.between('sm', 'md')]: mobStyles(theme),
}));


export const VideoTicketDone = () => {
    const classes = useStyles()
    const [state, setState] = React.useState({})



    return (
        <React.Fragment>
            <div>
                <CircularProgress />
            </div>
        </React.Fragment>
    )

}