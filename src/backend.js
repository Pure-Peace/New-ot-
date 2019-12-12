import axios from 'axios'

let $axios = axios.create({
  timeout: 17000,
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

const eloApi = 'http://api.osuwiki.cn:5005/api'
const otsuApi = 'http://otsu.fun:9529'
// const otsuApi = 'http://localhost:9529' // dev

export default {
  fetchRanking (page) {
    return $axios.get(`${eloApi}/pages/elo/${page}`)
      .then(response => response.data)
  },

  fetchRecentBoard () {
    return $axios.get(`${eloApi}/pages/top`)
      .then(response => response.data)
  },

  fetchWiki () {
    return $axios.get(`http://osu.miya.ink/wiki.html`)
      .then(response => response.data)
  },

  fetchNews () {
    return $axios.get(`${eloApi}/pages/news`)
      .then(response => response.data)
  },

  fetchHomeStatus () {
    return $axios.get(`${eloApi}/pages/status`)
      .then(response => response.data)
  },

  searchRanking (userkey) {
    return $axios.get(`${eloApi}/users/ranking_by_username/${userkey}`)
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
    return $axios.get(`${eloApi}/pages/tourney`)
      .then(response => response.data)
  },
  fetchMatchInfo (matchId) {
    return $axios.get(`${eloApi}/matches/${matchId}`)
      .then(response => response.data)
  },
  fetchMapInfo (mapId) {
    return $axios.get(`${eloApi}/matches/map/${mapId}`)
      .then(response => response.data)
  },
  loginByOsuAuth (osuUserAuthCode) {
    return $axios.post(`${otsuApi}/loginByOsuAuth`, { osuUserAuthCode: osuUserAuthCode })
      .then(response => response.data)
  },
  loginByAccount (username, password) {
    return $axios.post(`${otsuApi}/loginByAccount`, { username: username, password: password })
      .then(response => response.data)
  },
  setLoginAccount (username, password, token, osuid) {
    return $axios.post(`${otsuApi}/setLoginAccount`, { username: username, password: password }, { headers: { 'X-OtsuToken': token, 'Osuid': osuid } })
      .then(response => response.data)
  },
  loginStatusChecker (token, osuid) {
    return $axios.post(`${otsuApi}/loginStatusChecker`, { }, { headers: { 'X-OtsuToken': token, 'Osuid': osuid } })
      .then(response => response.data)
  }
}
