import React from "react";
import {Link, Route} from "react-router-dom";
import {Button, withStyles, Popover} from "@material-ui/core";

import MemberTopPage from "./individuals/topPage";
import MemberScriptPage from "./individuals/script";
import MemberSchedulePage from "./individuals/schedule";
import MemberPlansPage from "./individuals/plans";
import MemberContentsPage from "./individuals/contents/contents";
import MemberIdeasPage from "./individuals/ideas";
import MemberMoneyPage from "./individuals/money";
import MemberMyPage from "./individuals/myPage";
import MemberManualPage from "./individuals/manual";
import MemberPerformancePage from "./individuals/performance";
import MemberMyTaskPage from "./individuals/myTask";
import MemberAlertPage from "./individuals/alert";
import MemberContentsHomePage from "./individuals/contents/homePage";
import EditTopPage from "./individuals/contents/editTopPage";
import EditOverview from "./individuals/contents/editOverview";
import EditMember from "./individuals/contents/editMember";
import EditSchedule from "./individuals/contents/editSchedule";
import EditTicket from "./individuals/contents/editTicket";

import bell from "../../img/memberAppImg/bell.png"
import mytask from "../../img/memberAppImg/mytask.png"
import performance from "../../img/memberAppImg/performance.png"
import menuIcon from "../../img/memberAppImg/menu_icon.png"
import closeIcon from "../../img/memberAppImg/cross.png"

let paperStyle = {
    'top': '60px',
    'border-radius': '10px',
    'width': '94%',
    'height': 'calc(100% - 130px)',
    'background': '#ffffff',
    'z-index': 'auto',
}

let rootStyle = {
    'text-align': 'center',
    'background': 'rgba(0, 0, 0, 0.5)',
}

const CustomPop = withStyles({
    paper: paperStyle,
    root: rootStyle
})(Popover)


class MemberRouting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
        }
    }

    handleClick = (e) => {
        this.setState({open: true, anchorEl: e.currentTarget,});
    }

    handleClose = () => {
        this.setState({open: false, anchorEl: null,});
    }


    render() {
        const {open, anchorEl} = this.state;
        return (
            <React.Fragment>
                <CustomPop open={open} anchorEl={anchorEl} style={{background: '',}}>
                        <div onClick={this.handleClose}>close</div>
                        <h2>MENU</h2>
                        <Link to='/auth/script' onClick={this.handleClose}><div>台本<hr /></div></Link>
                        <Link to='/auth/schedule' onClick={this.handleClose}><div>スケジュール<hr /></div></Link>
                        <Link to='/auth/plans' onClick={this.handleClose}><div>工程<hr /></div></Link>
                        <Link to='/auth/contents' onClick={this.handleClose}><div>コンテンツ<hr /></div></Link>
                        <Link to='/auth/ideas' onClick={this.handleClose}><div>企画<hr /></div></Link>
                        <Link to='/auth/money' onClick={this.handleClose}><div>予算<hr /></div></Link>
                        <Link to='/auth/my_page' onClick={this.handleClose}><div>マイページ<hr /></div></Link>
                        <Link to='/auth/manual' onClick={this.handleClose}><div>マニュアル<hr /></div></Link>
                </CustomPop>
                <div className="member-header">
                    <header>
                        <div className="flex">
                            <Button onClick={this.handleClick}><img src={menuIcon} alt="menuIcon" /></Button>
                            <div className="menu-icon" onClick={this.closeMenu} id="closeIcon" style={{'display': 'none'}}><img src={closeIcon} alt="closeIcon" /></div>
                            <div className="app-title"><Link to='/auth/top_page'>劇団沸管理アプリ</Link></div>
                        </div>
                    </header>
                </div>
                <div className="member-main">
                    <main>
                        <Route exact path="/auth/top_page" component={MemberTopPage} />
                        <Route exact path="/auth/script" component={MemberScriptPage} />
                        <Route exact path="/auth/schedule" component={MemberSchedulePage} />
                        <Route exact path="/auth/plans" component={MemberPlansPage} />
                        <Route exact path="/auth/contents" component={MemberContentsPage} />
                        <Route exact path="/auth/contents/edit_home_page" component={MemberContentsHomePage} />
                        <Route exact path="/auth/contents/edit_home_page/edit_top_page" component={EditTopPage} />
                        <Route exact path="/auth/contents/edit_home_page/edit_overview" component={EditOverview} />
                        <Route exact path="/auth/contents/edit_home_page/edit_member" component={EditMember} />
                        <Route exact path="/auth/contents/edit_home_page/edit_schedule" component={EditSchedule} />
                        <Route exact path="/auth/contents/edit_home_page/edit_ticket" component={EditTicket} />
                        <Route exact path="/auth/ideas" component={MemberIdeasPage} />
                        <Route exact path="/auth/money" component={MemberMoneyPage} />
                        <Route exact path="/auth/my_page" component={MemberMyPage} />
                        <Route exact path="/auth/manual" component={MemberManualPage} />
                        <Route exact path="/auth/performance" component={MemberPerformancePage} />
                        <Route exact path="/auth/my_task" component={MemberMyTaskPage} />
                        <Route exact path="/auth/alert" component={MemberAlertPage} />
                    </main>
                </div>
                <div className="member-footer">
                    <footer>
                        <div className="flex footer-menu">
                            <div>
                                <Link to='/auth/performance'>
                                    <div><img src={performance} alt="performance" /></div>
                                    <div className="contents-text">公演</div>
                                </Link>
                            </div>
                            <div>
                                <Link to='/auth/my_task'>
                                    <div><img src={mytask} alt="mytask" /></div>
                                    <div className="contents-text">マイタスク</div>
                                </Link>
                            </div>
                            <div>
                                <Link to='/auth/alert'>
                                    <div><img src={bell} alt="bell" /></div>
                                    <div className="contents-text">通知</div>
                                </Link>
                            </div>
                        </div>
                    </footer>
                </div>
            </React.Fragment>
        )
    }
}

export default MemberRouting