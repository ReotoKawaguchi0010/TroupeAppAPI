import React, {useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import {Drawer, List, ListItem, Button, Box, useMediaQuery,
useTheme} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import _ from "lodash";

import {PerformanceIcon, IdeaMan,
    NoteIcon, ContractIcon, DisplayIcon} from "js/webApp/containers/icons";
import {AppContext} from "js/webApp/contexts/AppContext";
import {LeftIconComp} from "js/webApp/containers/app_bar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    paper: {
        width: drawerWidth,
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
        display: 'block',
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
    menuBtn: {
        display: 'flex',
        width: '100%',
    },
    icon: {
        textAlign: 'left',
        width: '20%',
    },
    name: {
        width: '80%',
    },
    list: {
        borderBottom: 'solid 1px #000000',
    },
    sideFooter: {
        fontSize: '12px',
        color: '#a2a1a1',
        textAlign: 'center',
        margin: '10px 0'
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


export const SideRoot: React.FC<SideRootArg> = ({open}) => {
    const {dispatch} = useContext(AppContext)
    const classes = useStyles()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    useEffect(() => {
        !matches ? dispatch({type: 'menu_open'}): dispatch({type: 'menu_close'})
    }, [matches])

    const handleLinkClick = () => {
        if(matches){
            dispatch({type: 'menu_close'})
        }
    }

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
            <Box>
                Menu
                {matches ? <LeftIconComp onClick={() => {dispatch({type: 'menu_close'})}} /> : ''}
            </Box>
            {
                _.map(listItems, (v, i) => {
                    return (
                    <ListItem key={i} className={classes.list}>
                        <Link className={classes.link} to={`/app/${v.link}`} onClick={handleLinkClick}>
                            <Button className={classes.menuBtn}>
                                <Box className={classes.icon}><v.iconComponent /></Box>
                                <Box className={classes.name}>{v.name}</Box>
                            </Button>
                        </Link>
                    </ListItem>
                    )
                })
            }
            <Box className={classes.sideFooter}>劇団沸管理アプリ</Box>
        </List>
    </Drawer>
    )
}