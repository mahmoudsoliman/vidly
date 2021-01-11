import React from 'react'
import Form from './common/form'
import { getGenres } from '../services/fakeGenreService'
import { saveMovie, getMovie } from '../services/fakeMovieService'
import Joi from 'joi-browser'

export default class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", stock: 0, rate: 0.0  },
    errors: {},
    genres: getGenres()
  };
  
  componentDidMount = () => {
    const movieId = this.props.match.params.id
    if(movieId === 'new') return

    const movie = getMovie(movieId)
    console.log({movie})
    if(!movie){
      return this.props.history.replace('/not-found')
    }
    
    this.setState({
      data: {
        title: movie.title,
        genreId: movie.genre._id,
        stock: movie.numberInStock,
        rate: movie.dailyRentalRate
      }
    })
  }

  doSubmit = () => {
    const {
      title,
      genreId,
      stock,
      rate
    } = this.state.data

    saveMovie({
      _id: this.props.match.params.id === 'new'? null : this.props.match.params.id,
      title,
      genreId,
      numberInStock: stock,
      dailyRentalRate: rate 
    })
    this.props.history.push("/movies")
    console.log('Movie Created')
  }

  validationSchema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .valid(this.state.genres.map(genre => genre._id))
      .required()
      .label("Genre"),
    stock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label('Number In Stock'),
    rate: Joi.number()
      .min(0)
      .max(10)
      .precision(1)
      .required()
      .label('Rate')
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres.map(genre => {return {value: genre._id, label: genre.name}}), this.state.data.genreId)} 
          {this.renderInput('stock', 'Number In Stock', 'number')}
          {this.renderInput('rate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    )
  }
}
