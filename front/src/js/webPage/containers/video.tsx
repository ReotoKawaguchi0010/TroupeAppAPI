import React, {useEffect} from "react";
import axios from "axios";
// @ts-ignore
import { Player, ControlBar } from "video-react";
import { Link } from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Redirect, useRouteMatch} from "react-router";
import {List, ListItem, Box, Button} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    wrapPlayer: {
        textAlign: 'center',
        [theme.breakpoints.between('md', 'xl')]: {
            background: '#000000',
        },
    },
    player: {
       [theme.breakpoints.between('md', 'xl')]: {
           width: '100%',
           height: '100%',
       },
        [theme.breakpoints.between('sm', 'md')]: {
           display: 'inline-block',
        },
    },
    wrapVideoList: {
        padding: '100px 200px 0 200px',
    },
    videoListItem: {
        display: 'block',
        textAlign: 'left',
    },
}));


export const Video = (props: any) => {
    const classes = useStyles()
    const [state, setState] = React.useState({url: '', playing: false, classes: classes})


    const rightClick = (e: any) => {
        e.preventDefault();
        return false
    }

    let url = 'https://dl.dropboxusercontent.com/s/3e2v703d33resr0/%E3%83%A9%E3%83%BC%E3%83%A1%E3%83%B3%E3%82%BA%E3%80%8ETEXT%E3%80%8F%E3%82%88%E3%82%8A%E3%80%8C%E9%8A%80%E6%B2%B3%E9%89%84%E9%81%93%E3%81%AE%E5%A4%9C%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E5%A4%9C%E3%80%8D_480p.mp4'


    if(!Boolean(props.data.bool)){
        return(
            <Redirect to='/' />
        )
    }

    const getVideo = async () => {
        try{
            const res = await axios.get(url, {
                responseType: 'blob',
            })
            let blob = new Blob([res.data])
            let blobURL = (window.webkitURL || window.URL).createObjectURL(blob)
            setState({...state, url: blobURL})
        }catch (e) {
            return e
        }
    }

    useEffect(() => {
        const err = getVideo()
        console.log(err)
    }, [])

    return (
        <>
            <div onContextMenu={rightClick} className={classes.wrapPlayer}>
                <Player src={state.url} className={classes.player}>
                    <ControlBar autoHide={false} />
                </Player>
            </div>
        </>
    )
}


export const Videos = () => {
    const {path} = useRouteMatch()
    const classes = useStyles()
    return (
        <>
            <Box className={classes.wrapVideoList}>
                <List>
                    <ListItem className={classes.videoListItem}>
                        <Link to={`${path}/1`}><Button>第1回公演</Button></Link>
                    </ListItem>
                    <ListItem className={classes.videoListItem}>
                        <Link to={`${path}/2`}><Button>第2回公演</Button></Link>
                    </ListItem>
                    <ListItem className={classes.videoListItem}>
                        <Link to={`${path}/3`}><Button>第3回公演</Button></Link>
                    </ListItem>
                    <ListItem className={classes.videoListItem}>
                        <Link to={`${path}/4`}><Button>第4回公演</Button></Link>
                    </ListItem>
                </List>
            </Box>
        </>
    )
}





