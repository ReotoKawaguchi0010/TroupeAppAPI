import React from "react";
import {connect} from "react-redux";
import {readIndividuals} from "../../actions/readApi";

class Overview extends React.Component {
    componentDidMount() {
        window.scrollTo(0,0)
        this.props.readIndividuals()
    }

    renderEvent() {
        let responseData = this.props.topMessage.page
        if(responseData === undefined) responseData = ''
        else{
        }
        return responseData
    }

    render() {
        return (
            <React.Fragment>
                <div className="overview-area">
                    <h1>Overview</h1>
                    <div className="content">
                        {this.renderEvent()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ topMessage: state.axios })
const mapDispatchToProps = dispatch => ({
    readIndividuals: () => dispatch(readIndividuals()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)