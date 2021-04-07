import React, {useContext, useEffect, useState} from "react";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import {PayPalIcon} from "js/webPage/containers/icons";
import {PageStoreContext} from "js/webPage/contexts/PageStoreContext";
import {Loading} from "js/webPage/containers/loading";
import {create} from "js/utils/utils";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            padding: '0 110px'
        },
        paypalExp: {
            display: 'flex'
        },
        nextBtn: {
            display: 'inline-block',
            borderRadius: '5px',
            background: 'red',
            width: '50px',
            textAlign: 'center',
            padding: '15px'
        },
        nextText: {
            color: 'white',
            textDecoration: 'none',
            fontSize: '20px',
        },
        title: {
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bolder',
            marginTop: '120px',
        },
        subTitle: {
            textAlign: 'center',
            margin: '20px 0',
            fontSize: '18px',
            fontWeight: 'bolder',
        },
        message: {
            textAlign: 'center',
        },
        overview: {
            border: '1px solid #e8e9eb',
            textAlign: 'center',
            width: '50%'
        },
        icon: {
            width: '50%',
        },
    })
);


export const VideoTicket = () => {
    const {state, dispatch} = useContext(PageStoreContext)
    const [ticketState, setTicketState] = useState({
        url: '',
        isLoading: false,
    })
    const classes = useStyles()

    const getPayPalPath = async () => {
        setTicketState({...ticketState, isLoading: true})
        const res = await create.get('/', {
            params: {
                video_ticket: 'true'
            },
        })
        setTicketState({...ticketState, url: res.data.url, isLoading: false})
    }

    useEffect(() => {
        getPayPalPath()
    }, [])
    return (
        <>
            {ticketState.isLoading? <Loading />: false}
            <div className={classes.body}>
                <div>
                    <div>
                        <div className={classes.title}>劇団沸改名記念公演「あの星空の匂いがする」</div>
                        <div className={classes.subTitle}>配信チケット</div>
                        <div className={classes.message}>
                            支払いは現在PayPalからのみとなっております。
                            その他の方法は<Link to='/contact'>お問い合わせ</Link>からご確認ください。
                        </div>

                        <div className={classes.paypalExp}>
                            <div>
                                <PayPalIcon className={classes.icon} />
                            </div>
                            <div className={classes.overview}>
                                <div>
                                    <div>概要</div>
                                    <div>1500円</div>
                                </div>
                                <a href={ticketState.url} className={classes.nextText}><div className={classes.nextBtn}>続行</div></a>
                            </div>
                        </div>
                        <div>取引を完了するために、PayPalのセキュリティで保護されたサーバーに移動します。</div>
                    </div>
                </div>
            </div>
        </>
    )
}