import React, {useContext} from "react";
import {CircularProgress, Modal} from "@material-ui/core";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";

import {PageStoreContext} from "js/webPage/contexts/PageStoreContext";

const useStyles = makeStyles((theme: Theme) => createStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapContent: {
        outline: 0,
    },
}));

export const Loading = () => {
    const classes = useStyles()
    const value = useContext(PageStoreContext)

    return (
        <>
            <Modal open={true} className={classes.modal}>
                <div className={classes.wrapContent}>
                    <CircularProgress />
                </div>
            </Modal>
        </>
    )
}