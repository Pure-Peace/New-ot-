<template>
  <div
    style="padding: 30px 60px;"
  >
    <div style="margin: 20px auto 0 auto; width: 85%; text-align: center; height: 100%; padding: 50px; border-radius: 8px 8px 0 0; background-color: #272023; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div style="font-size: 42px; font-weight: lighter;">
        聊天大厅
      </div>
      <div style="font-size: 16px; font-weight: lighter; padding: 15px 0;  color: #E8DBDB;">
        这里是施工现场（还没做完）
      </div>

      <div
        v-if="loginStatus"
        style="background-color: #231E20; padding: 15px;"
      >
        <span style="padding: 10px; font-weight: lighter; color: #E8DBDB;">在线人数：{{ userCount }}, 连接数：{{ onlineCount }}</span>

        <div
          style="margin: 9px auto; padding: 10px; text-align: center; width: 50%;"
        >
          <span
            v-for="ussr in userList"
            :key="ussr"
          >
            <a-tooltip>
              <a-avatar
                class="avatar chat-avatar"
                :src="`https://a.ppy.sh/${ussr}?.jpg`"
              />
              <a
                slot="title"
                :href="`https://osu.ppy.sh/users/${ussr}`"
              >
                https://osu.ppy.sh/users/{{ ussr }}
              </a>
            </a-tooltip>
          </span>
        </div>
      </div>
    </div>

    <div style="margin: 0 auto 60px auto; width: 85%; padding: 50px 70px 20px 70px; border-radius: 0 0 8px 8px; background-color: #231D20; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div
        v-if="loginStatus"
        style="width: 50%; background-color: #302A2E; padding: 20px 0; border-radius: 10px; margin: 0 auto; min-width: 650px; height: 1000px;"
      >
        <div
          id="messages"
          style="height: 860px; overflow: auto;"
        >
          <div
            v-for="(data, idx) in contents"
            :key="idx"
            class="item-main"
            :class="data.from===osuid?'item-right':'item-left'"
          >
            <div>
              <div :class="data.from===osuid?'item-right':'item-left'">
                <a-tooltip>
                  <a-avatar
                    class="avatar chat-avatar"
                    :src="`https://a.ppy.sh/${data.from}?.jpg`"
                  />
                  <a
                    slot="title"
                    :href="`https://osu.ppy.sh/users/${data.from}`"
                  >去主页
                  </a>
                </a-tooltip>
                <div class="chat-nick">
                  <a
                    style="color: #FAFAFA;"
                    :href="`https://osu.ppy.sh/users/${data.from}`"
                  >{{ data.nick }}</a>
                </div>
              </div>
              <div
                class="chat-msg"
                :class="data.from===osuid?'chat-msg-right':'chat-msg-left'"
              >
                {{ data.msg }}
              </div>
            </div>
          </div>
        </div>

        <div style="width: 100%; background-color: #423D40; padding: 10px; border-radius: 0 0 10px 10px; height: 120px; display: flex;">
          <input
            ref="chatMessage"
            style="padding: 20px; background-color: #1C1719; flex: 1;"
            placeholder="按回车可以发送"
            @keyup.enter="sendMsg"
          >
          <div style="width: 20%; text-align: center;">
            <span
              class="my-button-span my-hover1"
              style="background-color: #EA5197; box-shadow: 0 4px #86385b, 0 2px 2px #000; font-size: 12px;"
              @click="sendMsg"
            >
              发送
            </span>
            <div style="margin-top: 20px;">
              <span style="padding: 8px; font-size: 12px;">自动滚屏</span>
              <a-switch
                default-checked
                @change="doFuck=!doFuck"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        style="text-align: center;"
      >
        <div style="font-size: 28px; padding: 15px;">
          您尚未登录，请先登录。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $backend from '@/apis/backend'
import { mapGetters } from 'vuex'

export default {
  sockets: {
    otClient_msg (data) {
      this.contents.push(data)
      if (this.doFuck) {
        this.fuck()
      }
    },
    otServer_stat (data) {
      if (data.c) { this.onlineCount = data.c }
      if (data.u) { this.userCount = data.u }
      if (data.r) { this.userList = data.r }
    },
    otServer_msg (data) {
      this.$message.info(data.msg)
    },
    connect () {
      this.$socket.emit('otClient_joinRoom', { room: 'lobby' })
      this.$socket.emit('otServer_stat')
      setInterval(() => {
        this.$socket.emit('otServer_stat')
      }, 5000)
    },
    disconnect () {
    }
  },
  data () {
    return {
      timer: false,
      contents: [
        { from: '5084172', nick: 'PurePeace', msg: '欢迎来到匹配大厅，目前尚未完工，也没有聊天记录功能，呜呜呜~' }
      ],
      onlineCount: '0',
      userCount: '0',
      userList: [],
      logined: true,
      doFuck: true
    }
  },
  computed: {
    ...mapGetters(['loginStatus', 'osuid', 'token', 'username', 'authorize', 'socketioStatus'])
  },
  mounted () {
    this.checkLogin()
    if (this.socketioStatus === true) {
      this.$socket.emit('otClient_joinRoom', { room: 'lobby' })
      this.$socket.emit('otServer_stat')
      setInterval(() => {
        this.$socket.emit('otServer_stat')
      }, 5000)
    }
  },
  methods: {
    checkLogin () {
      if (!this.authorize) {
        this.showMsg('error', '那啥...这要登录的', '您还没有登录。')
        this.$message.error('那啥，您还没登录，所以无法使用聊天室。')
      } else if (this.username) {
        this.logined = true
      }
    },
    sendMsg () {
      if (this.$refs.chatMessage && this.$refs.chatMessage.value) {
        const message = this.$refs.chatMessage.value
        this.$socket.emit('otClient_sendRoomMessage', { room: 'lobby', message })
        this.$refs.chatMessage.value = ''
      }
    },
    fuck () {
      this.$nextTick(() => {
        var container = this.$el.querySelector('#messages')
        container.scrollTop = container.scrollHeight
      })
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

<style scoped>
.chat-avatar {
  height: 40px; width: 40px; transition: .4s ease; cursor: pointer;
}

.item-main {
  display: flex; margin-bottom: 10px; padding: 10px 30px;
}
.item-right {
  display: flex; flex-direction: row-reverse;
}
.item-left {
  display: flex; flex-direction: row;
}
.chat-nick {
  line-height: 40px; padding: 0 10px;
}
.chat-msg {
  border-radius: 12px; display: flex; background: #efefef; min-height: 25px; padding: 9px 10px; align-items: center; color: #222121;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.chat-msg-right {
  margin-right: 45px;
}
.chat-msg-left {
  margin-left: 45px;
}
</style>
