const httpService = require('./httpService')
const config = require('./config.json')

const apiEndpoint = config.API_BASE_URI + '/users'

const register = async ({email, password, name}) => {
  return httpService.post(apiEndpoint, {email, password, name})
}

module.exports = {
  register
}