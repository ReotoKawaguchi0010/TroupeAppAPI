import React from "react";
import { Avatar, Paper } from "@material-ui/core";
import _ from "lodash";
import { makeStyles } from '@material-ui/core/styles';

import Footer from "../components/footer";
import MenuIcon from "../components/menu"
import Tatsuya from "../../../../images/members/takayuki_square_image.jpg"
import Dai from "../../../../images/members/dai_square_image.jpg"
import Hayate from "../../../../images/members/hayate_saito_square_image.jpg"
import Reoto from "../../../../images/members/reoto_kawaguchi_square_image.jpg"
import Ritsu from "../../../../images/members/ritsu_alkanuma_square_image.jpg"
import Rie from "../../../../images/members/rie_square_image.jpg"
import Sayaka from "../../../../images/members/sayaka_kanzaki_square_image.jpg"
import Yukako from "../../../../images/members/yukako_yasuda_square_image.jpg"

const members = {
    'akanuma': {
        id: 1,
        name: '赤沼 律',
        message: '',
        image: Ritsu,
    },
    'kawaguchi': {
        id: 2,
        name: '河口 怜和人',
        message: '',
        image: Reoto,
    },
    'kanzaki': {
        id: 3,
        name: '神崎 沙耶加',
        message: '',
        image: Sayaka,
    },
    'saito': {
        id: 4,
        name: '斉藤 颯',
        message: '',
        image: Hayate,
    },
    'dai': {
        id: 5,
        name: 'ダイ',
        message: '',
        image: Dai,
    },
    'narimiya': {
        id: 6,
        name: '城月 まこ',
        message: '',
        image: '',
    },
    'yasuda': {
        id: 7,
        name: '安田 有香子',
        message: '',
        image: Yukako,
    },
    'yamamoto': {
        id: 8,
        name: '山本 竜也',
        message: '',
        image: Tatsuya,
    },
    'rie': {
        id: 9,
        name: 'ライ',
        message: '',
        image: Rie,
    },
    'wada': {
        id: 10,
        name: '和田 拓省',
        message: '',
        image: '',
    },
}

const pcStyle = {
    memberContent: {
        display: 'flex',
        padding: '10px',
        borderBottom: 'solid 1px #000000',
    },
    avatarStyle: {
        width: 100,
        height: 100,
    },
    wrapMember: {
        background: '#f5f5f5',
    },
    memberTitle: {
        textAlign: 'center',
        height: '150px',
    },
    memberList: {
        padding: '0 300px',
    },
    name: {},
    message: {},
}

const mobStyle = {
    memberContent: {
        display: 'flex',
        padding: '10px',
        borderBottom: 'solid 1px #000000',
    },
    avatarStyle: {
        width: '30%',
        height: 'auto',
    },
    wrapMember: {
        background: '#f5f5f5',
    },
    memberTitle: {
        fontSize: '50px',
        textAlign: 'center',
    },
    memberList: {
        padding: '0 65px',
    },
    name: {
        fontSize: '40px',
        fontWeight: 'bold',
    },
    message: {
        fontSize: '25px',
    },
}

const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: pcStyle,
    [theme.breakpoints.between('sm', 'md')]: mobStyle,
}));

const MemberList = () =>{
    const classes = useStyles()
    return _.map(members, member => (
        <div key={member.id} className={classes.memberContent}>
            <Avatar alt="tatsuya" src={member.image} className={classes.avatarStyle} />
            <div>
                <div className={classes.name}>{member.name}</div>
                <div className={classes.message}>{member.message}</div>
            </div>
        </div>
    ))
}

function MemberFunc(){
    const classes = useStyles();
    return (
        <div className={classes.wrapMember}>
            <MenuIcon />
            <div style={{padding: 100}}>
                <h3 className={classes.memberTitle}>MEMBER</h3>
                <div className={classes.memberList}>
                    <Paper elevation={3}>
                        { MemberList() }
                    </Paper>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default class Member extends React.Component{
    render(){
        return (
            <React.Fragment>
                <MemberFunc />
            </React.Fragment>
        )
    }
}