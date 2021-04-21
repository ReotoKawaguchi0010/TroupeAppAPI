import React, {useContext, useEffect, useState} from "react";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import _ from "lodash";


import {PayPalIcon} from "js/webPage/containers/icons";
import {PageStoreContext} from "js/webPage/contexts/PageStoreContext";
import {Loading} from "js/webPage/containers/loading";
import {create} from "js/utils/utils";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {preventDefault} from "@fullcalendar/react";


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
        wrapForm: {
            margin: '20px',
            textAlign: 'center',
        },
        singleTextField: {
            width: '40ch',
            [theme.breakpoints.between('sm', 'md')]: {
                fontSize: '25px',
                margin: theme.spacing(1),
                '& label':{
                    transform: 'translate(10px, 10px) scale(2)'
                },
                '& legend':{
                    fontSize: '2em',
                },
                '& textarea':{
                    fontSize: '50px',
                },
                '& input':{
                    fontSize: '50px',
                },
                '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                    transform: 'translate(10px, -15px) scale(2)'
                },
            },
        },
        selectInLabel: {
            [theme.breakpoints.between('sm', 'md')]: {
                fontSize: '30px',
            },
        },
        selectField: {
            [theme.breakpoints.between('md', 'xl')]: {
                width: '40ch',
            },
            [theme.breakpoints.between('sm', 'md')]: {
                fontSize: '40px',
                width: '20ch',
                margin: theme.spacing(1),
                '& legend':{
                    fontSize: '0.5em',
                },
                '& input':{
                    fontSize: '50px',
                },
                '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                    transform: 'translate(10px, -15px) scale(2)'
                },
            },
        },
        sendBtn: {
            textAlign: 'center',
            '& a': {
                textDecoration: 'none',
                color: 'initial',
            },
            '& svg': {
                width: '10%',
            }
        }
    })
);


interface ResBuyTicketType {
    payment: string
    redirect: boolean
}

export const VideoTicket = () => {
    const {state, dispatch} = useContext(PageStoreContext)
    const [ticketState, setTicketState] = useState({
        url: '',
        isLoading: false,
    })
    const [userState, setUserState] = useState({
        type: 'buy_video_ticket',
        name: '',
        mailAddress: '',
        payment: '',

    })
    const [paymentState, setPaymentState] = useState('')
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


    const sendBuyTicket = async (e: any) => {
        if(hasAllUserState()){
            let sendData = {
                type: userState.type,
                name: userState.name,
                mail_address: userState.mailAddress,
                payment: userState.payment,
            }
            const res = await create.post('/', sendData)
            const data: ResBuyTicketType = res.data
            return true
        }
        return e.preventDefault()
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
                            <div>
                                <div className={classes.wrapForm}>
                                    <TextField name={'name'} label="お名前" variant="outlined" className={classes.singleTextField}
                                               onChange={handleTextChange}  />
                                </div>

                            </div>
                            <div>
                                <div className={classes.wrapForm}>
                                    <TextField name={'mailAddress'} label="メールアドレス" variant="outlined" className={classes.singleTextField}
                                               onChange={handleTextChange}  />
                                </div>
                            </div>
                            <div>
                                <div className={classes.wrapForm}>
                                    <FormControl variant="outlined">
                                        <InputLabel id="address-place" className={classes.selectInLabel}>支払い方法</InputLabel>
                                        <Select name={'payment'} onChange={handleTextChange} value={userState.payment} className={classes.selectField}>
                                            <MenuItem value={'PayPal'}>PayPal</MenuItem>
                                            <MenuItem value={'振り込み'}>振り込み</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            {
                                userState.payment === 'PayPal' ? (
                                    <div className={classes.sendBtn}>
                                        <Button onClick={sendBuyTicket}>
                                            <a href={ticketState.url}>決定</a>
                                        </Button>
                                        <div>取引を完了するために、PayPalのセキュリティで保護されたサーバーに移動します。</div>
                                        <div><PayPalIcon /></div>
                                    </div>
                                ) : (
                                    <div className={classes.sendBtn}>
                                        <Button onClick={sendBuyTicket}>
                                            決定
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}