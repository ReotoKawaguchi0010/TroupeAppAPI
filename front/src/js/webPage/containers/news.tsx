import React from "react";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import _ from "lodash"


const useStyles = makeStyles((theme: Theme) => createStyles({
    [theme.breakpoints.between('md', 'xl')]: {
        title: {},
        newsContent: {
            listStyle: 'none',
            paddingInlineStart: '0',
        },
    },
    [theme.breakpoints.between('sm', 'md')]: {
        title: {
            fontSize: '50px',
        },
        newsContent: {
            listStyle: 'none',
            paddingInlineStart: '0',
            fontSize: '35px'
        },
    },
}));

const data = {
    title: 'News',
    contents: ['Coming Soon']
}


export default function News(props: any){
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