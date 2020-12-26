import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Input, TextField, Box, Button} from "@material-ui/core";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
    form: {
        textAlign: 'center',
        width: '100%',
        marginTop: 45,
    },
    wrapInput: {
        width: '35%',
    }
}));

export const IdeaCreate = () => {
    const [fieldState, setFieldState] = useState({
        content: [
            {name: 'タイトル'},
            {name: '作成者'},
        ]
    })
    const classes = useStyles()

    return (
        <>
            <Box>
                <Button>項目を追加</Button>
                <Button>項目を削除</Button>
            </Box>
            <form className={classes.form}>
                {
                    _.map(fieldState.content, (v, i) => {
                        return (
                            <Box key={i}>
                                <Box>{v.name}</Box>
                                <Box><Input className={classes.wrapInput} /></Box>
                            </Box>
                        )
                    })
                }
            </form>
        </>
    )
}






