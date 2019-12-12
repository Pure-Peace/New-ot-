<template>
  <div
    v-if="loginStatus"
    style="padding: 30px 60px;"
  >
    <div style="margin: 20px auto 0 auto; width: 85%; text-align: center; height: 100%; padding: 70px; border-radius: 8px 8px 0 0; background-color: #272023; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div style="font-size: 42px; font-weight: lighter;">
        {{ haveInitialed?'修改登录密码':'设置登录用户名及密码' }}
      </div>
      <div style="font-size: 16px; font-weight: lighter; padding: 25px 0;  color: #E8DBDB;">
        {{ haveInitialed?'您已初始化过otsu!登录信息了，您可以在此修改登录密码，用户名修改请联系otsu!开发者。':'设置后，您可以直接使用otsu!用户名及密码登录，不用担心由于osu!官网抽风而导致出现无法登录的情况。' }}
      </div>
    </div>

    <div style="margin: 0 auto 60px auto; width: 85%; text-align: center; height: 67vh; padding: 0 70px 20px 70px; border-radius: 0 0 8px 8px; background-color: #231D20; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <a-spin :spinning="requesting">
        <div>
          <div style="padding: 10px 0; font-size: 12px; min-width: 360px; max-width: 34%; margin: 0 auto 40px auto;">
            <a-icon
              style="font-size: 142px; padding: 30px 0;"
              type="heart"
            />
            <input
              v-if="!haveInitialed"
              ref="username"
              placeholder="o!t用户名"
              style="margin-top: 10px; transition: .8s ease; width: 100%; outline: none; background: #1F1F1F; border: 0px solid rgba(204, 174, 112, 0.8); border-radius: 6px; padding: 14px 10px;"
              :style="`border: 2px solid #D1C3C3;`"
            >
            <input
              ref="password"
              placeholder="o!t密码"
              type="password"
              style="transition: .8s ease; margin-top: 15px; width: 100%; outline:none; background: #1F1F1F; border: 0px solid rgba(204, 174, 112, 0.8); border-radius: 6px; padding: 14px 10px;"
              :style="`border: 2px solid #D1C3C3;`"
            >
          </div>

          <div style="margin-top: 50px; margin-bottom: 10px; display: flex; font-weight: bold; font-size: 12px;">
            <span
              class="login-action-button button-pink"
              style="margin: 0 auto; min-width: 20%; line-height: 30px;"
              @click="handleSetUser()"
            >
              {{ haveInitialed?'修改':'初始化' }}otsu!登录{{ haveInitialed?'密码':'帐户' }}
              <a-icon
                style="margin-left: 4px; color: #FFFFFF;"
                type="heart"
              />
            </span>
          </div>
        </div>
      </a-spin>
    </div>
  </div>
  <div
    v-else
    style="padding: 30px 60px;"
  >
    <div style="margin: 20px auto 0 auto; width: 85%; text-align: center; height: 100%; padding: 70px; border-radius: 8px 8px 0 0; background-color: #272023; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div style="font-size: 42px; font-weight: lighter;">
        {{ haveInitialed?'修改登录密码':'设置登录用户名及密码' }}
      </div>
      <div style="font-size: 16px; font-weight: lighter; padding: 25px 0;  color: #E8DBDB;">
        {{ haveInitialed?'您已初始化过otsu!登录信息了，您可以在此修改登录密码，要修改登录用户名请联系otsu!开发者。':'设置后，您可以直接使用otsu!用户名及密码登录，不用担心由于osu!官网抽风而导致出现无法登录的情况。' }}
      </div>
    </div>

    <div style="margin: 0 auto 60px auto; width: 85%; text-align: center; height: 70vh; padding: 0 70px 20px 70px; border-radius: 0 0 8px 8px; background-color: #231D20; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div style="padding: 80px;">
        <h1>您未登录，故此访问不合法</h1>
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
      requesting: false,
      haveInitialed: false
    }
  },
  computed: {
    ...mapGetters(['loginStatus', 'osuid', 'token', 'username'])
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      if (!this.token.authorize) {
        this.showMsg('error', '此操作需要登录后进行', '您必须登录后再进行此操作，页面将在3秒后跳转至首页。')
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 3400)
      }
      if (this.username) {
        this.haveInitialed = true
        this.showMsg('smile', '您已经设置过了otsu!登录信息', '您可以在此修改密码，但不可以修改登录用户名。若需修改用户名，请联系PurePeace/Explosive。')
      }
    },
    handleSetUser () {
      if (this.loginStatus) {
        const username = this.$refs.username.value.trim()
        const password = this.$refs.password.value.trim()
        if (username.length > 1 && password.length > 7) {
          const token = this.token
          const osuid = this.osuid
          this.requesting = true
          $backend.setLoginAccount(username, password, token, osuid).then(responseData => {
            this.requesting = false
            if (responseData.status === 1) {
              this.$message.success(responseData.message)
              this.showMsg('success', responseData.info, responseData.message)
              if (responseData.info === '设置otsu!登录用户名和密码成功') {
                this.requesting = true
                this.showMsg('info', '成功设置otsu!登录信息', '以后您就可以使用刚才的账户直接登录otsu!啦，妈妈再也不用担心osu!官网抽风了！')
                this.$store.commit('setUsername', username)
                this.requesting = true
              }
              setTimeout(() => {
                this.$router.push({ name: 'home' })
              }, 1200)
            } else {
              this.$message.error(responseData.message)
              this.showMsg('error', responseData.info, responseData.message)
            }
          }).catch(error => {
            console.log(error.message)
            this.requesting = false
            this.showMsg('error', '操作失败了呃', error.message)
          })
        } else {
          this.requesting = false
          this.$message.error('用户名和密码长度不足')
          this.showMsg('smile', '注意用户名和密码的格式！', '用户名最小长度为3位，不允许使用除了下划线和空格以外的其它特殊字符，不过中文是允许的哦。密码必须含有大写字母、小写字母和数字，而且长度至少为8位~')
        }
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

</style>
