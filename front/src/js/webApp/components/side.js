import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';

import bellIcon from "../../../../images/icons/bell2.png";
import performanceIcon from "../../../../images/icons/performance2.png"
import myTaskIcon from "../../../../images/icons/mytask2.png"
import ideaIcon from "../../../../images/icons/ideas2.png"
import contentIcon from "../../../../images/icons/contents2.png"
import myPageIcon from "../../../../images/icons/mypage2.png"
import manualIcon from "../../../../images/icons/manual2.png"
import moneyIcon from "../../../../images/icons/money2.png"

export const DrawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: DrawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

const sideContent = [
    {title: 'マイページ', img: myPageIcon},
    {title: '公演', img: performanceIcon},
    {title: 'マイタスク', img: myTaskIcon},
    {title: 'お知らせ', img: bellIcon},
]

const sideContentItems = [
    {title: '企画', img: ideaIcon},
    {title: 'コンテンツ', img: contentIcon},
    {title: 'マニュアル', img: manualIcon},
    {title: '予算', img: moneyIcon},
]




function SideBarDrawer() {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {sideContent.map((content, index) => (
                        <ListItem button key={content.title}>
                            <ListItemIcon><img style={{background: '#000000', width: '60%'}} src={content.img} alt={content.title} /></ListItemIcon>
                            <ListItemText primary={content.title} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {sideContentItems.map((content, index) => (
                        <ListItem button key={content.title}>
                            <ListItemIcon><img style={{background: '#000000', width: '60%'}} src={content.img} alt={content.title} /></ListItemIcon>
                            <ListItemText primary={content.title} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    );
}

export default class SideBar extends React.Component{
    render(){
        return (
            <React.Fragment>
                <SideBarDrawer />
            </React.Fragment>
        )
    }
}
