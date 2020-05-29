import $axios from './requester'

const eloApi = 'http://api.osuwiki.cn:5005/api'
const otsuApi = 'http://otsu.fun:9529'
const newEloApi = 'http://47.101.168.165:5004'
// const otsuApi = 'http://localhost:9529' // dev

export default {
  fetchRanking (page) {
    return $axios.get(`${eloApi}/pages/eloRanking/${page}`)
      .then(response => response.data)
  },

  fetchRecentBoard () {
    return $axios.get(`${eloApi}/pages/topPlayer`)
      .then(response => response.data)
  },

  fetchWiki () {
    return $axios.get('http://osu.miya.ink/wiki.html')
      .then(response => response.data)
  },

  fetchNews () {
    return $axios.get(`${eloApi}/pages/news`)
      .then(response => response.data)
  },

  fetchHomeStatus () {
    return $axios.get(`${eloApi}/pages/count`)
      .then(response => response.data)
  },
  searchRanking (userkey) {
    return $axios.get(`${eloApi}/users/ranking_by_username/${userkey}`)
      .then(response => response.data)
  },
  fetchUserDataApi (userKey) {
    return $axios.get(`https://osu.ppy.sh/api/get_user?k=be203f26a7158476e26f384d425074d32e0eb74f&u=${userKey}`)
      .then(response => response.data)
  },
  fetchTourneyList () {
    return $axios.get(`${eloApi}/matches`)
      .then(response => response.data)
  },
  fetchMatchInfo (matchId) {
    return $axios.get(`${eloApi}/matches/${matchId}`)
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
    return $axios.post(`${otsuApi}/setLoginAccount`, { username: username, password: password }, { headers: { 'X-OtsuToken': token, Osuid: osuid } })
      .then(response => response.data)
  },
  loginStatusChecker (token, osuid) {
    return $axios.post(`${otsuApi}/loginStatusChecker`, {}, { headers: { 'X-OtsuToken': token, Osuid: osuid } })
      .then(response => response.data)
  },
  eloGetUserByOsuName (username) {
    return $axios.get(`${eloApi}/users/ranking_by_username/${username}`)
      .then(response => response.data)
  },
  eloGetUserByOsuId (osuid) {
    return $axios.get(`${eloApi}/users/ranking_by_user_id/${osuid}`)
      .then(response => response.data)
  },
  getCostFormulas (token, osuid) {
    var headers = {}
    if (token && token.length > 1 && osuid && osuid.length > 1) {
      headers = { headers: { 'X-OtsuToken': token, Osuid: osuid } }
    }
    return $axios.post(`${otsuApi}/costFormulaGet`, {}, headers)
      .then(response => response.data)
  },
  costCalculator (data) {
    return $axios.post(`${otsuApi}/costCalculator`, data)
      .then(response => response.data)
  },
  getEwc () {
    return $axios.get(`${eloApi}/tourney/ewc`)
      .then(response => response.data)
  },
  getMappool (tourneyName) {
    return $axios.get(`${eloApi}/mappool/mplist/${tourneyName}`)
      .then(response => response.data)
  },
  test1 () {
    return $axios.get(`${newEloApi}/mappool`)
      .then(response => response.data)
  },
  getOsuData (osuid, action = 'simple') {
    return $axios.get(`${otsuApi}/getPlayerDataV1?playerKey=${osuid}&action=${action}`)
      .then(response => response.data.data)
  },
  getMappoolRating (mappoolName, headers = { osuid: 0, 'X-OtsuToken': 0 }) {
    return $axios.get(`${newEloApi}/mappool/${mappoolName}/rating`, { headers })
      .then(response => response.data)
  },
  handleSubmitMappoolRating (mappoolName, data = { rating: 5 }, headers = { osuid: 0, 'X-OtsuToken': 0 }) {
    data.submitter = headers.osuid
    return $axios.post(`${newEloApi}/mappool/${mappoolName}/rating`, data, { headers })
      .then(response => response.data)
  },
  handleGetMappoolComments (mappoolName) {
    return $axios.get(`${newEloApi}/mappool/${mappoolName}/comments`)
      .then(response => response.data)
      .catch(err => { console.log(err); return [] })
  },
  handleSubmitMappoolComment (mappoolName, data = { comment: '好评如潮。', reply: 0 }, headers = { osuid: 0, 'X-OtsuToken': 0 }) {
    data.submitter = headers.osuid
    return $axios.post(`${newEloApi}/mappool/${mappoolName}/comments`, data, { headers })
      .then(response => response.data)
  },
  handleDeleteMappoolComment (commentId, headers = { osuid: 0, 'X-OtsuToken': 0 }) {
    return $axios.delete(`${newEloApi}/mappool/{mappool_name}/comments?comment_id=${commentId}`, { headers })
      .then(response => response.data)
  }
}
