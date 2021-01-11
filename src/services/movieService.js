const httpService = require('./httpService')
const config = require('./config.json')

const getMovies = async () => {
  const response = await httpService.get(config.API_BASE_URI + config.MOVIES_PATH)
  return response.data
}

const deleteMovie = async (movieId) => {
  await httpService.delete(`${config.API_BASE_URI}${config.MOVIES_PATH}/${movieId}`)
}

const createMovie = async (movie) => {
  const response = await httpService.post(config.API_BASE_URI + config.MOVIES_PATH, movie)
  return response.data
}

const updateMovie = async (movieId, movie) => {
  const response = await httpService.put(`${config.API_BASE_URI}${config.MOVIES_PATH}/${movieId}`, movie)
  return response.data
}

const getMovie = async (movieId) => {
  const response = await httpService.get(`${config.API_BASE_URI}${config.MOVIES_PATH}/${movieId}`)
  return response.data
}

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
  updateMovie,
  getMovie
}