const axios = require('axios')
const { toast } = require('react-toastify')
const logger = require('./logger')

axios.interceptors.response.use(response => {
  return response
}, error => {
  const expectedError = statusCode => statusCode >= 400 && statusCode < 500
  
  if(!expectedError(error.response && error.response.status))
  {
    logger.log({error})
    toast.error("unexpected error occured")
  }
  return Promise.reject(error)
});

const setAuthToken = (token) => {
  axios.defaults.headers.common['x-auth-token'] = token
}

module.exports = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setAuthToken
}