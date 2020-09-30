import React from "react";
import {Link} from "react-router-dom";

class MemberContentsPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div><Link to="/auth/contents/edit_home_page">ホームページ編集</Link></div>
            </React.Fragment>
        )
    }
}

export default MemberContentsPage