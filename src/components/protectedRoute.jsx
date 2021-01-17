import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import * as authService from '../services/authService'

export default class ProtectedRoute extends Component {
  render() {
    const {
      component: Component,
      render,
      ...rest
    } = this.props

    return (
      <Route
        {...rest}
        render={props => {
          return authService.getCurrentUser()? (Component? <Component {...props}/> : render(props)) : <Redirect to={{pathname:'/login', state:{from: props.location}}}/>
        }}
      >
      </Route>
    )
  }
}
