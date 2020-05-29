import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import antdv from 'ant-design-vue'
import './antd-custom.less'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import smoothscroll from 'smoothscroll-polyfill'

import VueSocketIO from 'vue-socket.io'

import global from './global'
import Bus from './bus'

var loginData = JSON.parse(localStorage.getItem('login'))
var token = ''
var osuid = ''

if (loginData && loginData.authorize && loginData.user) {
  token = loginData.authorize.token || ''
  osuid = loginData.user.osuid || ''
}

const vueSocketIo = new VueSocketIO({
  debug: false,
  connection: 'http://otsu.fun:9530/test',
  options: {
    query: {
      otsu_token: token,
      osuid: osuid
    }
  }
})

vueSocketIo.io.on('connect', () => {
  store.commit('setSocketioStatus', true)
})

vueSocketIo.io.on('disconnect', () => {
  store.commit('setSocketioStatus', false)
})

Vue.use(vueSocketIo)

smoothscroll.polyfill()
Vue.prototype.global = global

Vue.use(antdv)
Vue.config.productionTip = false

NProgress.configure({
  easing: 'ease-in-out',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.4
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  Bus.$emit('navChange', to.name)
  global.routeName = [to.name]
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
