import React, {useContext, useState} from "react";
const {Link} = require("react-router-dom");
import {
    AppBar, Toolbar, IconButton, Typography,
    InputBase, Avatar, Menu, MenuItem, Paper, useTheme, useMediaQuery
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import DehazeIcon from '@material-ui/icons/Dehaze';

import {AppContext} from "js/webApp/contexts/AppContext";
import {logout} from "js/webApp/actions/actions"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        [theme.breakpoints.between('xs', 'md')]:{
            height: 100,
        },
    },
    toolBar: {
        [theme.breakpoints.between('xs', 'md')]:{
            margin: 'auto 0',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'block',
        [theme.breakpoints.between('xs', 'md')]: {
            display: 'none',
        },
        textAlign: 'center',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: theme.spacing(1),
        width: 'auto',
        [theme.breakpoints.between('xs', 'md')]: {
            marginLeft: 0,
            width: '100%',
            height: '100%',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIconRoot: {
        [theme.breakpoints.between('xs', 'md')]: {
            fontSize: 40,
        },
    },
    inputRoot: {
        color: 'inherit',
        [theme.breakpoints.between('xs', 'md')]: {
            height: '100%',
            fontSize: 40,
        },
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        [theme.breakpoints.between('xs', 'md')]: {
            width: '100%',
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: '#C14949',
    },
    link: {
        color: '#ffffff',
    },
    menuAvatar: {
        cursor: "pointer",
    },
    profileLink: {
        color: 'initial',
        textDecoration: 'none',
    },
    homeIcon: {
        [theme.breakpoints.between('xs', 'md')]: {
            fontSize: 40,
        },
    },
}));

const HomeIconComp = () => {
    const classes = useStyles()
    return (
        <>
             <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
            >
                <Link to="/app" className={classes.link}>
                    <HomeIcon className={classes.homeIcon} />
                </Link>
            </IconButton>
        </>
    )
}

const MenuIconComp = () => {
    const classes = useStyles()
    return (
        <>
            <DehazeIcon />
        </>
    )
}

export const SearchAppBar = () =>{
    const {state, dispatch} = useContext(AppContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    console.log(matches)

    const handleMenuClick = (e: any) => {
        setAnchorEl(e.target)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleClickLogout = () => {
        logout({type: 'logout'}, dispatch)
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar classes={{root: classes.toolBar}}>
                    {!matches ? <HomeIconComp /> : <MenuIconComp />}
                    <Typography className={classes.title} variant="h6" noWrap>
                        劇団沸管理アプリ
                    </Typography>
                    {!matches ? (
                        <Avatar onClick={handleMenuClick}
                            onMouseOver={handleMenuClick}
                            className={classes.menuAvatar}>
                            {'T'}
                        </Avatar>
                    ) : <></>}
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon classes={{root: classes.searchIconRoot}} />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
                <Menu
                    anchorEl={anchorEl}
                    elevation={0}
                    getContentAnchorEl={null}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                >
                    <Paper>
                        <MenuItem><Link to="/app/profile"
                                    className={classes.profileLink}
                                    onClick={handleMenuClose}
                        >プロフィール</Link></MenuItem>
                        <MenuItem onClick={handleClickLogout}>ログアウト</MenuItem>
                    </Paper>
                </Menu>
            </AppBar>
        </div>
    );
}