import React from "react";
import {Link} from "react-router-dom";

class MemberContentsHomePage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div><Link to="/auth/contents/edit_home_page/edit_top_page">TopPage</Link></div>
                <div><Link to="/auth/contents/edit_home_page/edit_overview">Overview</Link></div>
                <div><Link to="/auth/contents/edit_home_page/edit_member">Member</Link></div>
                <div><Link to="/auth/contents/edit_home_page/edit_schedule">Schedule</Link></div>
                <div><Link to="/auth/contents/edit_home_page/edit_ticket">Ticket</Link></div>
                <div><Link to="/auth/contents/edit_home_page/edit_contact">Contact</Link></div>
            </React.Fragment>
        )
    }
}

export default MemberContentsHomePage