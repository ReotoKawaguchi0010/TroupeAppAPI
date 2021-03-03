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
            <div>
                <div>舞台監督</div>
                <div>舞台演出家</div>
                <div>振付師</div>
                <div>美術</div>
                <div>照明</div>
                <div>衣装</div>
                <div>音響</div>
            </div>
        </>
    )
}