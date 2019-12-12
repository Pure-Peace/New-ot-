<template>
  <a-locale-provider :locale="huohuo">
    <div class="app">
      <a-back-top />
      <top-nav />
      <content-layout />
      <footer-bar />
    </div>
  </a-locale-provider>
</template>

<script>
import topNav from '@/layout/topNav'
import contentLayout from '@/layout/contentLayout'
import footerBar from '@/layout/footerBar'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import $backend from '@/backend'

export default {
  name: 'App',
  components: {
    topNav,
    contentLayout,
    footerBar
  },
  data () {
    return {
      huohuo: zhCN
    }
  },
  beforeCreate () {
    const loginString = localStorage.getItem('login')
    if (loginString) {
      // load first
      const loginData = JSON.parse(loginString)
      this.$store.commit('setStateLogin', loginData)
      // then check
      $backend.loginStatusChecker(
        loginData.authorize.token,
        loginData.user.osuid
      ).then(responseData => {
        if (responseData.status === 1 || responseData.info === '登录验证成功') {
          loginData.authorize.tokenTime = responseData.data.tokenTime
          this.$store.commit('setStateLogin', loginData)
        } else if (responseData.status === -1 || responseData.info === '登录验证失败') {
          this.$store.commit('userLogout')
          this.$message.warning('登录信息过期惹，需要重新登录哦')
          this.showMsg('info', '登录信息过期啦，请重新登录~', '出现这种情况的原因可能有三种：1、登录令牌过期，2、otsu!后端验证服务器关闭，3、登录信息被人为清除')
        }
      }).catch(error => {
        console.log(error.message)
      })
    }
  },
  methods: {
    showMsg (icon, title, content) {
      if (icon === 'smile') {
        icon = <a-icon type="smile" style="color: #108ee9" />
      } else if (icon === 'success') {
        icon = <a-icon type="check-circle" style="color: #2ECC71" />
      } else if (icon === 'warning') {
        icon = <a-icon type="warning" style="color: #F5B041" />
      } else if (icon === 'error') {
        icon = <a-icon type="close-circle" style="color: red" />
      } else {
        icon = <a-icon type="info-circle" style="color: #108ee9" />
      }
      this.$notification.open({
        message: title,
        description: content,
        icon: icon,
        duration: 20,
        placement: 'bottomRight',
        style: {
          width: '500px',
          marginLeft: `${335 - 500}px`
        }
      })
    }
  }
}
</script>

<style>
  .app {
    height: 100vh;
    font-family: "Microsoft YaHei";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 150px;
    background: #898989;
  }
  ::-webkit-scrollbar-thumb:hover {
    border-radius: 150px;
    background: #4A4A4A;
  }
  ::-webkit-scrollbar-track {
    border-radius: 150px;
    background: #ccc;
  }
  #nprogress .bar{
      background: #FFEC00 !important;
      box-shadow: 0 0 1px 1px #FFFCD3;
      height: 2px !important;
  }
  #nprogress .peg{
      box-shadow: 0 0 10px #FFEC00, 0 0 5px #FFEC00 !important;
  }
  .ant-popover-arrow {
    display: none !important;
  }
  .ant-popover-inner-content {
    padding: 0 0 !important;
  }
  .ant-tooltip-arrow {
    display: none !important;
  }
</style>
