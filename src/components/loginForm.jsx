import React from 'react'
import Joi from 'joi-browser'
import Form from './common/form'

export default class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };
  
  doSubmit = () => {
    console.log('Logged in')
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
