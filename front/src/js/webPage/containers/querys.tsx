import React from "react";
import {useLocation} from "react-router";
import {VideoTicket} from "js/webPage/containers/video_ticket";
import Footer from "js/webPage/components/footer";
import {VideoTicketDone} from "js/webPage/containers/ticket_done";
import {Video} from "js/webPage/containers/video";

export const Parameters = () => {
    const query = new URLSearchParams(String(useLocation().search))

    if (query.has('video_ticket'))return <React.Fragment><VideoTicket /><Footer /></React.Fragment>
    else if (query.has('paymentId')) return <VideoTicketDone />
    else if (query.has('videoId')) return <Video />
    return null
}




