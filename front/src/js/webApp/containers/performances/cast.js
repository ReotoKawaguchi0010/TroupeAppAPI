import React from "react";
import {useParams} from "react-router";


export const Cast = () => {
    const { performance_id } = useParams()

    return (
        <>
            <div>cast</div>
        </>
    )
}