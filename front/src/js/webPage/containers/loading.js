import React, {useContext} from "react";
import {CircularProgress, Modal} from "@material-ui/core";

import {PageStoreContext} from "../contexts/PageStoreContext";
import {makeStyles} from "@material-ui/core/styles";

const pcStyles = (theme) => ({
    position: {
        padding: theme.spacing(2, 4, 3),
    }
})

const mobStyles = (theme) => ({
    position: {
        padding: theme.spacing(2, 4, 3),
    }
})

const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('sm', 'xl')]: pcStyles(theme),
    [theme.breakpoints.between('xs', 'sm')]: mobStyles(theme),
}));

export const Loading = () => {
    const classes = useStyles()
    const value = useContext(PageStoreContext)

    return (
        <>
            <Modal open={true}>
                <div>
                    <CircularProgress />
                </div>
            </Modal>
        </>
    )
}