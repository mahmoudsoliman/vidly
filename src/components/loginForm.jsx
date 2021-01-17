import React from 'react'
import Joi from 'joi-browser'
import Form from './common/form'
import * as authService from '../services/authService'
import { Redirect } from 'react-router-dom';

export default class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };
  
  doSubmit = async () => {
    const {
      email,
      password
    } = this.state.data
    
    try {
      await authService.login({email, password})
      const { state } = this.props.location
      window.location = state? state.from.pathname : '/'
    } catch (error) {
      if(error.response && error.response.status === 400){
        this.setState({
          errors: {
            ...this.state.errors,
            email: error.response.data
          }
        })
      }
    }
  }

  validationSchema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email Address"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  render() {
    if(authService.getCurrentUser()) return <Redirect to="/"/>
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email Address', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    )
  }
}
