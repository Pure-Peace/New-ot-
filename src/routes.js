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
import compass from '@/views/compass'
import cost from '@/views/cost'

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
    path: '/cost',
    name: 'cost',
    title: 'Cost 计算器',
    show: false,
    component: cost
  },
  {
    path: '/wiki',
    name: 'wiki',
    title: '百科',
    show: false,
    component: wiki
  },
  {
    path: '/compass',
    name: 'compass',
    title: '罗盘',
    show: true,
    icon: 'dashboard',
    component: compass
  },
  {
    path: '/oauth',
    name: 'oauth',
    title: '授权验证',
    show: false,
    component: oauth
  },
  {
    path: '/matches/',
    name: 'matches',
    title: '对局查找',
    show: false,
    component: matches
  },
  {
    path: '/matches/:matchId',
    name: 'matchInfo',
    title: '对局信息',
    show: false,
    component: matchInfo
  },
  {
    path: '/account/setting',
    name: 'setting',
    title: '账号设置',
    show: false,
    component: setting
  },
  {
    path: '/users/:userKey',
    name: 'userPage',
    title: '用户页面',
    show: false,
    component: users
  },
  { path: '*', redirect: '/home', show: false }
]
