import React, {useContext, useEffect} from "react";
import {DndProvider, useDrag, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Button} from "@material-ui/core";
import _ from "lodash";

import {create} from "js/utils/utils"
import {AppContext} from "js/webApp/contexts/AppContext";


const DragComponent = () => {
    const {state, dispatch} = useContext(AppContext)

    const [, drag] = useDrag(() => ({
        type: 'test',
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    const [, drop] = useDrop(() => ({
        accept: 'test',
        drop: (e) => {
            console.log(e)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }))


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
        <>
            <div>
                {
                    _.map(state.performanceReducer.users, (v, i) => {
                        return <Button key={i} ref={drag}>{v.first_name} {v.last_name}</Button>
                    })
                }
            </div>
            <div ref={drop}>
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

export const Staff = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div>staff</div>
            <DragComponent />
        </DndProvider>
    )
}