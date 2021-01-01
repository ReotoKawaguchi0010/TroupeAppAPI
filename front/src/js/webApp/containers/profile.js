import React, {useContext} from "react";
import {Card, List, ListItem, Container, Button} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit"

import {AppContext} from "../contexts/AppContext";

export const Profile = () => {
    const {state, dispatch} = useContext(AppContext)

    const userData = {user: {}}

    if(Boolean(state.reducerFunc)){
        if(Boolean(state.reducerFunc.user)){
            userData.user = state.reducerFunc.user
        }
    }

    return (
        <Container>
            <div>プロフィール</div>

            <Card>
                <List>
                    <ListItem>名前: {Boolean(userData.user) ? `${userData.user.last_name} ${userData.user.first_name}` : ''}<Button><EditIcon /></Button></ListItem>
                    <ListItem>メールアドレス: {Boolean(userData.user) ? userData.user.email : ''}<Button><EditIcon /></Button></ListItem>
                    <ListItem>ユーザーネーム: {Boolean(userData.user) ? userData.user.username : ''}<Button><EditIcon /></Button></ListItem>
                    <ListItem>自己紹介: {Boolean(userData.user) ? userData.user.introduction : ''}<Button><EditIcon /></Button></ListItem>
                </List>
            </Card>
        </Container>

    )
}