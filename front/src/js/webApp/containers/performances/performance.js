import React from "react";
import {useParams} from "react-router";
import { Box } from "@material-ui/core";

export const Performance = () => {
    const { title } = useParams()
    return (
        <Box>{title}</Box>
    )
}




