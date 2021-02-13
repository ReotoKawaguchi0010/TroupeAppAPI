import React from "react";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import {MenuIcon} from "js/webPage/components/menu";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            padding: '0 110px'
        },
        paypalExp: {
            display: 'flex'
        },
        nextBtn: {
            display: 'inline-block',
            borderRadius: '5px',
            background: 'red',
            width: '50px',
            textAlign: 'center',
            padding: '15px'
        },
        nextText: {
            color: 'white',
            textDecoration: 'none',
            fontSize: '20px',
        },
        title: {
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bolder',
            marginTop: '120px',
        },
        subTitle: {
            textAlign: 'center',
            margin: '20px 0',
            fontSize: '18px',
            fontWeight: 'bolder',
        },
        message: {
            textAlign: 'center',
        },
        overview: {
            border: '1px solid #e8e9eb',
            textAlign: 'center',
            width: '50%'
        },
    })
);


export const VideoTicket = (props: any) => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <div className={classes.body}>
                <MenuIcon />
                <div>
                    <div>
                        <div className={classes.title}>劇団沸改名記念公演「あの星空の匂いがする」</div>
                        <div className={classes.subTitle}>配信チケット</div>
                        <div className={classes.message}>
                            支払いは現在PayPalからのみとなっております。
                            その他の方法は<Link to='/contact'>お問い合わせ</Link>からご確認ください。
                        </div>

                        <div className={classes.paypalExp}>
                            <div>
                                <img
                                    src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/jp/developer/BN-paypal-logo-jp320_145.png"
                                    alt="PayPal（ペイパル）"
                                />
                            </div>
                            <div className={classes.overview}>
                                <div>
                                    <div>概要</div>
                                    <div>1500円</div>
                                </div>
                                <a href={props.data.url} className={classes.nextText}><div className={classes.nextBtn}>続行</div></a>
                            </div>
                        </div>
                        <div>取引を完了するために、PayPalのセキュリティで保護されたサーバーに移動します。</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}