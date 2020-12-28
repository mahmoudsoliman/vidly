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

    render() {
        const {
            columns
        } = this.props

        return (
            <thead>
                <tr className="row">
                    {columns.map((column, indx) => <th key={indx} className="col text-center clickable" onClick={() => this.handleSort(column)}>{column.label}</th>)}
                </tr>
            </thead>
        )
    }
}
