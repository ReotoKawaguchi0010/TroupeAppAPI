import React, {useContext} from "react";
import {CircularProgress, Modal} from "@material-ui/core";

import {PageStoreContext} from "../contexts/PageStoreContext";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
    [theme.breakpoints.between('sm', 'xl')]: {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    [theme.breakpoints.between('xs', 'sm')]: {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
}));

export const Loading = () => {
    const classes = useStyles()
    const value = useContext(PageStoreContext)

    return (
        <>
            <Modal open={true} className={classes.modal}>
                <div tabIndex={undefined}>
                    <CircularProgress />
                </div>
            </Modal>
        </>
    )
}