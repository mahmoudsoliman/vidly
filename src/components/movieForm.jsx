import React from 'react'
import Form from './common/form'
import { createMovie, updateMovie, getMovie } from '../services/movieService'
import { getGenres } from '../services/geneService'
import Joi from 'joi-browser'

export default class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", stock: 0, rate: 0.0  },
    errors: {},
    genres: []
  };

  populateGengres = async () => {
    const genres = await getGenres()
    this.setState({genres})
  }

  populateMovie = async () => { 
    const movieId = this.props.match.params.id
    if(movieId === 'new') return

    let movie = {}
    try {
      movie = await getMovie(movieId)
    } catch (error) {
      if(error.response && error.response.status === 404)
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
  
  async componentDidMount() {
    await this.populateGengres()
    await this.populateMovie()
  }

  doSubmit = async () => {
    const {
      title,
      genreId,
      stock,
      rate
    } = this.state.data

    if(this.props.match.params.id === 'new') {
      await createMovie({
        title,
        genreId,
        numberInStock: stock,
        dailyRentalRate: rate 
      })
    }
    else{
      await updateMovie(this.props.match.params.id, {
        title,
        genreId,
        numberInStock: stock,
        dailyRentalRate: rate 
      })
    }
    
    this.props.history.push("/movies")
  }

  validationSchema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
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
