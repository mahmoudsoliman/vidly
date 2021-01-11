import React, { Component } from 'react'
import HeartLike from './common/heartLike'
import Pagination from './common/pagination'
import FilterList from './common/filterList'
import Table from './common/table'
import { getMovies, deleteMovie } from '../services/movieService'
import { getGenres } from '../services/geneService'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import SearchBox from './searchBox'
import { toast } from 'react-toastify'
 
export default class movies extends Component {
    state = {
        movies: [],
        currentPage: 1,
        pageSize: 4,
        genres: [],
        currentGenre: 'All Genres',
        searchQuery: "",
        columns: [
            {
                label: 'Title',
                element: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
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

    async componentDidMount () {
        const movies = await getMovies()
        const genres = ['All Genres', ...(await getGenres()).map(genre => genre.name)]
        this.setState({ movies, genres, filteredMovies: movies })
    }

    handleDeleteMovie = async (id) => {
        const originalMovies = this.state.movies
        this.setState({
            movies: this.state.movies.filter(movie => movie._id.toString() !== id.toString())
        })
        try {
            await deleteMovie(id)
        } catch (error) {
            if(error.response && error.response.status === 404)
                toast("This movie does not exist")
            this.setState({
                movies: originalMovies
            })
        }
    }

    handleMovieLiked = (id) => {
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
        this.setState({
            currentPage: page
        })
    }

    handleFilterChange = (genre) => {
        this.setState({
            currentGenre: genre,
            currentPage: 1,
            searchQuery: ""
        })
    }

    handleSort = (columnSort) => {
        this.setState({
            columnSort: {path: columnSort.path, order: columnSort.order}
        })
    }

    handleSearch = (query) => {
        this.setState({
            currentPage: 1,
            currentGenre: null,
            searchQuery: query
        })
    }

    filterMoviesByGenre = (movies, genre) => {
        return (genre === 'All Genres' || _.isNil(genre))? movies 
            : movies.filter(movie => movie.genre.name === genre)
    }

    filterMoviesBySearchQuery = (movies, query) => {
        return _.isEmpty(query)? movies : movies.filter(movie => movie.title.toLowerCase().startsWith(query.toLowerCase()))
    }

    filterMovies = () => {
        const {
            currentGenre,
            searchQuery,
            movies
        } = this.state

        return this.filterMoviesBySearchQuery(this.filterMoviesByGenre(movies, currentGenre), searchQuery)
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

        const filteredMovies = this.filterMovies()
        const moviesCount = filteredMovies.length
        const sortedMovies = _(filteredMovies).orderBy([columnSort.path], [columnSort.order]).value()
        const startIndex = (currentPage - 1) * pageSize
        const currentPageMovies = _(sortedMovies).slice(startIndex, startIndex + pageSize).value()
        
        return (
            movies.length > 0?(
                    <div className="row">
                        <div className="col-2 m-2">
                            <FilterList filters={genres} currentFilter={currentGenre} onFilterChange={(genre) => this.handleFilterChange(genre)}/>
                        </div>
                        <div className="col">
                            <Link to="/movies/new">
                                <button className="btn btn-primary m-2" >New Movie</button>
                            </Link>
                            <h2>Showing {moviesCount} {moviesCount === 1? 'movie' : 'movies'} in the database.</h2>
                            <SearchBox quer={this.state.searchQuery} onChange={(query) => this.handleSearch(query)}/>
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
