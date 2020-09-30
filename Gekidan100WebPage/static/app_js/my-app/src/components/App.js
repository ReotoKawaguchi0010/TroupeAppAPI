import React from 'react';

import PcArea from "./pcArea";
import MobileArea from "./mobileArea";

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="wrap">
                    <PcArea />
                    <MobileArea />
                </div>
            </React.Fragment>
        )
    }
}

export default App