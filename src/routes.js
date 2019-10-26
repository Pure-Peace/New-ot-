import home from '@/views/home'
import tourney from '@/views/tourney'
import ranking from '@/views/ranking'

export default [
  {
    path: '/home',
    name: 'home',
    title: '主页',
    component: home
  },
  {
    path: '/tourney',
    name: 'tourney',
    title: '比赛',
    component: tourney
  },
  {
    path: '/ranking',
    name: 'ranking',
    title: '排名',
    component: ranking
  },
  { path: '*', redirect: '/home' }
]
