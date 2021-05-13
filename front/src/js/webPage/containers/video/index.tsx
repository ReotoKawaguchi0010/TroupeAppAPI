import React, {useEffect, useState} from "react";
import {Switch, useRouteMatch} from "react-router";
import {Link} from "react-router-dom";
import {Box, Button, List, ListItem} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import _ from "lodash";

import {changeCamelCase} from "js/utils/utils";
import {VideoTicket} from "js/webPage/containers/video_ticket";
import {RouteWithSubRoutes} from "js/routes/routes";
import {Play} from "js/webPage/containers/video/play";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        borderBottom: 'solid 3px #FCAD3C',
    },
    wrapVideoList: {
        padding: '100px 200px 0 200px',
    },
    wrapVideoListItem: {
        display: 'block',
        textAlign: 'left',
        border: 'solid 1px #000000',
        margin: '5% 0',
        position: 'relative',
        paddingTop: 80,
    },
    performanceNum: {
        display: 'inline-block',
        padding: '10px',
        background: '#42A43B',
        color: '#ffffff',
        fontWeight: 'bolder',
        position: 'absolute',
        left: -13,
        top: 13,
    },
    mainContent: {
        display: 'flex',
    },
    topImage: {
        textAlign: 'center',
        width: '40%',
        '& img': {
            width: '80%',
        },
    },
    videoList: {
        width: '60%',
        '& li': {
            borderBottom: 'solid 2px #BEBDBE',
        },
    },
    listItemTitle: {
        background: '#FF232C',
        color: '#ffffff',
        fontSize: '12px',
        padding: 5,
        borderRadius: 4,
        fontWeight: 500,
    },
    wrapSendBtn: {
        textAlign: 'center',
        margin: '10px 0',
    },
    sendButton: {
        alignItems: 'center',
        background: '#FF232C',
        color: '#ffffff',
        fontSize: 20,
        padding: 10,
        '&:hover': {
            backgroundColor: '#B21721',
            borderColor: '#B21721',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#B21721',
            borderColor: '#B21721',
        },
    },
    wrapImages: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginTop: 10,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    link: {
        textDecoration: 'none',
    },
}));

interface ImagesType{
    url: string
    title: string
}

interface PerformanceVideoListType{
    performanceNum: number
    itemName: string
    topImage: string
    releaseDate: string
    price: string
    paymentMethods: {[key: number]: any}
    synopsis: string
    images: {[key: number]: ImagesType}
}

const resData = {
    performance_num: 4,
    item_name: 'ゲキダン！〜テクノロジーの惑星から愛の使者がやってきた〜',
    top_image: 'https://stage-image.corich.jp/img_stage/m/910/stage_91055.png',
    release_date: '2021-05-12 03:10:33.166093',
    price: '1500',
    payment_methods: ['paypal', '振り込み'],
    synopsis: 'texttexttexttexttexttexttext',
    images: [
        {url: 'https://pics.prcm.jp/03d230127a560/84396884/jpeg/84396884_220x220.jpeg', title: 'text'},
        {url: 'https://pics.prcm.jp/53ffabcef77e1/83761991/jpeg/83761991_220x220.jpeg', title: 'text'},
        {url: 'https://pics.prcm.jp/53ffabcef77e1/83761991/jpeg/83761991_220x220.jpeg', title: 'text'},
        {url: 'https://pics.prcm.jp/53ffabcef77e1/83761991/jpeg/83761991_220x220.jpeg', title: 'text'},
    ],
}


export const Videos = () => {
    const initialState: PerformanceVideoListType = {
        performanceNum: 0, images: [], topImage: '', price: '', paymentMethods: [], synopsis: '',
        releaseDate: '', itemName: ''
    }
    const [videoListState, setVideoListState] = useState(initialState);
    useEffect(() => {
        const data: PerformanceVideoListType = changeCamelCase<PerformanceVideoListType>(resData, initialState)
        setVideoListState({...data})
    }, [])

    const {path} = useRouteMatch()
    const classes = useStyles()
    const routes = [
        {
            path: `${path}/:videoId/ticket`,
            component: VideoTicket,
        },
        {
            path: `${path}/:videoId`,
            component: Play,
        },
        {
            path: `${path}`,
            component: () => {
                return (
                    <>
                        <Box component={'h3'} className={classes.title}>Item List</Box>
                        <Box component={'h1'}>過去の公演動画</Box>
                        <Box className={classes.wrapVideoList}>
                            <Box className={classes.wrapVideoListItem}>
                                <div className={classes.performanceNum}>【劇団沸第{videoListState.performanceNum}回公演】</div>
                                <div className={classes.mainContent}>
                                    <div className={classes.topImage}>
                                        <img src={videoListState.topImage} alt={'キービジュアル'}/>
                                    </div>
                                    <div className={classes.videoList}>
                                        <List>
                                            <ListItem>
                                                <div className={classes.listItemTitle}>商品名</div>
                                                {videoListState.itemName}
                                            </ListItem>
                                            <ListItem>
                                                <div className={classes.listItemTitle}>発売日</div>
                                                {videoListState.releaseDate}
                                            </ListItem>
                                            <ListItem>
                                                <div className={classes.listItemTitle}>販売価格</div>
                                                {videoListState.price}
                                            </ListItem>
                                            <ListItem>
                                                <div className={classes.listItemTitle}>お支払い方法</div>
                                                {}
                                            </ListItem>
                                            <ListItem>
                                                <div className={classes.listItemTitle}>あらすじ</div>
                                                {videoListState.synopsis}
                                            </ListItem>
                                        </List>
                                    </div>
                                </div>
                                <div className={classes.wrapImages}>
                                    <GridList className={classes.gridList} cols={2.5}>
                                        {_.map(videoListState.images, (v: ImagesType, i) => (
                                            <GridListTile key={i}>
                                                <img src={v.url} alt={String(i)} />
                                            </GridListTile>
                                        ))}
                                    </GridList>
                                </div>
                                <div className={classes.wrapSendBtn}>
                                    <Link className={classes.link} to={`${path}/${videoListState.performanceNum}`}>
                                        <Button className={classes.sendButton}>購入画面へ {'>'}</Button>
                                    </Link>
                                </div>
                            </Box>
                        </Box>
                    </>
                )
            },
        },
    ];
    return (
        <>
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </>
    )
}