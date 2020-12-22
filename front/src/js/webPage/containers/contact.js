import React from "react";
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    CircularProgress,
    Modal,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import _ from "lodash";
import axios from "axios";

import MenuIcon from "../components/menu";
import Footer from "../components/footer";
import { API_PATH } from "../configs/config";
import {create} from "../actions/action";

const japanCity = ['北海道', '青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県',
    '福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県',
    '香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'];

const pcStyles = (theme) => ({
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
})

const mobStyles = (theme) => ({
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
})

const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: pcStyles(theme),
    [theme.breakpoints.between('sm', 'md')]: mobStyles(theme),
}));

let formObj = {
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
    return _.map(japanCity, (value, key) => (
        <MenuItem key={`city${key}`} value={value} className={classes.menuItem}>{value}</MenuItem>
    ))
}

const Loading = (bool) =>{
    if(bool.bool){
        return (
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={bool.bool}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
            >
                <div><CircularProgress /></div>
            </Modal>
        )
    }else{
        return '';
    }
}

const Contact = () => {
    const classes = useStyles()
    const [state, setState] = React.useState({city: '', isLoading: false, formObj: formObj})

    const selectChange = (e) =>{
        const city = e.target.value
        formObj.address = city;
        setState({...state, city: city, formObj: formObj})
    }

    const sendMail = () =>{
        const create = axios.create({
            baseURL: API_PATH,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
        });
        setState({...state, isLoading: true})
        create.post('/mail', state.formObj)

    }

    const inTextChange = (e) => {
        let targetId = e.target.id
        formObj[targetId] = e.target.value
        setState({...state, formObj: formObj})
    }

    return(
        <React.Fragment>
            <Loading bool={state.isLoading} />
            <div className="contact">
                <MenuIcon />
                <div style={{padding: 100}}>
                    <h3 className={classes.title}>CONTACT</h3>
                    <form>
                        <div className={classes.wrapForm}>
                            <TextField id="secondName" label="性" variant="outlined" className={classes.dabbleTextField} onChange={inTextChange} />
                            <TextField id="firstName" label="名" variant="outlined" className={classes.dabbleTextField} onChange={inTextChange} />
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="secondPhonetic" label="セイ" variant="outlined" className={classes.dabbleTextField} onChange={inTextChange} />
                            <TextField id="firstPhonetic" label="メイ" variant="outlined" className={classes.dabbleTextField} onChange={inTextChange} />
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="mailAddress" label="メールアドレス" variant="outlined" className={classes.singleTextField} onChange={inTextChange} />
                        </div>
                        <div className={classes.wrapForm}>
                            <FormControl variant="outlined">
                                <InputLabel id="address-place" className={classes.selectInLabel}>都道府県</InputLabel>
                                <Select id="address" label="都道府県" labelId="address-place" className={classes.selectField} value={state.city} onChange={selectChange}>
                                    { renderJapanCity() }
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="cities" label="市区町村" variant="outlined" className={classes.singleTextField} onChange={inTextChange} />
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="houseNumber" label="番地・建物名" variant="outlined" className={classes.singleTextField} onChange={inTextChange} />
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="profession" label="職業" variant="outlined" className={classes.singleTextField} onChange={inTextChange} />
                        </div>
                        <div className={classes.wrapForm}>
                            <TextField id="textArea" label="その他お問い合わせ" variant="outlined" multiline rowsMax={5} rows={5} className={classes.singleTextField} onChange={inTextChange} />
                        </div>
                        <div className={classes.button}>
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<SendIcon className={classes.btnIcon} />}
                                className={classes.btnContent}
                                onClick={sendMail}
                            >
                                送信
                            </Button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default Contact