<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottom"
    overlay-class-name="header-notice-wrapper"
    :get-popup-container="() => $refs.noticeRef.parentElement"
    :overlay-style="{ width: '300px' }"
  >
    <div
      slot="content"
      style="height: 280px; overflow: auto;"
    >
      <a-spin :spinning="loadding">
        <a-tabs>
          <a-tab-pane
            key="1"
            tab="通知"
          >
            <a-list>
              <a-list-item>
                <a-list-item-meta
                  title="你又咕咕了"
                  description="一个月后"
                >
                  <a-avatar
                    slot="avatar"
                    style="background-color: white"
                    src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta
                  title="禁止打假赛"
                  description="10分钟前"
                >
                  <a-avatar
                    slot="avatar"
                    style="background-color: white"
                    src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta
                  title="宣传比赛..."
                  description="一年前"
                >
                  <a-avatar
                    slot="avatar"
                    style="background-color: white"
                    src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"
                  />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta
                  title="宣传比赛..."
                  description="一年前"
                >
                  <a-avatar
                    slot="avatar"
                    style="background-color: white"
                    src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"
                  />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta
                  title="宣传比赛..."
                  description="一年前"
                >
                  <a-avatar
                    slot="avatar"
                    style="background-color: white"
                    src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"
                  />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane
            key="2"
            tab="消息"
          >
            测试消息
          </a-tab-pane>
          <a-tab-pane
            key="3"
            tab="警告"
          >
            恭喜你你，一共咕咕了100次
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </div>
    <span
      ref="noticeRef"
      class="header-notice"
      @click="fetchNotice"
    >
      <a-badge count="0">
        <a-icon
          style="font-size: 16px; padding: 4px"
          type="bell"
        />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
export default {
  name: 'HeaderNotice',
  data () {
    return {
      loadding: false,
      visible: false
    }
  },
  methods: {
    fetchNotice () {
      if (!this.visible) {
        this.loadding = true
        setTimeout(() => {
          this.loadding = false
        }, 1)
      } else {
        this.loadding = false
      }
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="css">
  .header-notice-wrapper {
    margin-left: 15px;
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
