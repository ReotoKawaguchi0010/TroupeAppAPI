import React from "react";
import {Link} from "react-router-dom";
import {Paper, List, ListItem, Button, Box} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import _ from "lodash";

import {PerformanceIcon, IdeaMan, NoteIcon, ContractIcon} from "../containers/icons";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 240,
        height: '100vh',
    },
    st: {
        fill: '#4B4B4B',
    },
    link: {
        textDecoration: 'none',
        color: 'initial',
        width: '100%',
        display: 'inherit',
        alignItems: 'inherit',
        justifyContent: 'inherit',
    },
}));

const listItems = [
    {
        name: '公演',
        iconComponent: PerformanceIcon,
        link: 'performance',
    },
    {
        name: '企画',
        iconComponent: IdeaMan,
        link: 'idea',
    },
    {
        name: 'マニュアル',
        iconComponent: NoteIcon,
        link: 'manual',
    },
    {
        name: '契約',
        iconComponent: ContractIcon,
        link: 'contract',
    },
]



export const Side = () => {
    const classes = useStyles()
    return (
        <Paper className={classes.paper}>
            <List>
                {
                    _.map(listItems, (v, i) => {
                        return (
                        <ListItem key={i}>
                            <Button>
                                <Link className={classes.link} to={`/app/${v.link}`}>
                                    <v.iconComponent />
                                    <Box>{v.name}</Box>
                                </Link>
                            </Button>
                        </ListItem>
                        )
                    })
                }
            </List>
        </Paper>
    )
}