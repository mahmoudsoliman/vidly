import Joi from 'joi-browser';
import React from 'react'
import Form from './common/form';
import * as userService from '../services/userService'
import * as authService from '../services/authService'

export default class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {}
  };
  
  doSubmit = async () => {
    const {
      email,
      password,
      name
    } = this.state.data
    
    try {
      const res = await userService.register({ email, password, name })
      authService.setJWT(res.headers['x-auth-token'])
      window.location = '/'
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
      .label('Email Address'),
    password: Joi.string()
      .required()
      .min(5)
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name')
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email Address', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    )
  }
}
