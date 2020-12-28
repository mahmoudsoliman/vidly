import React, { Component } from 'react'

export default class TableHeader extends Component {

    handleSort(column) {
        if(!column.anchor)
            return
        const {
            columnSort,
            onSort
        } = this.props
        
        const newColumnSort = (columnSort.path === column.anchor)? 
        (columnSort.order === 'asc'? {path: columnSort.path, order: 'desc'} 
        : {path: columnSort.path, order: 'asc'}) : 
        ({path: column.anchor, order: 'asc'})

        onSort(newColumnSort)
    }

    renderSortIcon = (column) => {
        const columnSort = this.props.columnSort
        if(columnSort.path !== column.anchor) return null
        return columnSort.order === 'asc'? <i className="fa fa-sort-asc"/> : <i className="fa fa-sort-desc" />
    }

    render() {
        const {
            columns
        } = this.props

        return (
            <thead>
                <tr className="row">
                    {columns.map((column, indx) => <th key={indx} className={"col text-center clickable"} onClick={() => this.handleSort(column)}>{column.label} {this.renderSortIcon(column)}</th>)}
                </tr>
            </thead>
        )
    }
}
