import React, { Component } from 'react'
import HeartLike from './common/heartLike'
import Pagination from './common/pagination'
import FilterList from './common/filterList'
import Table from './common/table'
import { getMovies, deleteMovie } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import _ from 'lodash'
 
export default class movies extends Component {
    state = {
        movies: [],
        currentPage: 1,
        pageSize: 4,
        genres: [],
        currentGenre: 'All Genres',
        columns: [
            {
                label: 'Title',
                anchor: 'title'
            },
            {
                label: 'Genre',
                anchor: 'genre.name'
            },
            {
                label: 'Stock',
                anchor: 'numberInStock'
            },
            {
                label: 'Rate',
                anchor: 'dailyRentalRate'
            },
            {
                label: '',
                element: movie => <HeartLike id={movie._id} isLiked={movie.liked} onLike={(id) => this.handleMovieLiked(id)} onDislike = {(id) => this.handleMovieDisliked(id)}/>
            },
            {
                label: '',
                element: movie => <button className="btn btn-danger btn-sm" onClick={() => this.handleDeleteMovie(movie._id)}>Delete</button>
            }
        ],
        columnSort: {path: 'title', order: 'asc'}
    }

    componentDidMount = () => {
        const movies = getMovies()
        const genres = ['All Genres', ...getGenres().map(genre => genre.name)]
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
        this.setState({
            currentGenre: genre,
            currentPage: 1
        })
    }

    handleSort = (columnSort) => {
        this.setState({
            columnSort: {path: columnSort.path, order: columnSort.order}
        })
    }

    render() {
        const {
            movies,
            pageSize,
            currentPage,
            genres,
            currentGenre,
            columns,
            columnSort
        } = this.state
        console.log({columnSort})
        const filteredMovies = currentGenre === 'All Genres'? movies : movies.filter(movie => movie.genre.name === currentGenre)
        const moviesCount = filteredMovies.length
        const sortedMovies = _(filteredMovies).orderBy([columnSort.path], [columnSort.order]).value()
        console.log({filteredMovies})
        console.log({sortedMovies})
        const startIndex = (currentPage - 1) * pageSize
        const currentPageMovies = _(sortedMovies).slice(startIndex, startIndex + pageSize).value()
        
        return (
            moviesCount > 0?(
                    <div className="row">
                        <div className="col-2 m-2">
                            <FilterList filters={genres} currentFilter={currentGenre} onFilterChange={(genre) => this.handleFilterChange(genre)}/>
                        </div>
                        <div className="col">
                            <h2>Showing {moviesCount} {moviesCount === 1? 'movie' : 'movies'} in the database.</h2>
                            <Table columns={columns} data={currentPageMovies} columnSort={columnSort} onSort={(columnSort) => this.handleSort(columnSort)}/>
                            <Pagination currentPage={currentPage} itemsCount={moviesCount} pageSize={pageSize} onPageChange={(page) => this.handlePageChange(page)}/>
                        </div>
                    </div>
                ) : (
                <div>
                    <div>
                        <h1> No movies to show</h1>
                    </div>
                </div>
            )
        )
    }
}
