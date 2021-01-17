const httpService = require('./httpService')
const config = require('./config.json')

const apiEndpoint = config.API_BASE_URI + '/genres'

const getGenres = async () => {
  const response = await httpService.get(apiEndpoint)
  return response.data
}

module.exports = {
  getGenres
}