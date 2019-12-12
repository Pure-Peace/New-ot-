import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: {
      user: undefined,
      authorize: null,
      status: false,
      time: undefined,
      info: undefined,
      type: undefined
    }
  },
  getters: {
    osuid: state => state.login.user.osuid,
    osuname: state => state.login.user.osuname,
    username: state => state.login.user.username,
    loginStatus: state => state.login.status,
    loginTime: state => state.login.time,
    loginType: state => state.login.loginType,
    token: state => state.login.authorize.token,
    tokenTime: state => state.login.authorize.timestamp,
    tokenExpires: state => state.login.authorize.timestamp + state.authorize.expires_in,
    authorize: state => state.login.authorize
  },
  mutations: {
    userLogin (state, resp) {
      if (resp.status === 1) {
        const data = resp.data
        state.login.user = data.userInfo
        state.login.authorize = data.authorization
        state.login.status = true
        state.login.time = resp.time
        state.login.info = resp.info
        localStorage.setItem('login', JSON.stringify(state.login))
      }
    },
    userLogout (state) {
      localStorage.removeItem('login')
      state.login = {
        user: undefined,
        authorize: null,
        status: false,
        time: undefined,
        info: undefined,
        type: undefined
      }
    },
    setStateLogin (state, loginData) {
      state.login = loginData
      localStorage.setItem('login', JSON.stringify(state.login))
    },
    setUsername (state, username) {
      state.login.user.username = username
      localStorage.setItem('login', JSON.stringify(state.login))
    }
  },
  actions: {

  }
})
