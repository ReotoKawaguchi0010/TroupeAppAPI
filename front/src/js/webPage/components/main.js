import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router";


import { test } from "../actions/action"
import Twitter from "../containers/twitter"
import AmeBlo from "../containers/ameba_blog";
import History from "../containers/history";
import News from "../containers/news";
import AboutUs from "../containers/about_us";
import {connect} from "react-redux";
import MenuIcon from "./menu";
import {paramObj} from "../../utils/utils";
import { Video } from "../containers/video";
import {VideoTicket} from "../containers/video_ticket";
import {VideoTicketDone} from "../containers/ticket_done";


const pcStyles = {
    main: {
        background: '#f5f5f5',
    },
    aboutUs: {
        display: 'flex',
    },
    news: {
        marginLeft: 'calc(50% - 1.5em * 4)',
    },
    blogTwt: {
        display: 'flex',
    },
    blog: {
        width:'50%',
        textAlign:'center',
    },
    twt: {
        width:'50%',
        textAlign:'center',
    },
    history: {
        padding: '0 150px',
    },
    historyTitle: {
        textAlign: 'center',
    },
    typography:{},
    videoTicket: {
        title: {
            textAlign: 'center',
        }
    },
}

const mobStyles = {
    main: {
        background: '#f5f5f5',
    },
    aboutUs: {
        display: 'block',
        textAlign: 'center',
    },
    news: {
        marginLeft: '0',
        textAlign: 'center',
    },
    blogTwt: {
        display: 'block',
    },
    blog: {
        width:'100%',
        textAlign:'center',
    },
    twt: {
        width:'100%',
        textAlign:'center',
    },
    history: {
        padding: '0 150px',
    },
    historyTitle: {
        fontSize: '50px',
        textAlign: 'center',
    },
    typography:{
        padding: '0 25px'
    },
    videoTicket: {
        title: {
            textAlign: 'center',
        }
    },
}

const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: pcStyles,
    [theme.breakpoints.between('xs', 'md')]: mobStyles,
}));

function MainFunc(props){
    const classes = useStyles()
    const searchObj = paramObj(location.search)
    if (searchObj.video_ticket){
        return (<React.Fragment><VideoTicket data={props.data} /><Footer /></React.Fragment>)
    }else if(searchObj.paymentId){
        return (<React.Fragment><VideoTicketDone /></React.Fragment>)
    }else if(searchObj.videoId){
        return (<React.Fragment><Video data={props.data} /></React.Fragment>)
    }else{
        return (
            <React.Fragment>
                <Header />
            <main className={classes.main}>
                    <div className={classes.typography}>
                        <div className={classes.aboutUs}>
                            <AboutUs />
                        </div>
                        <div className={classes.news}>
                            <News data={props.data.texts} />
                        </div>
                        <div className={classes.blogTwt}>
                            <div className={classes.blog}>
                                <AmeBlo data={props.data.texts} />
                            </div>
                            <div className={classes.twt}>
                                <Twitter data={props.data.texts} />
                            </div>
                        </div>
                    </div>
                    <div className={classes.history}>
                        <h2 className={classes.historyTitle}>History</h2>
                       <div><History /></div>
                    </div>
                </main>
                <Footer />
            </React.Fragment>
        )
    }

}


class Main extends React.Component{
    componentDidMount() {
        if(!Object.keys(this.props.data).length){
            this.props.test()
        }
    }

    render(){
        return (
            <React.Fragment>
                <MainFunc data={this.props.data} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {data: state.http}
}

const mapDispatchToProps = ({ test })

export default connect(mapStateToProps, mapDispatchToProps)(Main)