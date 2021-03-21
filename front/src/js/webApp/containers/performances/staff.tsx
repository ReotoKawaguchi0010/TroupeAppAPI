import React, {useContext, useEffect} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Box, Card} from "@material-ui/core";
//import {makeStyles} from "@material-ui/core/styles";

import {create} from "js/utils/utils"
import {UsersProps} from "js/types/using_reducer_types";
import {AppContext} from "js/webApp/contexts/AppContext";


// const useStyles = makeStyles(() => ({
//     drag: {
//         color: '#665644',
//     },
// }));


interface UserBoxProps{
    index: number
    users: UsersProps
}

const UserBox: React.FC<UserBoxProps> = ({index, users}) => {
    return (
        <Draggable draggableId={String(index)} index={index} key={index}>
        {
            provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {users.firstName} {users.lastName}
                </div>
            )
        }
        </Draggable>
    )
}


const DragComponent = () => {
    const {state, dispatch} = useContext(AppContext)


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

    const test = () => {
        console.log('test')
    }

    return (
        <DragDropContext onDragEnd={test}>
            <div>
                {
                    state.performanceReducer.users.map((v: UsersProps, i: number) => {
                        return <UserBox key={i} index={i} users={v} />
                    })
                }
            </div>
            <div>
                <div>舞台監督</div>
                <Box />
                <div>舞台演出家</div>
                <div>振付師</div>
                <div>美術</div>
                <div>照明</div>
                <div>衣装</div>
                <div>音響</div>
            </div>
        </DragDropContext>
    )
}



export const Staff = () => {
    return (
        <>
            <div>staff</div>
            <DragComponent />
            <div>

            </div>
        </>
    )
}