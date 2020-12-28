import React, { Component } from 'react'
import _ from 'lodash'

class TableBody extends Component {
    getCellContent(column, dataObject) {
        return column.anchor? _.get(dataObject, column.anchor) : column.element(dataObject)
    }

    render() {
        const {
            data,
            columns,
            dataObjectIdPropName
        } = this.props
        return (
            <tbody>
                {
                    data.map(dataObject => (
                            <tr className="row" key={dataObject[dataObjectIdPropName]} >
                                {
                                    columns.map((column, indx) => <td key={indx} className="col text-center">{this.getCellContent(column, dataObject)}</td>)
                                }
                            </tr>
                        )
                    )
                }
            </tbody>
        )
    }
}

TableBody.defaultProps = {
    dataObjectIdPropName: '_id'
}

export default TableBody