import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import {Drawer, List, ListItem, Button, Box, useMediaQuery,
useTheme} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import _ from "lodash";

import {PerformanceIcon, IdeaMan,
    NoteIcon, ContractIcon, DisplayIcon} from "js/webApp/containers/icons";
import {AppContext} from "../contexts/AppContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 240,
        height: '100%',
        minHeight: '100vh',
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
    wrapAllowIcon: {
        textAlign: 'right',
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.between('xs', 'md')]: {
            width: '100%',
        },
    },
    drawerOpen: {
        width: drawerWidth,
        flexShrink: 0,
        [theme.breakpoints.between('xs', 'md')]: {
            width: '100%',
        },
    },
    drawerClose: {
        width: 0,
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
    {
        name: 'ホームページ',
        iconComponent: DisplayIcon,
        link: '',
    }
]


interface SideRootArg {
    open: boolean
    onClose: any
}


export const SideRoot: React.FC<SideRootArg> = ({open, onClose}) => {
    const {state, dispatch} = useContext(AppContext)
    const classes = useStyles()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    useEffect(() => {
        !matches ? dispatch({type: 'menu_open'}): dispatch({type: 'menu_close'})
    }, [matches])

    return (
    <Drawer className={
        open ? classes.drawerOpen : classes.drawerClose
    }
            anchor="left"
            open={open}
            variant="persistent"
            classes={{
                paper: classes.drawerPaper,
            }}
    >
        <List>
            <ListItem><Box>Menu</Box></ListItem>
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
    </Drawer>
    )
}