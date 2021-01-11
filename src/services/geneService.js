const httpService = require('./httpService')
const config = require('./config.json')

const getGenres = async () => {
  const response = await httpService.get(config.API_BASE_URI + config.GENRES_PATH)
  return response.data
}

module.exports = {
  getGenres
}