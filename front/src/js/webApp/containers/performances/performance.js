import React from "react";
import {useParams} from "react-router";
import { Box, Container } from "@material-ui/core";
import _ from "lodash";


const data = [
    {
        id: 1,
        title: '快楽と健康',
        script: '',
    },
    {
        id: 2,
        title: '海辺の墓場までハイキング',
        script: '',
    },
]






export const Performance = () => {
    const { performance_id } = useParams()

    const performance_data = _.find(data, performance_id)

    return (
        <Container>
            <Box>{performance_data.title}</Box>
        </Container>
    )
}




