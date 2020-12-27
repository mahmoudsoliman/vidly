import React, { Component } from 'react'
import HeartLike from '../common/heartLike'
import Pagination from '../common/pagination'
import FilterList from '../common/filterList'
import { getMovies, deleteMovie } from '../services/fakeMovieService'
import _ from 'lodash'
 
export default class movies extends Component {
    state = {
        movies: [],
        currentPage: 1,
        pageSize: 4,
        genres: [],
        currentGenre: 'All Genres',
        filteredMovies: []
    }

    componentDidMount = () => {
        const movies = getMovies()
        const genres = ['All Genres', ..._.uniq(movies.map(movie => movie.genre.name))]
        this.setState({ movies, genres, filteredMovies: movies })
    }

    handleDeleteMovie = (id) => {
        deleteMovie(id)
        this.setState({
            movies: getMovies()
        })
    }

    handleMovieLiked = (id) => {
        console.log("Like " + id)
        this.setState({
            movies: this.state.movies.map(movie => {
                return movie._id === id? {
                    ...movie,
                    liked: true
                } : {
                    ...movie
                }
            })
        })
    }

    handleMovieDisliked = (id) => {
        console.log("Dislike " + id)
        this.setState({
            movies: this.state.movies.map(movie => {
                return movie._id === id? {
                    ...movie,
                    liked: false
                } : {
                    ...movie
                }
            })
        })
    }

    handlePageChange = (page) => {
        console.log(page)
        this.setState({
            currentPage: page
        })
    }

    handleFilterChange = (genre) => {
        const filteredMovies = genre === 'All Genres'? this.state.movies : this.state.movies.filter(movie => movie.genre.name === genre)
        this.setState({
            filteredMovies,
            currentGenre: genre,
            currentPage: 1
        })
    }

    render() {
        const {
            movies,
            pageSize,
            currentPage,
            genres,
            filteredMovies,
            currentGenre
        } = this.state

        const moviesCount = filteredMovies.length
        const startIndex = (currentPage - 1) * pageSize
        const currentPageMovies = _(filteredMovies).slice(startIndex, startIndex + pageSize).value()
        
        return (
            moviesCount > 0?(
                <div className="container-fluid">
                    <div className="row">
                        <h1>Showing {moviesCount} {moviesCount === 1? 'movie' : 'movies'} in the database.</h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <FilterList filters={genres} currentFilter={currentGenre} onFilterChange={(genre) => this.handleFilterChange(genre)}/>
                        </div>
                        <div className="col">
                    
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
                                        currentPageMovies.map(movie => (
                                                <tr className="row" key={movie._id} >
                                                    <td className="col text-center">{movie.title}</td>
                                                    <td className="col text-center">{movie.genre.name}</td>
                                                    <td className="col text-center">{movie.numberInStock}</td>
                                                    <td className="col text-center">{movie.dailyRentalRate}</td>
                                                    <td className="col text-center">
                                                        <HeartLike id={movie._id} isLiked={movie.liked} onLike={(id) => this.handleMovieLiked(id)} onDislike = {(id) => this.handleMovieDisliked(id)}/>
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
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <Pagination currentPage={currentPage} itemsCount={moviesCount} pageSize={pageSize} onPageChange={(page) => this.handlePageChange(page)}/>
                    </div>
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
