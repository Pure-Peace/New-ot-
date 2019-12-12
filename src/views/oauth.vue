<template>
  <div style="padding: 30px 100px;">
    <div
      style="text-align: center; padding: 120px 60px; transition: 2s ease; border-radius: 10px; user-select: none;"
      :style="status===1?'background-color: #2874A6;':status===-1?'background-color: red;':'background-color: #251F21;'"
    >
      <div style="padding-top: 40px;">
        <a-icon
          style="font-size: 96px;"
          :type="iconType"
          :spin="iconType==='sync'?true:false"
        />
      </div>
      <div
        style="font-size: 42px; padding-top: 40px; padding-bottom: 20px; font-weight: lighter;"
      >
        {{ bigTitle }}
      </div>
      <div style="padding-bottom: 40px; font-size: 18px; font-weight: lighter; color: #E8DBDB;">
        <a-icon
          :type="smallIconType"
          style="margin-right: 2px;"
        />
        {{ smallTitle }}
      </div>
    </div>
  </div>
</template>

<script>
import $backend from '../backend'
import { mapGetters } from 'vuex'

export default {

  data () {
    return {
      name: 'home',
      iconType: 'sync',
      smallIconType: 'heart',
      smallTitle: 'Verifying...',
      status: 0,
      bigTitle: '正在验证用户信息...',
      timeout: undefined
    }
  },
  computed: {
    ...mapGetters(['loginStatus', 'username'])
  },
  mounted () {
    if (this.loginStatus !== true) {
      this.doInitial()
    } else {
      this.$message.warning('您已经登录了，无需再次进行信息验证')
      setTimeout(() => {
        this.$router.push({ name: 'home' }).catch(err => { return err })
      }, 400)
    }
  },

  methods: {
    doInitial () {
      if (this.$route.query.code) {
        this.showMsg('smile', '正在向osu!官网验证用户信息哦', '请您耐心等待，众所周知，osu!官网的速度并不快，而且时常抽风……若请求失败，您可以重新尝试。')
        this.timeout = setTimeout(() => {
          this.failed()
        }, 20000)
        $backend.loginByOsuAuth(
          this.$route.query.code
        ).then(responseData => {
          clearTimeout(this.timeout)
          if (responseData.status === 1) {
            this.status = 1
            this.bigTitle = '验证通过'
            this.smallTitle = 'Welcome to o!t~'
            this.smallIconType = 'heart'
            this.iconType = 'check-circle'
            this.$message.success('登录成功~！')
            this.overRequest(responseData)
          } else if (responseData.status === -1) {
            this.$message.error(responseData.info)
            this.failed(responseData)
          } else {
            this.$message.error(responseData.message)
            this.failed(responseData)
          }
        }).catch(error => {
          clearTimeout(this.timeout)
          this.$message.error(`请求失败啦，您可以重新尝试：${error.message}`)
          this.failed()
        })
      } else {
        this.$message.warning('未发现用户授权码，无法验证用户信息，返回至原页面')
        this.failed()
      }
    },
    failed (responseData = undefined) {
      this.status = -1
      this.bigTitle = '验证失败'
      this.smallTitle = 'Oh, what\'s wrong?'
      this.smallIconType = 'fire'
      this.iconType = 'exclamation-circle'
      this.overRequest(responseData)
    },
    checkStatus (responseData) {
      if (this.$route.query.state) {
        this.name = this.$route.query.state
      }
      if (responseData.status === 1) {
        this.$store.commit('userLogin', responseData)
        this.showMsg('success', '\\*^o^*//用osu!账户登录成功啦', `${responseData.data.userInfo.osuname}酱，欢迎来到o!t~`)
        if (!responseData.data.userInfo.username) {
          this.name = 'setting'
        }
      } else {
        this.showMsg('error', responseData.info, responseData.message)
      }
    },
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
        duration: 15,
        placement: 'bottomRight',
        style: {
          width: '500px',
          marginLeft: `${335 - 500}px`
        }
      })
    },
    overRequest (responseData = undefined) {
      if (responseData) {
        this.checkStatus(responseData)
      }
      setTimeout(() => {
        this.$router.push({ name: this.name }).catch(err => { return err })
      }, 3400)
    }
  }
}

</script>

<style>

</style>
