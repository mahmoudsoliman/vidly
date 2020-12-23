import React, { Component } from 'react'
import HeartLike from '../components/heartLike'
import { getMovies, deleteMovie } from '../services/fakeMovieService'
 
export default class movies extends Component {
    state = {
        movies: []
    }

    componentDidMount = () => {
        const movies = getMovies()
        this.setState({ movies })
    }

    handleDeleteMovie = (id) => {
        deleteMovie(id)
        this.setState({
            movies: getMovies()
        })
    }

    handleMovieLiked = (id) => {
        console.log(`Movie ${id} is liked`)
    }

    handleMovieDisliked = (id) => {
        console.log(`Movie ${id} is disliked`)
    }

    render() {
        return (
            this.state.movies.length > 0?(
            <div>
                <div>
                    <h1>Showing {this.state.movies.length} {this.state.movies.length === 1? 'movie' : 'movies'} in the database.</h1>  
                </div>
                <table className="table">
                    <thead>
                        <tr className="row">
                            <th className="col text-center">Title</th>
                            <th className="col text-center">Genre</th>
                            <th className="col text-center">Stock</th>
                            <th className="col text-center">Rate</th>
                            <th className="col text-center"></th>
                            <th className="col text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.movies.map(movie => (
                                    <tr className="row" key={movie._id} >
                                        <td className="col text-center">{movie.title}</td>
                                        <td className="col text-center">{movie.genre.name}</td>
                                        <td className="col text-center">{movie.numberInStock}</td>
                                        <td className="col text-center">{movie.dailyRentalRate}</td>
                                        <td className="col text-center">
                                            <HeartLike id={movie._id} onLike={(id) => this.handleMovieLiked(id)} onDislike = {(id) => this.handleMovieDisliked(id)}/>
                                        </td>
                                        <td className="col text-center">
                                            <button className="btn btn-danger btn-sm" onClick={() => this.handleDeleteMovie(movie._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table> 
            </div>) : (
                <div>
                    <div>
                        <h1> No movies to show</h1>
                    </div>
                </div>
            )
        )
    }
}
