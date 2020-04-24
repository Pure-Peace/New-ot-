import $axios from '../requester'

const mappoolApi = 'http://47.101.168.165:5004'

export default {
  gg () {
    return $axios.get(`${mappoolApi}/pools`)
      .then(response => response.data)
  },
  getPool (poolName) {
    return $axios.get(`${mappoolApi}/pools/${poolName}`)
      .then(response => response.data)
  },
  getMaps (poolName) {
    return $axios.get(`${mappoolApi}/pools/${poolName}/maps`)
      .then(response => response.data)
  }
}
