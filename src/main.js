import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import './antd-custom.less'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import smoothscroll from 'smoothscroll-polyfill'

import VueSocketIO from 'vue-socket.io'

import global from './global'
import Bus from './bus'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8080' //

}))

smoothscroll.polyfill()
Vue.prototype.global = global

Vue.use(Antd)
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
