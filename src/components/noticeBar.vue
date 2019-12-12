<template>
  <a-popover
    v-if="loginStatus"
    v-model="visible"
    trigger="click"
    placement="bottom"
    :get-popup-container="() => $refs.noticeRef.parentElement"
    :overlay-style="{ width: '400px' }"
  >
    <div
      slot="content"
      style="max-height: 600px; overflow: hidden; padding: 14px 14px 11px 14px; transition: .4s ease;"
    >
      <a-spin :spinning="loadding">
        <div>
          <div
            style="padding: 0 4px 6px 4px;"
          >
            <span class="my-icon-button">
              消息
            </span>
            <div class="my-icon-container">
              <a-tooltip title="全部已读">
                <span
                  class="my-icon-button"
                  @click="()=>{messages=[]}"
                >
                  <a-icon
                    style="font-size: 16px; padding: 4px"
                    type="check"
                  />
                </span>
              </a-tooltip>
              <a-tooltip title="刷新">
                <span
                  class="my-icon-button"
                  @click="refresh"
                >
                  <a-icon
                    style="font-size: 16px; padding: 4px"
                    type="reload"
                  />
                </span>
              </a-tooltip>
            </div>
          </div>
          <div
            v-show="pageIndex > 1"
            class="my-icon-button"
            style="text-align: center; font-size: 10px; padding-top: 3px;"
            @click="()=>{ pageIndex-=1 }"
          >
            <a-icon type="up-circle" />
          </div>
          <a-empty
            v-if="!messages.length > 0"
            description="没有新消息哦"
          >
            <div style="margin-bottom: 23px;" />
          </a-empty>
          <div
            v-for="(msg,idx) in messages.slice((pageIndex-1)*6, pageIndex*6)"
            :key="idx"
            class="my-msgbig-item"
          >
            <div style="background: #2B2828; padding: 10px 16px; border-radius: 6px 0 0 6px; text-align: center; ">
              <a-icon
                type="message"
                theme="filled"
              />
            </div>
            <div
              class="my-message-item"
            >
              <div style="display: flex;">
                <span class="my-message-title">
                  {{ msg.title }}
                </span>
                <span style="font-size: 12px; font-weight:lighter; color: #ECECEC;">
                  {{ msg.time }}
                </span>
              </div>
              <div class="my-message-content">
                {{ msg.content }}
              </div>
            </div>
          </div>
        </div>
      </a-spin>
      <div
        v-show="messages.length > pageIndex * 6"
        class="my-icon-button"
        style="text-align: center; font-size: 10px; padding-top: 3px;"
        @click="()=>{ pageIndex+=1 }"
      >
        <a-icon type="down-circle" />
      </div>
    </div>
    <span
      ref="noticeRef"
      class="header-notice"
    >
      <a-badge
        :dot="messages.length > 0"
        :offset="['-2', '2']"
        :number-style="{fontSize: '12px', boxShadow: '0 0 0 1px #690000', background: '#E40000'}"
      >
        <a-icon
          style="font-size: 16px; padding: 4px;"
          type="bell"
        />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AvatarNotice',
  props: {
    avatarSize: {
      type: Number,
      default: 64
    }
  },
  data () {
    return {
      loadding: false,
      visible: false,
      pageIndex: 1,
      messages: []
    }
  },
  computed: {
    ...mapGetters(['loginStatus'])
  },
  watch: {
    avatarSize () {
      if (this.visible === true) {
        this.visible = false
      }
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.loadding = true
      setTimeout(() => {
        this.loadding = false
        this.messages = [
          {
            title: '欢迎来到otsu',
            content: '您已经成功注册了otsu哟~',
            time: '不久之前'
          },
          {
            title: '公告',
            content: '网站开发中，有问题找PurePeace/Explosive！',
            time: '明天'
          }
        ]
        this.x = [
          {
            title: '比赛报名成功',
            content: '您已成功报名参加本次oclc s9比赛',
            time: '5分钟前'
          },
          {
            title: '咕咕警告',
            content: '您的鸽子次数已达三次，若继续鸽子您将被禁赛',
            time: '两天前'
          },
          {
            title: '邀约 from @Explosive',
            content: '今晚我在osu!mp会所二号房等你，房间密码是114514，如果你来了，我就跟你做那些……',
            time: '一年前'
          },
          {
            title: '邀约 from @Prophet',
            content: '来试图啊',
            time: '两年前'
          },
          {
            title: '恭喜您卫冕冠军',
            content: '您和您的队伍在本届oclc s4中获得冠军，恭喜！',
            time: '三年前'
          },
          {
            title: '欢迎',
            content: 'PurePeace，欢迎来到o!t~',
            time: '三年前'
          },
          {
            title: '测试更多消息1',
            content: '内容',
            time: '未知'
          },
          {
            title: '测试更多消息2',
            content: '内容',
            time: '未知'
          },
          {
            title: '测试更多消息3',
            content: '内容',
            time: '未知'
          },
          {
            title: '测试更多消息4',
            content: '内容',
            time: '未知'
          },
          {
            title: '测试更多消息5',
            content: '内容',
            time: '未知'
          },
          {
            title: '测试更多消息6',
            content: '内容',
            time: '未知'
          },
          {
            title: '测试更多消息7',
            content: '内容',
            time: '未知'
          },
          {
            title: '测试更多消息8',
            content: '内容',
            time: '未知'
          },
          {
            title: '测试更多消息9',
            content: '内容',
            time: '未知'
          },
          {
            title: '测试更多消息10',
            content: '内容',
            time: '未知'
          },
          {
            title: '测试更多消息11',
            content: '内容',
            time: '未知'
          }
        ]
      }, 500)
    }
  }
}
</script>

<style>
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
    flex: 1;
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
