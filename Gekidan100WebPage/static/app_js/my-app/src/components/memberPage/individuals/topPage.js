import React from "react";
import {connect} from "react-redux";

import {readApi} from "../../actions/readApi";

import book from "../../../img/memberAppImg/book.png"
import calendar from "../../../img/memberAppImg/calendar.png"
import contents from "../../../img/memberAppImg/contents.png"
import ideas from "../../../img/memberAppImg/ideas.png"
import journey from "../../../img/memberAppImg/journey.png"
import manual from "../../../img/memberAppImg/manual.png"
import money from "../../../img/memberAppImg/money.png"
import mypage from "../../../img/memberAppImg/mypage.png"
import {Link} from "react-router-dom";


class MemberTopPage extends React.Component {
    componentDidMount() {
        //this.props.readApi()
    }

    renderEvents() {
        if(Boolean(this.props.read.bool)){
            console.log('true')
        }else {

        }
        return <div>{this.props.read.message}</div>
    }

    render() {
        return (

            <div className="contents">
                <div className="flex main-contents">
                    <div className="select-contents">
                        <Link to='/auth/script'>
                            <div className="contents-img"><img src={book} alt="book" /></div>
                            <div className="contents-text">台本</div>
                        </Link>
                    </div>
                    <div className="select-contents">
                        <Link to='/auth/schedule'>
                            <div className="contents-img"><img src={calendar} alt="calendar" /></div>
                            <div className="contents-text">スケジュール</div>
                        </Link>
                    </div>
                </div>
                <div className="flex main-contents">
                    <div className="select-contents">
                        <Link to='/auth/plans'>
                            <div className="contents-img"><img src={journey} alt="journey" /></div>
                            <div className="contents-text">工程</div>
                        </Link>
                    </div>
                    <div className="select-contents">
                        <Link to='/auth/contents'>
                            <div className="contents-img"><img src={contents} alt="contents" /></div>
                            <div className="contents-text">コンテンツ</div>
                        </Link>
                    </div>
                </div>
                <div className="flex main-contents">
                    <div className="select-contents">
                        <Link to='/auth/ideas'>
                            <div className="contents-img"><img src={ideas} alt="ideas" /></div>
                            <div className="contents-text">企画</div>
                        </Link>
                    </div>
                    <div className="select-contents">
                        <Link to='/auth/money'>
                            <div className="contents-img"><img src={money} alt="money" /></div>
                            <div className="contents-text">予算</div>
                        </Link>
                    </div>
                </div>
                <div className="flex main-contents">
                    <div className="select-contents">
                        <Link to='/auth/my_page'>
                            <div className="contents-img"><img src={mypage} alt="mypage" /></div>
                            <div className="contents-text">マイページ</div>
                        </Link>
                    </div>
                    <div className="select-contents">
                        <Link to='/auth/manual'>
                            <div className="contents-img"><img src={manual} alt="manual" /></div>
                            <div className="contents-text">マニュアル</div>
                        </Link>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({ read: state.axios })
const mapDispatchToProps = dispatch => ({
    readApi: () => dispatch(readApi()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MemberTopPage)