//import logo from './logo.svg';
import './App.css';
import Movies from './components/movies'

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Movies/>
      </React.Fragment>
    )
  }
}

