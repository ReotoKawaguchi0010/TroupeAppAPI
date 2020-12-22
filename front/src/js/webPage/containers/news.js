import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios"
import _ from "lodash"


const pcStyles = (theme) => ({
    title: {},
    newsContent: {
        listStyle: 'none',
        paddingInlineStart: '0',
    },
})

const mobStyles = (theme) => ({
    title: {
        fontSize: '50px',
    },
    newsContent: {
        listStyle: 'none',
        paddingInlineStart: '0',
        fontSize: '35px'
    },
})

const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: pcStyles(theme),
    [theme.breakpoints.between('sm', 'md')]: mobStyles(theme),
}));

const data = {
    title: 'News',
    contents: ['Coming Soon']
}


export default function News(props){
    const classes = useStyles();
    if(props.data !== undefined) data.contents[0] = props.data.news
    return (
        <React.Fragment>
            <h2 className={classes.title}>{data.title}</h2>
            <ul className={classes.newsContent}>
                { _.map(data.contents, (content, key) => {
                    return (<li key={'news'+key}>{content}</li>)
                }) }
            </ul>
        </React.Fragment>
    )
}