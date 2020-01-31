<template>
  <div
    style="padding: 30px 60px;"
  >
    <div style="margin: 20px auto 0 auto; width: 85%; text-align: center; height: 100%; padding: 50px; border-radius: 8px 8px 0 0; background-color: #272023; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div style="font-size: 42px; font-weight: lighter;">
        匹配大厅
      </div>
      <div style="font-size: 16px; font-weight: lighter; padding: 15px 0;  color: #E8DBDB;">
        这里是施工现场（还没做完）
      </div>
    </div>

    <div style="margin: 0 auto 60px auto; width: 85%; text-align: center; padding: 0 70px 20px 70px; border-radius: 0 0 8px 8px; background-color: #231D20; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div
        v-if="logined"
        style="padding: 20px;"
      >
        {{ socketioStatus===true?'已连接上服务器':'已断开连接' }}
        <div style="position: relative; background-color: green; padding: 20px 0; border-radius: 10px; margin-top: 50px; height: 1000px;">
          <div
            v-for="(content, idx) in contents"
            :key="idx"
          >
            {{ content }}
          </div>
          <div style="position: absolute; bottom: 0; width: 100%; background-color: red; padding: 15px; border-radius: 0 0 10px 10px; height: 180px; display: flex;">
            <div style="padding: 20px; background-color: blue; flex: 1;">
              gg
            </div>
            <div style="padding: 30px; background-color: green; width: 20%; ">
              <div style="background-color: red; padding: 20px; ">
                发送
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div style="padding: 40px; font-size: 31px;">
          您尚未登录，故无法使用这里。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $backend from '../backend'
import { mapGetters } from 'vuex'

export default {
  sockets: {
    otServer_msg (data) {
      this.contents.push('服务器消息：' + data.msg)
    },
    connect () {
      this.connStatusText = '已连接上服务器'
      console.log(this.$socket)
    },
    disconnect () {
      this.connStatusText = '已断开服务器'
      console.log(this.$socket)
    }
  },
  data () {
    return {
      logined: true,
      contents: []
    }
  },
  computed: {
    ...mapGetters(['loginStatus', 'osuid', 'token', 'username', 'authorize', 'socketioStatus'])
  },
  mounted () {
    // this.checkLogin()
    console.log(this.$socket)
  },
  methods: {
    checkLogin () {
      if (!this.authorize) {
        this.showMsg('error', '那啥...这要登录的', '您还没有登录，三秒后跳转回首页。')
        this.$message.error('那啥，您还没登录，所以无法使用聊天室。')
        setTimeout(() => {
          this.$router.push({ name: 'home' }).catch(err => { return err })
        }, 3400)
      } else if (this.username) {
        this.logined = true
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
