const httpService = require('./httpService')
const config = require('./config.json')

const apiEndpoint = config.API_BASE_URI + '/movies'

const getMovies = async () => {
  const response = await httpService.get(apiEndpoint)
  return response.data
}

const deleteMovie = async (movieId) => {
  await httpService.delete(`${apiEndpoint}/${movieId}`)
}

const createMovie = async (movie) => {
  const response = await httpService.post(apiEndpoint, movie)
  return response.data
}

const updateMovie = async (movieId, movie) => {
  const response = await httpService.put(`${apiEndpoint}/${movieId}`, movie)
  return response.data
}

const getMovie = async (movieId) => {
  const response = await httpService.get(`${apiEndpoint}/${movieId}`)
  return response.data
}

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
  updateMovie,
  getMovie
}