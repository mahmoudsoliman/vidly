//import logo from './logo.svg';
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Movies from './components/movies'
import Customers from './components/customers'
import Rentals from './components/rentals'
import NotFound from './components/notFound'
import NavBar from './components/navBar'
import MovieForm from './components/movieForm'
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm'
import authService from './services/authService';
import Logout from './components/logout'
import ProtectedRoute from './components/protectedRoute'
import './App.css';

export default class App extends Component {
  state = {

  }

  componentDidMount() {
    const currentUser = authService.getCurrentUser()
    if(currentUser){
      this.setState({
        user: currentUser
      })
    }
  }
  
  render() {
    const {
      user
    } = this.state

    return (
      <div>
        <ToastContainer/>
        <NavBar user={this.state.user}/>
        <Switch>
          <ProtectedRoute path="/movies/:id" render={(props) => <MovieForm {...props}/>}/>
          <Route path="/movies" render={props => <Movies {...props} user={user}/>}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies"></Redirect>
          <Route path="/" component={NotFound}></Route>
        </Switch>
      </div>
    )
  }
}

