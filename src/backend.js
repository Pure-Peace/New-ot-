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
    return $axios.get(`http://47.101.168.165:5005/api/pages/elo/${page}`)
      .then(response => response.data)
  },

  fetchRecentBoard () {
    return $axios.get(`http://47.101.168.165:5005/api/pages/top`)
      .then(response => response.data)
  },

  fetchWiki () {
    return $axios.get(`http://osu.miya.ink/wiki.html`)
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
    return $axios.get(`http://47.101.168.165:5005/api/users/ranking_by_username/${userkey}`)
      .then(response => response.data)
  },

  fetchUserHistory () {
    return $axios.get(`secure-resource/zzz`)
      .then(response => response.data)
  },
  fetchUserDataApi (userKey) {
    return $axios.get(`https://osu.ppy.sh/api/get_user?k=be203f26a7158476e26f384d425074d32e0eb74f&u=${userKey}`)
      .then(response => response.data)
  },
  fetchTourneyList () {
    return $axios.get(`http://47.101.168.165:5005/api/pages/tourney`)
      .then(response => response.data)
  },
  fetchMatchInfo (matchId) {
    return $axios.get(`http://47.101.168.165:5005/api/matches/${matchId}`)
      .then(response => response.data)
  },
  fetchMapInfo (mapId) {
    return $axios.get(`http://47.101.168.165:5005/api/matches/map/${mapId}`)
      .then(response => response.data)
  }
}
