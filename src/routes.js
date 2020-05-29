
export default [
  {
    path: '/home',
    name: 'home',
    title: '主页',
    show: true,
    component: () => import(/* webpackChunkName:"group-home" */ './views/home.vue')
  },
  {
    path: '/results',
    name: 'results',
    title: '战报',
    show: true,
    component: () => import(/* webpackChunkName:"group-results" */ './views/results.vue')
  },
  {
    path: '/mappool',
    name: 'mappool',
    title: '图池',
    show: true,
    component: () => import(/* webpackChunkName:"group-mappool" */ './views/mappool.vue')
  },
  {
    path: '/poolDetail/:poolName',
    name: 'poolDetail',
    title: '图池详情',
    show: false,
    component: () => import(/* webpackChunkName:"group-mappool" */ './views/poolDetail.vue')
  },
  {
    path: '/tourney',
    name: 'tourney',
    title: '比赛',
    show: false,
    component: () => import(/* webpackChunkName:"group-tourney" */ './views/tourney.vue')
  },
  {
    path: '/ranking',
    name: 'ranking',
    title: '排名',
    show: true,
    component: () => import(/* webpackChunkName:"group-ranking" */ './views/ranking.vue')
  },
  {
    path: '/lobby',
    name: 'lobby',
    title: '大厅',
    show: false,
    component: () => import(/* webpackChunkName:"group-lobby" */ './views/lobby.vue')
  },
  {
    path: '/cost',
    name: 'cost',
    title: 'Cost 计算器',
    show: false,
    component: () => import(/* webpackChunkName:"group-cost" */ './views/cost.vue')
  },
  {
    path: '/wiki',
    name: 'wiki',
    title: '百科',
    show: false,
    component: () => import(/* webpackChunkName:"group-wiki" */ './views/wiki.vue')
  },
  {
    path: '/compass',
    name: 'compass',
    title: '罗盘',
    show: true,
    icon: 'dashboard',
    component: () => import(/* webpackChunkName:"group-compass" */ './views/compass.vue')
  },
  {
    path: '/oauth',
    name: 'oauth',
    title: '授权验证',
    show: false,
    component: () => import(/* webpackChunkName:"group-login" */ './views/oauth.vue')
  },
  {
    path: '/matches/',
    name: 'matches',
    title: '对局查找',
    show: false,
    component: () => import(/* webpackChunkName:"group-matches" */ './views/matches.vue')
  },
  {
    path: '/matches/:matchId',
    name: 'matchInfo',
    title: '对局信息',
    show: false,
    component: () => import(/* webpackChunkName:"group-matches" */ './views/matchInfo.vue')
  },
  {
    path: '/account/setting',
    name: 'setting',
    title: '账号设置',
    show: false,
    component: () => import(/* webpackChunkName:"group-setting" */ './views/setting.vue')
  },
  {
    path: '/users/:userKey',
    name: 'userPage',
    title: '用户页面',
    show: false,
    component: () => import(/* webpackChunkName:"group-user" */ './views/users.vue')
  },
  { path: '*', redirect: '/home', show: false }
]
