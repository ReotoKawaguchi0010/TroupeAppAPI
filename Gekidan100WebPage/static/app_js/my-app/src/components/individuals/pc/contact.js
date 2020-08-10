import React from "react";
import {ajax} from "../../action";
import {connect} from "react-redux";

let formObj = {
    'content': '',
    'firstName': '',
    'secondName': '',
    'firstPhonetic': '',
    'secondPhonetic': '',
    'mailAddress': '',
    'address': '',
    'cities': '',
    'houseNumber': '',
    'profession': '',
    'textArea': '',
}

class Contact extends React.Component {
    render() {
        let props = this.props
        const content = (event) => formObj.content = event.currentTarget.value
        const firstName = (event) => formObj.firstName = event.currentTarget.value
        const secondName = (event) => formObj.secondName = event.currentTarget.value
        const firstPhonetic = (event) => formObj.firstPhonetic = event.currentTarget.value
        const secondPhonetic = (event) => formObj.secondPhonetic = event.currentTarget.value
        const mailAddress = (event) => formObj.mailAddress = event.currentTarget.value
        const address = (event) => formObj.address = event.currentTarget.value
        const cities = (event) => formObj.cities = event.currentTarget.value
        const houseNumber = (event) => formObj.houseNumber = event.currentTarget.value
        const profession = (event) => formObj.profession = event.currentTarget.value
        const textArea = (event) => formObj.textArea = event.currentTarget.value
        const ajaxSend = () => {
            props.ajax(formObj)
        }
        return (
            <React.Fragment>
                <div className="wrap-form">
                    <h1>CONTACT</h1>
                    <div className="form-group">
                        <label>お問い合わせ内容</label>
                        <div>
                            <label><input type="radio" name="content" onChange={content} value="お問い合わせ" />お問い合わせ</label>
                            <label><input type="radio" name="content" onChange={content} value="入団希望" />入団希望</label>
                        </div>
                    </div>
                    <div className="form-group" id="nameId">
                        <label>お名前</label>
                        <div>性<input type="text" className="form-control" onChange={secondName} />名<input type="text" className="form-control" onChange={firstName} /></div>
                    </div>
                    <div className="form-group" id="furiganaId">
                        <label>フリガナ</label>
                        <div>セイ<input type="text" className="form-control" onChange={secondPhonetic} />メイ<input type="text" className="form-control" onChange={firstPhonetic} /></div>
                    </div>
                    <div className="form-group" id="mailAddress">
                        <label>メールアドレス</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" onChange={mailAddress} />
                    </div>
                    <div className="form-group" id="">
                        <div>
                            ご住所</div>
                            <select className="form-control" onChange={address}>
                                <option value=""></option>
                                <option value="北海道">北海道</option>
                                <option value="青森県">青森県</option>
                                <option value="岩手県">岩手県</option>
                                <option value="宮城県">宮城県</option>
                                <option value="秋田県">秋田県</option>
                                <option value="山形県">山形県</option>
                                <option value="福島県">福島県</option>
                                <option value="茨城県">茨城県</option>
                                <option value="栃木県">栃木県</option>
                                <option value="群馬県">群馬県</option>
                                <option value="埼玉県">埼玉県</option>
                                <option value="千葉県">千葉県</option>
                                <option value="東京都">東京都</option>
                                <option value="神奈川県">神奈川県</option>
                                <option value="新潟県">新潟県</option>
                                <option value="富山県">富山県</option>
                                <option value="石川県">石川県</option>
                                <option value="福井県">福井県</option>
                                <option value="山梨県">山梨県</option>
                                <option value="長野県">長野県</option>
                                <option value="岐阜県">岐阜県</option>
                                <option value="静岡県">静岡県</option>
                                <option value="愛知県">愛知県</option>
                                <option value="三重県">三重県</option>
                                <option value="滋賀県">滋賀県</option>
                                <option value="京都府">京都府</option>
                                <option value="大阪府">大阪府</option>
                                <option value="兵庫県">兵庫県</option>
                                <option value="奈良県">奈良県</option>
                                <option value="和歌山県">和歌山県</option>
                                <option value="鳥取県">鳥取県</option>
                                <option value="島根県">島根県</option>
                                <option value="岡山県">岡山県</option>
                                <option value="広島県">広島県</option>
                                <option value="山口県">山口県</option>
                                <option value="徳島県">徳島県</option>
                                <option value="香川県">香川県</option>
                                <option value="愛媛県">愛媛県</option>
                                <option value="高知県">高知県</option>
                                <option value="福岡県">福岡県</option>
                                <option value="佐賀県">佐賀県</option>
                                <option value="長崎県">長崎県</option>
                                <option value="熊本県">熊本県</option>
                                <option value="大分県">大分県</option>
                                <option value="宮崎県">宮崎県</option>
                                <option value="鹿児島県">鹿児島県</option>
                                <option value="沖縄県">沖縄県</option>
                            </select>
                            <div>市区町村</div>
                            <input type="text" className="form-control" onChange={cities} />
                            <div>番地・建物名</div>
                            <input type="text" className="form-control" onChange={houseNumber} />
                    </div>
                    <div className="form-group">
                        <div>職業</div>
                        <select className="form-control" onChange={profession}>
                            <option></option>
                            <option>学生</option>
                            <option>社会人</option>
                            <option>その他</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">その他お問い合わせ</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" onChange={textArea}>
                        </textarea>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">チェック</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={ajaxSend}>送る</button>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ name: state.ajax.name })
const mapDispatchToProps = dispatch => ({
    ajax: (test) => dispatch(ajax(test)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact)