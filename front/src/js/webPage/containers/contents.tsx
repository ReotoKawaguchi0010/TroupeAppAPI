import React from "react";
import { Link } from "react-router-dom";
import {useRouteMatch} from "react-router";
import {Box, Button} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


import {MenuIcon} from "js/webPage/components/menu"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            padding: '0 7%',
        },
    })
);





export const Contents = () => {
    const classes = useStyles()
    const {path} = useRouteMatch()
    console.log(path)
    return (
        <>
            <MenuIcon />
            <div className={classes.body}>
                <Box>Contents</Box>
                <div>
                    <div><Link to={`${path}/video`}><Button>Video</Button></Link></div>
                    <div><Link to={`${path}/music`}><Button>Music</Button></Link></div>
                </div>
            </div>
        </>
    )
}
