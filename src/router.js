import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, form, savedPosition) {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  },
  routes
})
