import Joi from 'joi-browser';
import React from 'react'
import Form from './common/form';

export default class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {}
  };
  
  doSubmit = () => {
    console.log('Registered')
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
        <h1>Login</h1>
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
