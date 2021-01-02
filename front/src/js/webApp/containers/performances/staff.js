import React from "react";
import {useParams} from "react-router";


export const Staff = () => {
    const { performance_id } = useParams()

    return (
        <>
            <div>staff</div>
        </>
    )
}