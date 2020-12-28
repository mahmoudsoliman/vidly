import React, { Component } from 'react'
import { getPages } from '../../utils/pagination'

export default class Pagination extends Component {
    render() {
        const {
            currentPage,
            itemsCount,
            pageSize,
            onPageChange
        } = this.props

        const pages = getPages(itemsCount, pageSize)

        return (
            <nav className="m-3">
                <ul className="pagination">
                    <li className={currentPage > 1? "page-item" : "page-item disabled"}><a className="page-link" onClick={() => onPageChange(currentPage - 1)} href="#0">Previous</a></li>
                    {
                        pages.map(page => <li key={page} className={page === currentPage? "page-item active": "page-item"}><a className="page-link" onClick={() => onPageChange(page)} href="#0">{page}</a></li>)           
                    }
                    <li className={currentPage < pages[pages.length-1]? "page-item" : "page-item disabled"}><a className="page-link" onClick={() => onPageChange(currentPage + 1)} href="#0">Next</a></li>
                </ul>
            </nav>
        )
    }
}
