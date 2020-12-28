import React, { Component } from 'react'

export default class FilterList extends Component {
    render() {
        const {
            filters,
            currentFilter,
            onFilterChange
        } = this.props
        
        return (
            <ul className="list-group">
                {
                    filters.map((filter, index) => <li key={index} className={filter === currentFilter? "list-group-item clickable active" : "list-group-item clickable"} onClick={() => onFilterChange(filter)}>{filter}</li>)
                }
            </ul>
        )
    }
}
