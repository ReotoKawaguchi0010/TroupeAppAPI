import React from 'react';
import {connect} from "react-redux";

import {readTopMessage} from "../actions/readApi";
import {Link} from "react-router-dom";

class Main extends React.Component {
    renderEvents(){
        let responseData = this.props.topMessage.texts
        if(responseData === undefined) responseData = ''
        else{
            let news = <div>{responseData.news}</div>
            let aboutUs = <div>{responseData.about_us}</div>
            let recruitment = <div>{responseData.recruitment}</div>
            let blog = <div>{responseData.blog}</div>
            let youtube = responseData.youtube
            let twitter = responseData.twitter.map((tweet) => (
                <div key={tweet.text}><div>{tweet.text}</div><hr /></div>
            ))
            return {
                news: news,
                aboutUs: aboutUs,
                recruitment: recruitment,
                blog: blog,
                youtube: youtube,
                twitter: twitter,
            }
        }
        return responseData
    }

    render() {
        return (
            <div className="main">
                <main>
                    <div><img src="https://dl.dropboxusercontent.com/s/k3spu4qk20rzi88/sumnail.jpg" /></div>
                    <div className="top-main">
                        <div className="top-main-title"><h2>News</h2></div>
                        <div className="top-main-text">{this.renderEvents().news}</div>
                    </div>
                    <div className="line"></div>
                    <div className="top-main">
                        <div className="top-main-title"><h2>About us</h2></div>
                        <div className="top-main-text">{this.renderEvents().aboutUs}</div>
                    </div>
                    <div className="line"></div>
                    <div className="top-main">
                        <div className="top-main-title"><h2>Recruitment</h2></div>
                        <div className="top-main-text"><p>団員募集は<Link to="/contact">こちら</Link>から</p>
                            <div>
                                <h4>主宰から</h4>
                                {this.renderEvents().recruitment}
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="top-main">
                        <div className="top-main-title"><h2>Blog</h2></div>
                        <div className="top-main-text">{this.renderEvents().blog}</div>
                    </div>
                    <div className="line"></div>
                    <div className="top-main">
                        <div className="top-main-title"><h2>Youtube</h2></div>
                        <div style={{textAlign: 'center'}}>
                            <iframe id="ytplayer" height="360" width="300" src={"https://www.youtube.com/embed/"+this.renderEvents().youtube}
                                    frameBorder="0" title="title" style={{textAlign: 'center'}}>
                            </iframe>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="top-main">
                        <div className="top-main-title"><h2>Twitter</h2></div>
                        <div style={{height: '585px', overflow: 'auto', background: '#ffffff', borderRadius: '10px', width: '80%', margin: 'auto'}}>
                            <h4>劇団沸のツイート</h4>
                            <span className="top-main-text" style={{color: '#000000'}}>{this.renderEvents().twitter}</span>
                        </div>
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