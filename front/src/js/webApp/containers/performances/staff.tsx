import React from "react";
import {useParams} from "react-router";

interface ParamsType {
    performance_id: any
}

export const Staff = () => {
    const { performance_id } = useParams<ParamsType>()

    return (
        <>
            <div>staff</div>
        </>
    )
}