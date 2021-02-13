import React, {useContext} from "react";
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
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

let formObj: any = {
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
    const [contactState, setContactState] = React.useState({city: '', isLoading: false, formObj: formObj})

    const selectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const city: any = e.target.value
        formObj.address = city;
        setContactState({...contactState, city: city, formObj: formObj})
    }

    const sendMail = () => {
        setContactState({...contactState, isLoading: true})
        sendContactMail({sendData: contactState.formObj, type: SEND_MAIL, state: state}, dispatch).then(() => {
            setContactState({...contactState ,isLoading: false})
        })
    }

    const inTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let targetId: string = e.target.id
        formObj[targetId] = e.target.value
        setContactState({...contactState, formObj: formObj})
    }

    return (
        <React.Fragment>
            {
                contactState.isLoading ? <Loading /> : <></>
            }
            <div className="contact">
                <MenuIcon/>
                <div style={{padding: 100}}>
                    <h3 className={classes.title}>CONTACT</h3>
                    <form>
                        <div className={classes.wrapForm}>
                            <TextField id="secondName" label="性" variant="outlined" className={classes.dabbleTextField}
                                       onChange={inTextChange}/>
                            <TextField id="firstName" label="名" variant="outlined" className={classes.dabbleTextField}
                                       onChange={inTextChange}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="secondPhonetic" label="セイ" variant="outlined"
                                       className={classes.dabbleTextField} onChange={inTextChange}/>
                            <TextField id="firstPhonetic" label="メイ" variant="outlined"
                                       className={classes.dabbleTextField} onChange={inTextChange}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="mailAddress" label="メールアドレス" variant="outlined"
                                       className={classes.singleTextField} onChange={inTextChange}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <FormControl variant="outlined">
                                <InputLabel id="address-place" className={classes.selectInLabel}>都道府県</InputLabel>
                                <Select id="address" label="都道府県" labelId="address-place"
                                        className={classes.selectField} value={contactState.city} onChange={selectChange} >
                                    {renderJapanCity()}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="cities" label="市区町村" variant="outlined" className={classes.singleTextField}
                                       onChange={inTextChange}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="houseNumber" label="番地・建物名" variant="outlined"
                                       className={classes.singleTextField} onChange={inTextChange}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="profession" label="職業" variant="outlined" className={classes.singleTextField}
                                       onChange={inTextChange}/>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="textArea" label="その他お問い合わせ" variant="outlined" multiline rowsMax={5} rows={5}
                                       className={classes.singleTextField} onChange={inTextChange}/>
                        </div>
                        <div className={classes.button}>
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<SendIcon className={classes.btnIcon}/>}
                                className={classes.btnContent}
                                onClick={sendMail}
                            >
                                送信
                            </Button>
                        </div>
                    </form>
                </div>
                <Footer/>
            </div>
        </React.Fragment>
    )
}

