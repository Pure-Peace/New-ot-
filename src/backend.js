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

  fetchRanking (page) {
    return $axios.post(`http://47.101.168.165:5005/api/pages/elo/${page}`)
      .then(response => response.data)
  },

  fetchRecentBoard () {
    return $axios.get(`http://47.101.168.165:5005/api/pages/top`)
      .then(response => response.data)
  },

  fetchNews () {
    return $axios.get(`http://47.101.168.165:5005/api/pages/news`)
      .then(response => response.data)
  },

  fetchHomeStatus () {
    return $axios.get(`http://47.101.168.165:5005/api/pages/status`)
      .then(response => response.data)
  },

  searchRanking (userkey) {
    return $axios.post(`http://47.101.168.165:5005/api/users/ranking_by_username/${userkey}`)
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
