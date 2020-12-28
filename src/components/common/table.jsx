import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

class Table extends Component {
    render() {
        const {
            columns,
            data,
            columnSort,
            onSort
        } = this.props

        return (
            <table className="table">
                <TableHeader columns={columns} columnSort={columnSort} onSort={(columnSort) => onSort(columnSort)}/>
                <TableBody data={data} columns={columns}/>
            </table>
        )
    }
}

Table.propTypes = {
    coulumns: PropTypes.shape({
        label: PropTypes.string,
        anchor: PropTypes.string,
        element: PropTypes.element
    })
}

export default Table