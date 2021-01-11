import React, { Component } from 'react'

export default class SearchBox extends Component {
  render() {
    return (
      <input
        className="form-control my-3"
        type="text"
        name="query"
        value={this.props.value}
        placeholder="search..."
        onChange={(e) => this.props.onChange(e.currentTarget.value)}
      />
    )
  }
}
