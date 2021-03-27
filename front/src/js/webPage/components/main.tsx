import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { makeStyles } from '@material-ui/core/styles';

import {Header} from "js/webPage/components/header";
import Footer from "js/webPage/components/footer";
import { PageStoreContext } from "js/webPage/contexts/PageStoreContext"
import Twitter from "js/webPage/containers/twitter"
import AmeBlo from "js/webPage/containers/ameba_blog";
import History from "js/webPage/containers/history";
import News from "js/webPage/containers/news";
import AboutUs from "js/webPage/containers/about_us";
import {GET_ROOT_PATH} from "js/webPage/actions/action";
import {getRootPath} from "js/webPage/actions/action";
import {Loading} from "js/webPage/containers/loading";


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

const MainFunc = () => {
    const {state, dispatch} = useContext(PageStoreContext)
    const [mainState, setMainState] = useState({isLoading: false})
    const classes = useStyles()

    const query = new URLSearchParams(String(useLocation().search))

    useEffect(() => {
        setMainState({...mainState, isLoading: true})
        getRootPath({type: GET_ROOT_PATH, state: state}, dispatch).then(() => {
            setMainState({...mainState, isLoading: false})
        })
    }, [])

    return (
            <>
                {
                    mainState.isLoading ? <Loading /> : <></>
                }
                <Header />
                <main className={classes.main}>
                    <div className={classes.typography}>
                        <div className={classes.aboutUs}>
                            <AboutUs />
                        </div>
                        <div className={classes.news}>
                            <News />
                        </div>
                        <div className={classes.blogTwt}>
                            <div className={classes.blog}>
                                <AmeBlo />
                            </div>
                            <div className={classes.twt}>
                                <Twitter />
                            </div>
                        </div>
                    </div>
                    <div className={classes.history}>
                        <h2 className={classes.historyTitle}>History</h2>
                       <div><History /></div>
                    </div>
                </main>
                <Footer />
            </>
        )
}

export const Main = () => {
    return (
        <React.Fragment>
            <MainFunc />
        </React.Fragment>
    )
}
