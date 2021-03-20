import React, {useContext} from "react";
import {Card, List, ListItem, Container, Button} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit"

import {AppContext} from "js/webApp/contexts/AppContext";

export const Profile = () => {
    const {state} = useContext(AppContext)

    return (
        <Container>
            <div>プロフィール</div>

            <Button>ユーザーの作成</Button>

            <Card>
                <List>
                    <ListItem>名前: {`${state.userReducer.user.lastName} ${state.userReducer.user.firstName}`}<Button><EditIcon /></Button></ListItem>
                    <ListItem>メールアドレス: {state.userReducer.user.contact}<Button><EditIcon /></Button></ListItem>
                    <ListItem>ユーザーネーム: {state.userReducer.user.username}<Button><EditIcon /></Button></ListItem>
                    <ListItem>自己紹介: {state.userReducer.user.introduction}<Button><EditIcon /></Button></ListItem>
                </List>
            </Card>
        </Container>

    )
}