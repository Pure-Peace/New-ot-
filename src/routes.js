import home from '@/views/home'
import tourney from '@/views/tourney'
import ranking from '@/views/ranking'
import wiki from '@/views/wiki'
import oauth from '@/views/oauth'
import setting from '@/views/setting'
import matches from '@/views/matches'
import matchInfo from '@/views/matchInfo'
import users from '@/views/users'
import lobby from '@/views/lobby'

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
    path: '/lobby',
    name: 'lobby',
    title: '大厅',
    show: true,
    component: lobby
  },
  {
    path: '/wiki',
    name: 'wiki',
    title: 'wiki',
    show: true,
    component: wiki
  },
  {
    path: '/oauth',
    name: 'oauth',
    title: 'oauth',
    show: false,
    component: oauth
  },
  {
    path: '/matches/',
    name: 'matches',
    title: 'matches',
    show: false,
    component: matches
  },
  {
    path: '/matches/:matchId',
    name: 'matchInfo',
    title: 'matchInfo',
    show: false,
    component: matchInfo
  },
  {
    path: '/account/setting',
    name: 'setting',
    title: 'setting',
    show: false,
    component: setting
  },
  {
    path: '/users/:userKey',
    name: 'userPage',
    title: 'userPage',
    show: false,
    component: users
  },
  { path: '*', redirect: '/home', show: false }
]
