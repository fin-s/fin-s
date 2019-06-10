const axios = require('axios')

module.exports = {
  axiosPost: (endpoint, req) => {
  return (axios.post(endpoint, req)
    .then(res => {
      return res.data
    }))
    .catch(err => {
      return err
    })
  }
}