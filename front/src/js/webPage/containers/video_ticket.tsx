import React, {useContext, useEffect, useState} from "react";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import _ from "lodash";


import {PayPalIcon} from "js/webPage/containers/icons";
import {PageStoreContext} from "js/webPage/contexts/PageStoreContext";
import {Loading} from "js/webPage/containers/loading";
import {create} from "js/utils/utils";
import {Button, FormControl, MenuItem, Select, TextField} from "@material-ui/core";


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
    const [userState, setUserState] = useState({
        name: '',
        mailAddress: '',
        payment: '',

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

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'name':
                setUserState({...userState, name: e.target.value})
                break
            case 'mailAddress':
                setUserState({...userState, mailAddress: e.target.value})
                break
            case 'payment':
                setUserState({...userState, payment: e.target.value})
                break
        }
    }

    const hasAllUserState = () => {
        let all = true
       _.map(userState, (v) => {
            if(v === ''){
                all = false
            }
        })
        return all
    }


    const sendBuyTicket = async () => {
        if(hasAllUserState()){
            const res = await create.post('/', userState)
            console.log(res)
        }
    }
    return (
        <>
            {ticketState.isLoading? <Loading />: false}
            <div className={classes.body}>
                <div>
                    <div>
                        <div className={classes.title}>劇団沸第4回公演「ゲキダン！」</div>
                        <div className={classes.subTitle}>配信チケット</div>

                        <div>
                            <div>お名前<TextField name={'name'} onChange={handleTextChange} /></div>
                            <div>メールアドレス<TextField name={'mailAddress'} onChange={handleTextChange} /></div>
                            <div>
                                <FormControl variant="outlined">
                                    <Select name={'payment'} onChange={handleTextChange} value={userState.payment}>
                                        <MenuItem value={'PayPal'}>PayPal</MenuItem>
                                        <MenuItem value={'振り込み'}>振り込み</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <Button onClick={sendBuyTicket}>決定</Button>
                            </div>
                        </div>
                        <div>取引を完了するために、PayPalのセキュリティで保護されたサーバーに移動します。</div>
                    </div>
                </div>
            </div>
        </>
    )
}