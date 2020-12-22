import React from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from "@material-ui/core";

import { test } from "../actions/action"
import mainGif from "../../../../images/main_gif.gif";
import MenuIcon from "./menu";


const pcStyles = {
    mainHeader: {
        height: 935,
    },
    figure: {
        margin: 0,
        position: 'relative',
    },
    img: {
        width: '100vw',
        height: '935px',
    },
    title: {
        position: 'absolute',
        top: '30%',
        width: '100%',
        color: '#ffffff',
    },
    jaTitle: {
        textAlign: 'center',
        fontSize: 105,
        lineHeight: '105px',
    },
    enTitle: {
        textAlign: 'center',
        fontSize: 26,
    },
}

const mobStyles = {
    mainHeader: {
        height: '',
    },
    figure: {
        margin: 0,
        position: 'relative',
    },
    img: {
        width: '100%',
    },
    title: {
        position: 'absolute',
        top: '30%',
        width: '100%',
        color: '#ffffff',
    },
    jaTitle: {
        textAlign: 'center',
        fontSize: 105,
        lineHeight: '105px',
    },
    enTitle: {
        textAlign: 'center',
        fontSize: 26,
    },
}


const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.between('md', 'xl')]: pcStyles,
    [theme.breakpoints.between('xs', 'md')]: mobStyles,
}));

function HeaderFunc(props){
    const classes = useStyles();

    const Loading = (bool) => {
        if(bool.bool){
            return (
                <CircularProgress />
            )
        }else{
            return '';
        }
    }
    return (
        <header className={classes.mainHeader}>
            <Loading bool={props.data.isLoading} />
            <figure className={classes.figure}>
                <div><img src={mainGif} alt={"mainGif"} className={classes.img} /></div>
                <MenuIcon />
                <div className={classes.title}>
                    <div className={classes.jaTitle}>劇団沸</div>
                    <div className={classes.enTitle}>Futsu Theater Company</div>
                </div>
            </figure>
        </header>
    )
}


class Header extends React.Component{
    componentDidMount() {
        if(!Object.keys(this.props.data).length){
            this.props.test()
        }
    }

    render(){
        return (
            <React.Fragment>
                <HeaderFunc data={this.props.data} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {data: state.http}
}

const mapDispatchToProps = ({ test })

export default connect(mapStateToProps, mapDispatchToProps)(Header)