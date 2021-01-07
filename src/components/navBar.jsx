import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Vidly</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customers">Customers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rentals">Rentals</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
