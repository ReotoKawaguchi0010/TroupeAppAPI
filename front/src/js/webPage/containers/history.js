import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import _ from "lodash"

import firstImage from "../../../../images/performances/first.jpg"
import secondImage from "../../../../images/performances/second_performance.jpg"

import SwipeableViews from 'react-swipeable-views';
import { Card, CardContent } from "@material-ui/core";

const pcStyles = {
    performance: {
        padding: '0 25%',
    },
    activeStep:{
        textAlign: 'center',
    },
    img: {
        width: '100%',
    },
    performanceName: {},
    performanceDate: {},
}

const mobStyles = {
    performance: {
        padding: '0',
    },
    activeStep:{
        textAlign: 'center',
        fontSize: '25px',
    },
    img: {
        width: '100%',
    },
    performanceName: {
        fontSize: 33,
    },
    performanceDate: {
        fontSize: 30,
    },
}


const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: pcStyles,
    [theme.breakpoints.between('xs', 'md')]: mobStyles,
}));

const performances = [
    {
        title: '第一回公演「快楽と健康」',
        subheader: '2019.8',
        img: firstImage,
        alt: '第一回公演',
        content: ''
    },
    {
        title: '第二回公演「海辺の墓場までバイキング」',
        subheader: '2020.1',
        img: secondImage,
        alt: '第二回公演',
        content: ''
    },
]

export default function History() {
    const [activeStep, setActiveStep] = React.useState(0);
    const classes = useStyles()

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    return (
        <React.Fragment>
            <SwipeableViews enableMouseEvents index={activeStep} onChangeIndex={handleStepChange}>
                {_.map(performances, (performance, key) => {
                    return (
                        <div key={`history${key}`}>
                            <div className={classes.performance}>
                                <Card>
                                    <CardContent>
                                        <div className={classes.performanceName}>{performance.title}</div>
                                        <div className={classes.performanceDate}>{performance.subheader}</div>
                                    </CardContent>
                                    <div><img className={classes.img} src={performance.img} alt={performance.alt} /></div>
                                    <CardContent>{performance.content}</CardContent>
                                </Card>
                            </div>
                        </div>
                    )
                })}
            </SwipeableViews>
            <div className={classes.activeStep}>{activeStep+1}/2</div>
        </React.Fragment>
    );
}