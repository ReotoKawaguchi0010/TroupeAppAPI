import React from 'react';
import {GridListTile, GridList, GridListTileBar} from "@material-ui/core";

import akanuma from '../../../img/members/ritsu_akanuma_250.jpg'
import kai from '../../../img/members/atsuya_kai_250.jpg'
import kawaguchi from '../../../img/members/reoto_kawaguchi_250.jpg'
import kanzaki from '../../../img/members/sayaka_kanzaki_250.jpg'
import saito from '../../../img/members/hayate_saito_250.jpg'
import yasuda from '../../../img/members/yukako_yasuda_250.jpg'
import yamamoto from '../../../img/members/tatsuya_yamamoto_250.jpg'
import wada from '../../../img/members/takumi_wada_250.jpg'

class Member extends React.Component {
    componentDidMount() {window.scrollTo(0,0)}
    render() {
        const memberImages = [{img: akanuma, name: '赤沼 律'}, {img: kai, name: '甲斐 敦也'}, {img: kawaguchi, name: '河口 怜和人'},
            {img: kanzaki, name: '神崎 紗耶加'}, {img: saito, name: '斉藤 颯'}, {img: yasuda, name: '安田 有香子'}, {img: yamamoto, name: '山本 タツヤ'},
            {img: wada, name: '和田 拓省'}]

        return (
            <React.Fragment>
                <div>
                    <h1>MEMBER</h1>
                    <GridList cellHeight={180}>
                        {memberImages.map((tile) => (
                            <GridListTile key={tile.name}>
                                <img src={tile.img} alt={tile.name} />
                                <GridListTileBar title={tile.name}>
                                </GridListTileBar>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </React.Fragment>
        )
    }
}

export default Member