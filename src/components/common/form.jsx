import React, { Component } from 'react'
import Joi from 'joi-browser'

export default class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.validationSchema, options);
    if(error){
      let errors = []
      for(let item of error.details){
        errors[item.path[0]] = item.message
      }
      return errors
    }
    return null
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const schema = { [name]: this.validationSchema[name] }
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const {name, value} = input
    const error = this.validateProperty({name, value})
    const errors = this.state.errors
    errors[name] = error
    
    const data = {
      ...this.state.data,
      [name]: value
    }

    this.setState({ data, errors })
  }

  handleSubmit = e => {
    e.preventDefault();
    
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  }

  renderInput = (name, label, type = 'text') => {
    const {
      data,
      errors
    } = this.state

    return ( 
      <div key={name} className="form-group">
        <label htmlFor={name}>{label}</label>
        <input name={name} type={type} className="form-control" id={name} placeholder={label} onChange={this.handleChange} value={data[name]}/>
        {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
      </div>
    )
  }

  renderButton = (action) => {
    return <button type="submit" className="btn btn-primary" disabled={this.validate()}>{action}</button>
  }

  renderSelect = (name, label, options, currentOption) => {
    return(
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select name={name} className="form-control" id={name} value={currentOption} onChange={this.handleChange}>
          <option value="" key="none"></option>
          {
            options.map((option, indx) => <option key={indx} value={option.value}>{option.label}</option>)
          }
        </select>
      </div>
    )
  }
}
