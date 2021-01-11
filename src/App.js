//import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
import Movies from './components/movies'
import Customers from './components/customers'
import Rentals from './components/rentals'
import NotFound from './components/notFound'
import NavBar from './components/navBar'
import MovieForm from './components/movieForm'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import { ToastContainer } from 'react-toastify'

export default class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer/>
        <NavBar/>
        <Switch>
          <Route path="/movies/:id" render={(props) => <MovieForm {...props} />}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies"></Redirect>
          <Route path="/" component={NotFound}></Route>
        </Switch>
      </div>
    )
  }
}

