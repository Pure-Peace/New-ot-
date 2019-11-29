import home from '@/views/home'
import tourney from '@/views/tourney'
import ranking from '@/views/ranking'
import wiki from '@/views/wiki'

export default [
  {
    path: '/home',
    name: 'home',
    title: '主页',
    show: true,
    component: home
  },
  {
    path: '/tourney',
    name: 'tourney',
    title: '比赛',
    show: true,
    component: tourney
  },
  {
    path: '/ranking',
    name: 'ranking',
    title: '排名',
    show: true,
    component: ranking
  },
  {
    path: '/wiki',
    name: 'wiki',
    title: 'wiki',
    show: true,
    component: wiki
  },
  { path: '*', redirect: '/home', show: false }
]
