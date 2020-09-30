import React from 'react';
import akanuma from '../../../img/members/ritsu_akanuma_250.jpg'
import kai from '../../../img/members/atsuya_kai_250.jpg'
import kawaguchi from '../../../img/members/reoto_kawaguchi_250.jpg'
import kanzaki from '../../../img/members/sayaka_kanzaki_250.jpg'
import saito from '../../../img/members/hayate_saito_250.jpg'
import yasuda from '../../../img/members/yukako_yasuda_250.jpg'
import yamamoto from '../../../img/members/tatsuya_yamamoto_250.jpg'
import wada from '../../../img/members/takumi_wada_250.jpg'

class Member extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>MEMBER</h1>
                    <div className="member-list">
                        <table>
                            <tbody>
                                <tr>
                                    <td><img src={akanuma} alt="akanuma" /></td>
                                    <td><img src={kai} alt="kai" /></td>
                                    <td><img src={kawaguchi} alt="kawaguchi" /></td>
                                    <td><img src={kanzaki} alt="kanzaki" /></td>
                                    <td><img src={saito} alt="saito" /></td>
                                </tr>
                                <tr>
                                    <td>赤沼 律</td>
                                    <td>甲斐 敦也</td>
                                    <td>河口 怜和人</td>
                                    <td>神崎 紗耶加</td>
                                    <td>斉藤 颯</td>
                                </tr>
                                <tr>
                                    <td><img src={yasuda} alt="yasuda" /></td>
                                    <td><img src={yamamoto} alt="yamamoto" /></td>
                                    <td><img src={wada} alt="wada" /></td>
                                </tr>
                                <tr>
                                    <td>安田 有香子</td>
                                    <td>山本 タツヤ</td>
                                    <td>和田 拓省</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Member