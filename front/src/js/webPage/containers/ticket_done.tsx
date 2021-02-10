import React from "react";
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    wrapPlayer: {
        textAlign: 'center',
        [theme.breakpoints.between('md', 'xl')]: {
            background: '#000000',
        },
    },
    player: {
        width: '100%',
        height: '100%',
        [theme.breakpoints.between('sm', 'md')]: {
            display: 'inline-block'
        },
    },

}));


export const VideoTicketDone = () => {
    return (
        <React.Fragment>
            <div>
                <CircularProgress />
            </div>
        </React.Fragment>
    )
}