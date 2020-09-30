import React from 'react';
import {connect} from "react-redux";

import {readTopMessage} from "../actions/readApi";

class Main extends React.Component {
    componentDidMount() {
        this.props.readTopMessage()
    }

    renderEvents(){
        return <div>{this.props.topMessage.message}</div>
    }
    render() {
        return (
            <div className="main">
                <main>
                    <div className="top-main">
                        <div className="top-main-title"><h2>News</h2></div>
                        <div className="top-main-text">Coming Soon</div>
                    </div>
                    <div className="line"></div>
                    <div className="top-main">
                        <div className="top-main-title"><h2>About us</h2></div>
                        <div className="top-main-text">Coming Soon</div>
                    </div>
                    <div className="line"></div>
                    <div className="top-main">
                        <div className="top-main-title"><h2>Recruitment</h2></div>
                        <div className="top-main-text"><p>団員募集は<b>こちら</b>から</p>
                            <div>
                                <h4>主宰から</h4>
                                {this.renderEvents()}
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="top-main">
                        <div className="top-main-title"><h2>Blog</h2></div>
                        <div className="top-main-text">Coming Soon</div>
                    </div>
                    <div className="line"></div>
                    <div className="top-main">
                        <div className="top-main-title"><h2>Youtube</h2></div>
                        <div className="top-main-text">Coming Soon</div>
                    </div>
                    <div className="line"></div>
                    <div className="top-main">
                        <div className="top-main-title"><h2>Twitter</h2></div>
                        <div className="top-main-text">Coming Soon</div>
                    </div>
                    <div className="line"></div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => ({ topMessage: state.axios })
const mapDispatchToProps = dispatch => ({
    readTopMessage: () => dispatch(readTopMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)