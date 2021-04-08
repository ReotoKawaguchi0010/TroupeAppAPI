import React from "react";
import {Button} from "@material-ui/core";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";


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




interface NewsContents{
    content: string
    link?: string
}

interface NewsData {
    title: string
    contents: NewsContents[]
}

const data: NewsData = {
    title: 'News',
    contents: [{content: '第4回公演「ゲキダン！〜テクノロジーの惑星から愛の使者がやってきた〜」', link: 'https://stage.corich.jp/stage/111501/ticket_apply'}]
}


export default function News(props: any){
    const classes = useStyles();
    if(props.data !== undefined) data.contents[0] = props.data.news
    return (
        <>
            <h2 className={classes.title}>{data.title}</h2>
            <ul className={classes.newsContent}>
                { data.contents.map((newsContent, key) => (
                        <li key={key}>
                            {newsContent.link !== '' ? (
                                <a href={newsContent.link}>
                                    <Button>{newsContent.content}</Button>
                                </a>
                            ) : newsContent.content
                            }
                        </li>
                    ))
                }
            </ul>
        </>
    )
}