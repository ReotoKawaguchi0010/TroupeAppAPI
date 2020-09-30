import React from "react";
import {readIndividuals} from "../../actions/readApi";
import {connect} from "react-redux";


class Ticket extends React.Component {
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
                <div className="ticket-area">
                    <h1>Ticket</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ticket)