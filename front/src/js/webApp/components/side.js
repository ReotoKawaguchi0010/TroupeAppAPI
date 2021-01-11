import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Drawer, List, ListItem, Button, Box} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import _ from "lodash";

import {PerformanceIcon, IdeaMan, NoteIcon, ContractIcon} from "../containers/icons";

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
        position: 'initial',
    },
    drawerOpen: {
        width: drawerWidth,
        flexShrink: 0,
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
]


const SideRoot = ({open, onClose}) => {
    const classes = useStyles()

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
            <ListItem className={classes.wrapAllowIcon}><Button onClick={onClose}><ChevronLeftIcon /></Button></ListItem>
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






export const Side = () => {
    const [sideState, setSideState] = useState({
        open: true,
    })
    const classes = useStyles()

    const handleClickBtn = () => {
        sideState.open ? setSideState({...sideState, open: false}) : setSideState({...sideState, open: true})
    }
    return (
        <>
            {
                !sideState.open ? <Box className={classes.wrapAllowIcon}>
                <Button onClick={handleClickBtn}>
                    <ChevronRightIcon />
                </Button>
            </Box> : <></>
            }

            <SideRoot open={sideState.open} onClose={handleClickBtn} />
        </>
    )
}