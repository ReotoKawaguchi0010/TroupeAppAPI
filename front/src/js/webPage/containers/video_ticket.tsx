import React, {useContext, useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField, Box} from "@material-ui/core";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import {useRouteMatch, useHistory} from "react-router";
import { Link } from "react-router-dom";
import _ from "lodash";

import {PayPalIcon} from "js/webPage/containers/icons";
import {PageStoreContext} from "js/webPage/contexts/PageStoreContext";
import {Loading} from "js/webPage/containers/loading";
import {create, changeCamelCase, changeSnakeCase} from "js/utils/utils";


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

interface PayerType{
    paymentMethod: string
    firstName: string
    secondName: string
    kanaFirstName: string
    kanaSecondName: string
    mailAddress: string
    phoneNumber: string
}

interface PayerTransientInfoType{
    type: string
    payer: PayerType
}

const StepOne = () => {
    const {state, dispatch} = useContext(PageStoreContext)
    const userInitialState: PayerTransientInfoType = {
        type: 'payer_transient_info',
        payer: {
            paymentMethod: '',
            firstName: '',
            secondName: '',
            kanaFirstName: '',
            kanaSecondName: '',
            mailAddress: '',
            phoneNumber: '',
        },
    }
    const [userState, setUserState] = useState(userInitialState)
    const classes = useStyles()

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let payer: PayerType = userState.payer
        switch (e.target.name) {
            case 'name':
                payer = {...payer, firstName: e.target.value}
                setUserState({...userState, payer: payer})
                break
            case 'mailAddress':
                payer = {...payer, mailAddress: e.target.value}
                setUserState({...userState, payer: payer})
                break
            case 'paymentMethod':
                payer = {...payer, paymentMethod: e.target.value}
                setUserState({...userState, payer: payer})
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
            const res = await create.post('/', changeSnakeCase(userState))
            console.log(res)
            return true
        }
        return e.preventDefault()
    }

    return (
        <div className={classes.body}>
            <div className={classes.title}>劇団沸第4回公演「ゲキダン！」</div>
            <div className={classes.subTitle}>配信チケット</div>

            <div>
                <div>
                    <div className={classes.wrapForm}>
                        <TextField
                            name={'name'}
                            label="お名前"
                            variant="outlined"
                            className={classes.singleTextField}
                            onChange={handleTextChange}
                        />
                    </div>
                </div>

                <div>
                    <div className={classes.wrapForm}>
                        <TextField
                            name={'name'}
                            label="お名前"
                            variant="outlined"
                            className={classes.singleTextField}
                            onChange={handleTextChange}
                        />
                    </div>
                </div>

                <div>
                    <div className={classes.wrapForm}>
                        <TextField
                            name={'mailAddress'}
                            label="メールアドレス"
                            variant="outlined"
                            className={classes.singleTextField}
                            onChange={handleTextChange}
                        />
                    </div>
                </div>

                <div>
                    <div className={classes.wrapForm}>
                        <FormControl variant="outlined">
                            <InputLabel id="address-place" className={classes.selectInLabel}>
                                支払い方法
                            </InputLabel>
                            <Select
                                name={'payment'}
                                onChange={handleTextChange}
                                value={userState.payer.paymentMethod}
                                className={classes.selectField}
                            >
                                <MenuItem value={'PayPal'}>PayPal</MenuItem>
                                <MenuItem value={'振り込み'}>振り込み</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StepTwo = () => {
    const [ticketState, setTicketState] = useState({
        url: '',
        isLoading: false,
    })

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
            test
            {/*{ticketState.isLoading? <Loading />: false}*/}

        </>
    )
}

const StepThree = () => {
    return (
        <>

        </>
    )
}

export const VideoTicket = () => {
    const maxStep = 2;
    const [activeStep, setActiveStep] = React.useState(0);
    const history = useHistory()

    const handleNext = () => {
        if(activeStep >= 0 && activeStep <= maxStep) setActiveStep(activeStep+1)
    }

    const handleBack = () => {
        if(activeStep >= 0 && activeStep <= maxStep) setActiveStep(activeStep-1)
    }

    const handleCancel = () => {
        history.push('/contents/video')
    }

    const StepComponent = () => {
        switch (activeStep){
            case 0:
                return <StepOne />
            case 1:
                return <StepTwo />
            case 2:
                return <StepThree />
            default:
                return <StepOne />
        }
    }

    return (
        <>
            <div>ticket</div>
            <Box>
                <StepComponent />
            </Box>
            <Box>
                <Button onClick={handleBack}>前の画面</Button>
                <Button onClick={handleNext}>次の画面</Button>
                <Button onClick={handleCancel}>キャンセル</Button>
            </Box>
        </>
    )
}