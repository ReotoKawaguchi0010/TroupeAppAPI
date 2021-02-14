import React, {useContext} from "react";
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Modal, Paper,
} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import _ from "lodash";

import {MenuIcon} from "js/webPage/components/menu";
import Footer from "js/webPage/components/footer";
import {sendContactMail} from "js/webPage/actions/action";
import {PageStoreContext} from "js/webPage/contexts/PageStoreContext";
import {Loading} from "js/webPage/containers/loading";
import {SEND_MAIL} from "js/webPage/actions/action";


const useStyles = makeStyles((theme: Theme) => ({
    wrapModal: {
        textAlign: 'center',
    },
    wrapModalPaper: {
        outline: 0,
        display: 'inline-block',
    },
    [theme.breakpoints.between('md', 'xl')]: {
        wrapForm: {
            margin: '20px',
            textAlign: 'center',
        },
        singleTextField: {
            width: '40ch'
        },
        dabbleTextField: {
            width: '20ch'
        },
        selectField: {
            width: '40ch',
        },
        selectInLabel: {},
        button: {
            textAlign: 'center'
        },
        title: {
            textAlign: 'center',
        },
        btnContent: {},
        btnIcon: {},
        menuItem: {},
    },
    [theme.breakpoints.between('sm', 'md')]: {
        wrapForm: {
            margin: '20px',
            textAlign: 'center',
        },
        singleTextField: {
            width: '40ch',
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
        dabbleTextField: {
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
        selectField: {
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
        selectInLabel: {
            fontSize: '30px',
        },
        button: {
            textAlign: 'center'
        },
        title: {
            fontSize: '50px',
            textAlign: 'center',
        },
        btnContent: {
            width: '60%',
            height: '100px',
            fontSize: '55px',
        },
        btnIcon: {
            fontSize: '55px',
        },
        menuItem: {
            '& ul':{
                height: 200,
            },
            fontSize: '40px'
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
}



const CheckModal: React.FC<ModalType> = ({onClose, formState, open}) => {
    const {state, dispatch} = useContext(PageStoreContext)
    const classes = useStyles()
    const sendMail = () => {
        sendContactMail({sendData: formState, type: SEND_MAIL, state: state}, dispatch)
    }
    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Paper className={classes.wrapModalPaper}>
                    <div>お問い合わせ内容はこちらで宜しいでしょうか？ よろしければ「送信」ボタンを押して下さい。</div>
                    <div>
                        <div>お名前</div>
                        <div>{`${formState.secondName} ${formState.firstName}`}</div>
                        <div>フリガナ</div>
                        <div>{`${formState.secondPhonetic} ${formState.firstPhonetic}`}</div>
                        <div>メールアドレス</div>
                        <div>{formState.mailAddress}</div>
                        <div>住所</div>
                        <div>{`${formState.address} ${formState.cities} ${formState.houseNumber}`}</div>
                        <div>職業</div>
                        <div>{formState.profession}</div>
                        <div>その他</div>
                        <div>{formState.textArea}</div>
                    </div>
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<SendIcon className={classes.btnIcon}/>}
                        className={classes.btnContent}
                        onClick={sendMail}
                    >
                       送信
                    </Button>
                </Paper>
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
    const {state, dispatch} = useContext(PageStoreContext)
    const classes = useStyles()
    const [contactState, setContactState] = React.useState({
        isLoading: false,
    })
    const [formState, setFormState] = React.useState(initialFormState)
    const [openState, setOpenState] = React.useState(false)

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

    const sendMail = () => {
        setContactState({...contactState, isLoading: true})
        sendContactMail({sendData: formState, type: SEND_MAIL, state: state}, dispatch).then(() => {
            setContactState({...contactState ,isLoading: false})
        })
        setContactState({...contactState, isLoading: false})
        setFormState(initialFormState)
    }

    return (
        <React.Fragment>
            {
                contactState.isLoading ? <Loading /> : <></>
            }
            <CheckModal onClose={handleClose} open={openState} formState={formState} />
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

