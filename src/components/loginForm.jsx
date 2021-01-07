import React from 'react'
import Joi from 'joi-browser'
import Form from './common/form'

export default class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };
  
  doSubmit = () => {
    console.log('Submitted')
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
          {
            this.renderInputs([
              {
                name: 'email',
                label: 'Email Address',
                type: 'email'
              },
              {
                name: 'password',
                label: 'Password',
                type: 'password'
              }
            ])
          }
          {
            this.renderButton('Login')
          }
        </form>
      </div>
    )
  }
}
