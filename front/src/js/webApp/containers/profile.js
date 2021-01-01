import React, {useContext} from "react";
import {Card, List, ListItem, Container, Button} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit"

import {AppContext} from "../contexts/AppContext";

export const Profile = () => {
    const {state, dispatch} = useContext(AppContext)

    console.log(state.reducerFunc)

    return (
        <Container>
            <div>プロフィール</div>

            <Card>
                <List>
                    <ListItem>名前: {Boolean(state.reducerFunc) ? `${state.reducerFunc.user.last_name} ${state.reducerFunc.user.first_name}` : ''}<Button><EditIcon /></Button></ListItem>
                    <ListItem>メールアドレス: {Boolean(state.reducerFunc) ? state.reducerFunc.user.email : ''}</ListItem>
                    <ListItem>ユーザーネーム</ListItem>
                </List>
            </Card>
        </Container>

    )
}