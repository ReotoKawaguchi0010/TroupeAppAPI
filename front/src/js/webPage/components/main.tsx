import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {useLocation} from "react-router-dom";

import {Header} from "js/webPage/components/header";
import {Footer} from "js/webPage/components/footer";
import { PageStoreContext } from "js/webPage/contexts/PageStoreContext"
import Twitter from "js/webPage/containers/twitter"
import AmeBlo from "js/webPage/containers/ameba_blog";
import History from "js/webPage/containers/history";
import News from "js/webPage/containers/news";
import AboutUs from "js/webPage/containers/about_us";
import {GET_ROOT_PATH} from "js/webPage/actions/action";
import {getRootPath} from "js/webPage/actions/action";
import {Loading} from "js/webPage/containers/loading";
import {create, paramObj} from "js/utils/utils";

import mainGif from "../../../images/main_gif.gif";
import {Redirect} from "react-router";


const useStyles = makeStyles((theme) => ({
    main: {
        background: '#f5f5f5',
    },
    aboutUs: {
        display: 'flex',
        [theme.breakpoints.between('xs', 'md')]: {
            display: 'block',
            textAlign: 'center',
        },
    },
    news: {
        textAlign: 'center',
    },
    blogTwt: {
        display: 'flex',
        [theme.breakpoints.between('xs', 'md')]: {
            display: 'block',
        },
    },
    blog: {
        width:'50%',
        textAlign:'center',
        [theme.breakpoints.between('xs', 'md')]: {
            width:'100%',
        },
    },
    twt: {
        width:'50%',
        textAlign:'center',
        [theme.breakpoints.between('xs', 'md')]: {
            width:'100%',
        },
    },
    history: {
        padding: '0 150px',
    },
    historyTitle: {
        textAlign: 'center',
        [theme.breakpoints.between('xs', 'md')]: {
            fontSize: '50px',
        },
    },
    typography:{
        [theme.breakpoints.between('xs', 'md')]: {
            padding: '0 25px',
        },
    },
    mainHeader: {
        height: 935,
    },
    figure: {
        margin: 0,
        position: 'relative',
    },
    img: {
        width: '100vw',
        height: '935px',
    },
    title: {
        position: 'absolute',
        top: '30%',
        width: '100%',
        color: '#ffffff',
    },
    jaTitle: {
        textAlign: 'center',
        fontSize: 105,
        lineHeight: '105px',
    },
    enTitle: {
        textAlign: 'center',
        fontSize: 26,
    },
}));


interface GetPayExec {
    exec: object
    buy: boolean
}


const GetRootContent = () => {
    const [redirectState, setRedirectState] = useState(false)
    const params = paramObj(useLocation().search)

    const getRootContent = async (isMounted: boolean) => {
        if(params.PayerID !== undefined){
            const res = await create.get('/', {
                params: params,
            })
            let data: GetPayExec = res.data
            if(data.buy){
                if(isMounted)setRedirectState(true)
            }
        }
    }

    useEffect(() => {
        let isMounted = true;
        getRootContent(isMounted)
        return () => {
            isMounted = false
        }
    }, [])


    return (
        <>
            {redirectState? <Redirect to={'/contents/video/4'} />: ''}
            <Loading />
        </>
    )
}



export const Main = () => {
    const params = paramObj(useLocation().search)
    const {state, dispatch} = useContext(PageStoreContext)
    const [mainState, setMainState] = useState({isLoading: false})
    const classes = useStyles()

    useEffect(() => {
        setMainState({...mainState, isLoading: true})
        getRootPath({type: GET_ROOT_PATH, state: state}, dispatch).then(() => {
            setMainState({...mainState, isLoading: false})
        })
    }, [])
    return (
        <>
            {params.PayerID !== undefined ? <GetRootContent /> : (
                <>
                {
                    mainState.isLoading ? <Loading /> : <></>
                }
                <Header />
                <header className={classes.mainHeader}>
                    <figure className={classes.figure}>
                        <div><img src={mainGif} alt={"mainGif"} className={classes.img} /></div>
                        <div className={classes.title}>
                            <div className={classes.jaTitle}>劇団沸</div>
                            <div className={classes.enTitle}>Futsu Theater Company</div>
                        </div>
                    </figure>
                </header>
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
            )}
        </>
    )
}