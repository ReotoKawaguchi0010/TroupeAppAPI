import React, {useContext, useEffect} from "react";
import {DndProvider, useDrag, useDrop, DragSourceMonitor} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Box, Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

import {create} from "js/utils/utils"
import {UsersProps} from "js/types/using_reducer_types";
import {AppContext} from "js/webApp/contexts/AppContext";


const useStyles = makeStyles((theme) => ({
    drag: {
        color: '#665644',
    },
}));


interface UserBoxProps{
    index: number
    users: UsersProps
}

const styles: React.CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

const UserBox: React.FC<UserBoxProps> = ({index, users}) => {
    const classes = useStyles()
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'test',
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            }
        },
        item: (monitor: DragSourceMonitor) => {
            console.log(monitor)
            return monitor
        },
    }))
    const transform = `translate3d(0px, 0px, 0)`
    return <Card key={index} ref={drag} style={{
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }}><div style={{...styles, background: 'yellow'}} role={'Box'}>{users.firstName} {users.lastName}</div></Card>
}




const DragComponent = () => {
    const {state, dispatch} = useContext(AppContext)
    const [, drop] = useDrop(() => ({
        accept: 'test',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),

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
                    state.performanceReducer.users.map((v: UsersProps, i: number) => {
                        return <UserBox key={i} index={i} users={v} />
                    })
                }
            </div>
            <div ref={drop}>
                <div>舞台監督</div>
                <Box />
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
            <div>

            </div>
        </DndProvider>
    )
}