import React, {useState} from "react";
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Modal, Paper, Snackbar
} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import _ from "lodash";

import {MenuIcon} from "js/webPage/components/menu";
import Footer from "js/webPage/components/footer";
import {Loading} from "js/webPage/containers/loading";
import {create} from "js/utils/utils";


const useStyles = makeStyles((theme: Theme) => ({
    wrapModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapPaper: {
        textAlign: 'center',
        outline: 0,
    },
    wrapModalPaper: {
        display: 'inline-block',
        textAlign: 'center',
        outline: 0,
        padding: 20,
        '& div': {
            margin: '10px 0'
        },
        [theme.breakpoints.between('sm', 'md')]: {
            display: 'block',
            '& div': {
                fontSize: 40,
                margin: '10px 0',
            },
        },
    },
    contentSpace: {
        border: 'solid 1px #000000',
        borderRadius: 10,
    },
    wrapForm: {
        margin: '20px',
        textAlign: 'center',
    },
    modalInBtn: {
        [theme.breakpoints.between('sm', 'md')]: {
            width: '40%',
            height: '100px',
            fontSize: '55px',
        },
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
    dabbleTextField: {
        [theme.breakpoints.between('md', 'xl')]: {
             width: '20ch',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            width: '50ch',
            margin: theme.spacing(1),
            '& label':{
                transform: 'translate(10px, 10px) scale(2)'
            },
            '& legend':{
                fontSize: '2em',
            },
            '& input':{
                fontSize: '50px',
            },
            '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                transform: 'translate(10px, -15px) scale(2)'
            },
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
    selectInLabel: {
        [theme.breakpoints.between('sm', 'md')]: {
            fontSize: '30px',
        },
    },
    button: {
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
        [theme.breakpoints.between('sm', 'md')]: {
            fontSize: '50px',
        },
    },
    btnContent: {
        [theme.breakpoints.between('sm', 'md')]: {
            width: '60%',
            height: '100px',
            fontSize: '55px',
        },
    },
    btnIcon: {
        [theme.breakpoints.between('sm', 'md')]: {
            fontSize: '55px',
        },
    },
    menuItem: {
        [theme.breakpoints.between('sm', 'md')]: {
            '& ul':{
                height: 200,
            },
            fontSize: '40px'
        },
    },
    snackbarChild: {
        background: 'rgb(237, 247, 237)',
        [theme.breakpoints.between('sm', 'md')]: {
            fontSize: 40,
        },
    },
}));

interface SendFormType {
    content: string
    firstName: string
    secondName: string
    firstPhonetic: string
    secondPhonetic: string
    mailAddress: string
    address: string
    cities: string
    houseNumber: string
    profession: string
    textArea: string
}


interface ModalType {
    onClose: () => void
    formState: SendFormType
    open: boolean
    sendFunc: () => void
}



const CheckModal: React.FC<ModalType> = ({onClose, formState, open, sendFunc}) => {
    const classes = useStyles()
    return (
        <>
            <Modal open={open} onClose={onClose}>
                <div className={classes.wrapPaper}>
                    <Paper className={classes.wrapModalPaper}>
                        <div>お問い合わせ内容はこちらで宜しいでしょうか？ よろしければ「送信」ボタンを押して下さい。</div>
                        <div>
                            <div className={classes.contentSpace}>
                                <div>お名前</div>
                                <div>{`${formState.secondName} ${formState.firstName}`}</div>
                            </div>
                            <div className={classes.contentSpace}>
                                <div>フリガナ</div>
                                <div>{`${formState.secondPhonetic} ${formState.firstPhonetic}`}</div>
                            </div>
                            <div className={classes.contentSpace}>
                                <div>メールアドレス</div>
                                <div>{formState.mailAddress}</div>
                            </div>
                            <div className={classes.contentSpace}>
                                <div>住所</div>
                                <div>{`${formState.address} ${formState.cities} ${formState.houseNumber}`}</div>
                            </div>
                            <div className={classes.contentSpace}>
                                <div>職業</div>
                                <div>{formState.profession}</div>
                            </div>
                            <div className={classes.contentSpace}>
                                <div>その他</div>
                                <div>{formState.textArea}</div>
                            </div>
                        </div>
                        <div>
                            <Button onClick={onClose} className={classes.modalInBtn}>
                                キャンセル
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<SendIcon className={classes.btnIcon}/>}
                                className={classes.modalInBtn}
                                onClick={sendFunc}
                            >
                               送信
                            </Button>
                        </div>
                    </Paper>
                </div>
            </Modal>
        </>
    )
}


const initialFormState: any = {
    content: 'お問い合わせ',
    firstName: '',
    secondName: '',
    firstPhonetic: '',
    secondPhonetic: '',
    mailAddress: '',
    address: '',
    cities: '',
    houseNumber: '',
    profession: '',
    textArea: '',
}

const renderJapanCity = () =>{
    const classes = useStyles()
    const japanCity = ['北海道', '青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県',
    '福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県',
    '香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'];
    return _.map(japanCity, (value, key) => (
        <MenuItem key={`city${key}`} value={value} className={classes.menuItem}>{value}</MenuItem>
    ))
}

export const Contact = () => {
    const classes = useStyles()
    const [contactState, setContactState] = useState({
        bool: false,
        status: 0,
        isLoading: false,
    })
    const [formState, setFormState] = useState(initialFormState)
    const [openState, setOpenState] = useState(false)
    const [barOpenState, setBarOpenState] = useState(false)


    const inTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string = e.target.value
        switch (e.target.name) {
            case 'secondName':
                setFormState({...formState, secondName: value})
                break
            case 'firstName':
                setFormState({...formState, firstName: value})
                break
            case 'secondPhonetic':
                setFormState({...formState, secondPhonetic: value})
                break
            case 'firstPhonetic':
                setFormState({...formState, firstPhonetic: value})
                break
            case 'mailAddress':
                setFormState({...formState, mailAddress: value})
                break
            case 'address':
                setFormState({...formState, address: value})
                break
            case 'cities':
                setFormState({...formState, cities: value})
                break
            case 'houseNumber':
                setFormState({...formState, houseNumber: value})
                break
            case 'profession':
                setFormState({...formState, profession: value})
                break
            case 'textArea':
                setFormState({...formState, textArea: value})
                break
            default:
                break
        }
    }


    const handleSendBtnClick = () => {
        setOpenState(true)
    }

    const handleClose = () => {
        setOpenState(false)
    }

    const sendFunc = async () => {
        setContactState({...contactState, isLoading: true})
        const res = await create.post('/mail', formState)
        if(res){
            setContactState({...contactState, isLoading: false})
            res.data.bool === 'true' ? setBarOpenState(true) : setBarOpenState(false)
        }
        setFormState(initialFormState)
        setOpenState(false)
    }

    const handleClearBtnClick = () => {
        setBarOpenState(false)
    }

    return (
        <React.Fragment>
            {
                contactState.isLoading ? <Loading /> : <></>
            }
            <Snackbar open={barOpenState} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <div className={classes.snackbarChild}>
                    送信が完了しました。今しばらくお待ちください
                    <Button onClick={handleClearBtnClick}><ClearIcon /></Button>
                </div>
            </Snackbar>
            <CheckModal onClose={handleClose} open={openState} formState={formState} sendFunc={sendFunc} />
            <div className="contact">
                <MenuIcon/>
                <div style={{padding: 100}}>
                    <h3 className={classes.title}>CONTACT</h3>
                    <form>
                        <div className={classes.wrapForm}>
                            <TextField name="secondName" label="性" variant="outlined" className={classes.dabbleTextField}
                                       onChange={inTextChange} value={formState.secondName} />
                            <TextField name="firstName" label="名" variant="outlined" className={classes.dabbleTextField}
                                       onChange={inTextChange} value={formState.firstName}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField name="secondPhonetic" label="セイ" variant="outlined" className={classes.dabbleTextField}
                                       onChange={inTextChange} value={formState.secondPhonetic}/>
                            <TextField name="firstPhonetic" label="メイ" variant="outlined" className={classes.dabbleTextField}
                                       onChange={inTextChange} value={formState.firstPhonetic}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField name="mailAddress" label="メールアドレス" variant="outlined" className={classes.singleTextField}
                                       onChange={inTextChange} value={formState.mailAddress}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <FormControl variant="outlined">
                                <InputLabel id="address-place" className={classes.selectInLabel}>都道府県</InputLabel>
                                <Select name="address" label="都道府県" labelId="address-place"
                                        className={classes.selectField} value={formState.address} onChange={inTextChange} >
                                    {renderJapanCity()}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField name="cities" label="市区町村" variant="outlined" className={classes.singleTextField}
                                       onChange={inTextChange} value={formState.cities}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField name="houseNumber" label="番地・建物名" variant="outlined" className={classes.singleTextField}
                                       onChange={inTextChange} value={formState.houseNumber}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField name="profession" label="職業" variant="outlined" className={classes.singleTextField}
                                       onChange={inTextChange} value={formState.profession}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField name="textArea" label="その他お問い合わせ" variant="outlined" multiline rowsMax={5} rows={5}
                                       className={classes.singleTextField} onChange={inTextChange} value={formState.textArea}/>
                        </div>
                        <div className={classes.button}>
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<SendIcon className={classes.btnIcon}/>}
                                className={classes.btnContent}
                                onClick={handleSendBtnClick}
                            >
                                確認画面
                            </Button>
                        </div>
                    </form>
                </div>
                <Footer/>
            </div>
        </React.Fragment>
    )
}