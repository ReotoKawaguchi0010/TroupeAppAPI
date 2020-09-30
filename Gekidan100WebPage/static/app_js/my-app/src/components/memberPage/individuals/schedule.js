import React from "react";

import {Table, TableBody, TableRow, TableCell} from "@material-ui/core";

const styleCell = {
    borderRight: '1px solid rgba(224, 224, 224, 1)'
}



class MemberSchedulePage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>スケジュール</div>
                <div>
                    <Table style={{borderRadius: '10px', background: '#ffffff', height: 400, width: '95%', margin: 'auto'}}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={styleCell}>日</TableCell>
                                <TableCell style={styleCell}>月</TableCell>
                                <TableCell style={styleCell}>火</TableCell>
                                <TableCell style={styleCell}>水</TableCell>
                                <TableCell style={styleCell}>木</TableCell>
                                <TableCell style={styleCell}>金</TableCell>
                                <TableCell style={styleCell}>土</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                                <TableCell style={styleCell}>

                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </React.Fragment>
        )
    }
}

export default MemberSchedulePage