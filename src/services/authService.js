const httpService = require('./httpService')
const jwtDecode = require('jwt-decode').default
const config = require('./config.json')

const apiEndpoint = config.API_BASE_URI + '/auth'
const tokenKey = 'token'

const getJWT = () => {
  return localStorage.getItem(tokenKey)
}

httpService.setAuthToken(getJWT())

const setJWT = (jwt) => {
  localStorage.setItem(tokenKey, jwt)
}

const login = async ({email, password}) => {
  const {data: jwt} = await httpService.post(apiEndpoint, {email, password})
  setJWT(jwt)
}

const logout = () => {
  localStorage.removeItem(tokenKey)
}

const getCurrentUser = () => {
  const jwt = localStorage.getItem(tokenKey)
  if(jwt){
    return jwtDecode(jwt)
  }
  return null
}


module.exports = {
  login,
  logout,
  setJWT,
  getCurrentUser
}