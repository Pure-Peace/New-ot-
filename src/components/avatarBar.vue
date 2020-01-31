<template>
  <a-popover
    v-if="loginStatus===true"
    v-model="visible"
    trigger="click"
    placement="bottom"
    :get-popup-container="() => $refs.avatarRef.parentElement"
    :overlay-style="{ width: '150px'}"
  >
    <div
      slot="content"
      style="overflow: hidden; user-select: none;"
    >
      <div
        style="background-size: cover !important; height: 150px; border-radius: 6px 6px 0 0; filter: brightness(.4) blur(0px);"
        :style="loginStatus ? `background-image: url(https://a.ppy.sh/${osuid}?.jpg); `:'background-image: url(https://a.ppy.sh/5084172?.jpg);'"
      />
      <div style="text-align: center; position: absolute; right:0; left:0; top: 124px; font-size: 14px; font-weight: 600; cursor: default;">
        {{ loginStatus ? osuname : '您未登录' }}
      </div>
      <div style="text-align: center; padding: 10px 10px;">
        <div
          class="my-menu-item"
          @click="handleUserpage()"
        >
          个人主页
        </div>
        <div
          class="my-menu-item"
          @click="handleMyTourney()"
        >
          我的比赛
        </div>
        <div
          class="my-menu-item"
          @click="resetPassword()"
        >
          {{ !username?'初始化账户':'修改密码' }}
        </div>
        <div
          class="my-menu-item"
          @click="hendleLogout()"
        >
          退出
        </div>
      </div>
    </div>
    <span
      ref="avatarRef"
      class="act-button"
      style="cursor: auto;"
    >
      <a-avatar
        class="avatar"
        icon="user"
        :size="avatarSize"
        :src="loginStatus ? `https://a.ppy.sh/${osuid}?.jpg` : 'https://a.ppy.sh/5084172?.jpg'"
        style="background-color: #grey; transition: .2s ease-in-out;cursor: pointer;user-select: none;"
        @mousedown="(e)=>{e.preventDefault()}"
      />
    </span>
  </a-popover>
  <a-popover
    v-else
    v-model="visible"
    trigger="click"
    placement="bottom"
    :get-popup-container="() => $refs.avatarRef.parentElement"
    :overlay-style="{ width: '320px'}"
  >
    <div
      slot="content"
      style="overflow: hidden; padding: 20px 25px;"
    >
      <div style="font-weight: lighter; margin-bottom: 5px; vertical-align: center; line-height: 16px;">
        现在登录到o!t！
        <a-tooltip title="更多说明">
          <a-icon
            style="float: right; padding: 0 2px;"
            type="question-circle"
            class="act-button"
          />
        </a-tooltip>
      </div>
      <a-spin
        :delay="100"
        :spinning="logining"
        size="small"
      >
        <div>
          <div style="padding: 20px 0; font-size: 12px;">
            <input
              ref="username"
              placeholder="o!t用户名"
              style="transition: .8s ease; width: 100%; outline: none; background: #1F1F1F; border: 0px solid rgba(204, 174, 112, 0.8); border-radius: 6px; padding: 8px 10px;"
              :style="`border: 2px solid ${color};`"
            >
            <input
              ref="password"
              placeholder="o!t密码"
              type="password"
              style="transition: .8s ease; margin-top: 10px; width: 100%; outline:none; background: #1F1F1F; border: 0px solid rgba(204, 174, 112, 0.8); border-radius: 6px; padding: 8px 10px;"
              :style="`border: 2px solid ${color};`"
            >
          </div>

          <div style="margin-top: 12px; margin-bottom: 10px; display: flex; font-weight: bold; font-size: 12px;">
            <span
              class="login-action-button button-pink"
              style="flex: 1;"
              @click="toWebLink()"
            >
              用osu!账户登录
              <a-icon
                style="margin-left: 4px; color: #FFFFFF;"
                type="heart"
              />
            </span>

            <span
              class="login-action-button button-blue"
              style="margin-left: 12px;"
              @click="handleUserLogin()"
            >
              登录
              <a-icon
                style="margin-left: 4px; color: #FFFFFF;"
                type="login"
              />
            </span>
          </div>
        </div>
      </a-spin>
    </div>
    <span
      ref="avatarRef"
      class="login-button"
      :style="avatarSize===64?'padding: 10px 18px; background-color: rgba(200, 43, 116, 0.455);':'font-size: 13px; padding: 7px 15px; background-color: rgba(207, 107, 154, 0.511);'"
    >
      sign in~
    </span>
  </a-popover>
</template>

<script>
import $backend from '@/backend'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderNotice',

  props: {
    avatarSize: {
      type: Number,
      default: 64
    }
  },
  data () {
    return {
      color: 'transparent',
      logining: false,
      visible: false
    }
  },
  computed: {
    ...mapGetters(['loginStatus', 'osuname', 'osuid', 'username', 'token'])
  },
  watch: {
    avatarSize () {
      if (this.visible === true) {
        this.visible = false
      }
    }
  },

  methods: {
    toWebLink () {
      // window.open(`${this.global.osuOAuthLink}${this.$route.name}`)
      this.logining = true
      window.location.href = this.global.osuOAuthLink + this.$route.name
      this.showMsg('success', '正在跳转', '即将跳转到osu!官方链接进行用户认证，请稍作等待。如果您所在网络打开osu!官网的速度较慢，等待时间会稍长。如果osu!官网抽风，有可能会打不开...届时请您重试~')
      this.$message.success('正在打开登录链接，请稍候')
      setTimeout(() => {
        this.logining = false
      }, 8000)
      // window.parent.close()
    },
    handleUserLogin () {
      const username = this.$refs.username.value.trim()
      const password = this.$refs.password.value.trim()
      if (username.length > 1 && password.length > 4) {
        this.logining = true
        $backend.loginByAccount(
          username, password
        ).then(responseData => {
          if (responseData.status === 1) {
            this.logining = false
            this.color = '#2ECC71'
            this.$store.commit('userLogin', responseData)
            this.$socket.io.opts.query = { 'otsu_token': this.token, 'osuid': this.osuid }
            this.$socket.connect()
            this.visible = false
            this.showMsg('success', '\\*^o^*//登录成功啦', `${responseData.data.userInfo.osuname}酱，欢迎来到o!t~`)
          } else if (responseData.status === -1) {
            this.logining = false
            this.color = '#E74C3C'
            this.showMsg('error', '(⊙ˍ⊙)登录失败啦', `${responseData.message}`)
          }
          this.resetColor()
        }).catch(error => {
          console.log(error.message)
          this.logining = false
          this.color = '#E74C3C'
          this.resetColor()
          this.showMsg('error', '(๑・ˍ・)登录失败啦', `♪(^∇^*)登录失败，${error.message}。`)
        })
      } else {
        this.logining = false
        this.color = '#F1C40F'
        this.resetColor()
        this.showMsg('warning', '(｡í _ ì｡)登录信息不合法', 'o(*≧▽≦)ツ┏━┓请填写完整且正确的用户登录信息。')
      }
    },
    showMsg (type, title, content) {
      this.$notification[type]({
        message: title,
        description: content,
        placement: 'bottomRight',
        duration: 7,
        style: {
          width: '500px',
          marginLeft: `${335 - 500}px`
        }
      })
    },
    resetColor () {
      setTimeout(() => {
        this.color = 'transparent'
      }, 1500)
    },
    hendleLogout () {
      this.visible = false
      let that = this
      this.$confirm({
        title: '真的要登出嘛..？',
        content: '(๑•ᴗ•๑)♡ 按下确定就可以退出了哦！',
        onOk () {
          that.$store.commit('userLogout')
          that.$socket.disconnect()
          that.$message.success('您已登出成功啦，欢迎下次再来！')
        },
        onCancel () {}
      })
    },
    handleUserpage () {
      this.visible = false
      this.$message.warning('此功能开发中，敬请期待~')
    },
    handleMyTourney () {
      this.visible = false
      this.$message.warning('此功能开发中，敬请期待~')
    },
    resetPassword () {
      this.visible = false
      this.$router.push({ name: 'setting' })
    }
  }
}
</script>

<style>
  .login-action-button {
    text-shadow: 0 0px 3px #1d1d1d8a;
    text-align: center;
    padding: 10px 22px;
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
    transition: .2s ease;
    background-image: url('~@/assets/button.svg');
    background-attachment:scroll;
    background-size: 250%;
    background-position-x: 0px;
  }
  .login-action-button:hover {
    background-position-x: -20px !important;
  }
  .button-pink {
    background-color: #EA5197;
    box-shadow: 0 2px #86385b, 0 2px 2px #000;
  }
  .button-pink:hover {
    background-color: #F071AB;
  }
  .button-pink:active {
    box-shadow: 0 1px #86385b, 0 2px 2px #000 !important;
    transform: translateY(2px);
  }
  .button-blue {
    background-color: #108BDD;
    box-shadow: 0 2px #0B5383 !important;
  }
  .button-blue:hover {
    background-color: #3DA3E7;
  }
  .button-blue:active {
    box-shadow: 0 1px #0B5383 !important;
    transform: translateY(2px);
  }
  .login-button {
    user-select: none;
    border-radius: 6px;
    margin-left: 15px;
    color: #E2DEDE;
    text-shadow: 0 0px 3px #1b1a1a23;
  }
  .login-button:hover {
    background-color: rgba(200, 43, 116, 0.6) !important;
    color: #F5F5F5 !important;
    box-shadow: 0 2px 2px #201c1c0c;
  }
  .header-notice-wrapper {
    margin-left: 15px;
  }
  .my-message-item {
    background: #3E3535;
    padding: 6px 12px;
    flex: 1;
    overflow: hidden;
    max-height: 52px;
    min-height: 41px;
    transition: .3s ease;
    border-radius: 2px 6px 6px 2px;
  }
  .my-msgbig-item {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 6px 2px;
    transition: .3s ease;
  }
  .my-msgbig-item:hover .my-message-item{
    background: #524545;
  }
  .my-message-title {
    font-weight: bold;
    color: #E2C4D1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .my-message-content {
    color: #F2F2F2;
    font-weight: lighter;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .my-icon-container {
    position: absolute;
    top: 0;
    right: 0;
  }
  .my-icon-button {
    transition: .3s ease;
    cursor: pointer;
  }
  .my-icon-button:hover {
    color: #E2C4D1;
  }
  .user-wrapper {
    display: flex;
    justify-content: center;
    align-items:center;

  }
  .act-button {
    cursor: pointer;
    padding: 0 16px;
    transition: all 0.3s;
  }
  .act-button:hover {
    color: #E0B8CA;
  }
  .avatar{
    box-shadow: 0 0 0 2px #F9E493;
  }
  .avatar:hover{
    box-shadow: 0 0 0 3px #FFFBEA;
  }
  .my-menu-item {
    border-radius: 6px;
    margin-bottom: 3px;
    padding: 4px 2px;
    cursor: pointer;
    transition: .3s ease;
  }
  .my-menu-item:hover {
    background: #433939;
  }
</style>
<style lang="less" scoped>
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
