import React from "react";
import MemberRouting from "./routings";

class MemberIndexPage extends React.Component {
    render() {
        return (
            <div className="auth-top-page">
                <div>
                    <MemberRouting />
                </div>
            </div>
        )
    }
}

export default MemberIndexPage