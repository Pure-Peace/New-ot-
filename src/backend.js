import axios from 'axios'

let $axios = axios.create({
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

// Request Interceptor
$axios.interceptors.request.use(function (config) {
  // config.headers['Authorization'] = 'Fake Token'
  return config
})

// Response Interceptor to handle and log errors
$axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // Handle Error
  console.log(error)
  return Promise.reject(error)
})

export default {

  fetchIndex () {
    return $axios.get(`http://47.101.168.165:5002/api/pages/index`)
      .then(response => response.data)
  },

  fetchUserHistory () {
    return $axios.get(`secure-resource/zzz`)
      .then(response => response.data)
  },
  getOsuUserData (userId) {
    return $axios.get(`http://47.101.168.165:5002/api/osu_api/users/${userId}`)
      .then(response => response.data)
  }
}
