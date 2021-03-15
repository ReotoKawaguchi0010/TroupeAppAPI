import React, {useContext, useEffect} from "react";
import {useParams} from "react-router";
import {DndProvider, useDrag} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Button} from "@material-ui/core";
import _ from "lodash";

import {create} from "js/utils/utils"
import {AppContext} from "js/webApp/contexts/AppContext";

interface ParamsType {
    performance_id: any
}

export const Staff = () => {
    const {state, dispatch} = useContext(AppContext)
    const { performance_id } = useParams<ParamsType>()

    console.log(state)

    const getUsers = async () => {
        const res = await create.get('/app/', {
            params: {
                type: 'get_users',
                data: 'all',
            },
        })
        dispatch({type: 'get_users', data: res.data})
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <div>staff</div>
            <div>
                {
                    _.map(state.performanceReducer.users, (v, i) => {
                        return <Button key={i}>{v.first_name} {v.last_name}</Button>
                    })
                }
            </div>

            <div>
                <div>舞台監督</div>
                <div>舞台演出家</div>
                <div>振付師</div>
                <div>美術</div>
                <div>照明</div>
                <div>衣装</div>
                <div>音響</div>
            </div>
        </DndProvider>
    )
}