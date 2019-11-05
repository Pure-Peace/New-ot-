<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottom"
    :get-popup-container="() => $refs.avatarRef.parentElement"
    :overlay-style="{ width: '150px'}"
  >
    <div
      slot="content"
      style="overflow: hidden;"
      @mousedown="(e)=>{e.preventDefault()}"
    >
      <div style="background: url(https://a.ppy.sh/5084172?.jpg) center; background-size: cover; height: 150px; border-radius: 6px 6px 0 0; filter: brightness(.4) blur(0px);" />
      <div style="text-align: center; position: absolute; right:0; left:0; top: 124px; font-size: 14px; font-weight: 600; cursor: default;">
        PurePeace
      </div>
      <div style="text-align: center; padding: 10px 10px;">
        <div class="my-menu-item">
          个人主页
        </div>
        <div class="my-menu-item">
          我的比赛
        </div>
        <div class="my-menu-item">
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
        src="https://a.ppy.sh/5084172?.jpg"
        style="background-color: #grey; transition: .2s ease-in-out;cursor: pointer;user-select: none;"
        @mousedown="(e)=>{e.preventDefault()}"
      />
    </span>
  </a-popover>
</template>

<script>
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
      visible: false,
      messages: [
        {
          title: '比赛报名成功',
          content: '您已成功报名参加本次oclc s9比赛'
        },
        {
          title: '咕咕警告',
          content: '您的鸽子次数已达三次，若继续鸽子您将被禁赛'
        },
        {
          title: '邀约 from @Explosive',
          content: '今晚我在osu!mp会所二号房等你，房间密码是114514，如果你来了，我就跟你做那些……'
        }
      ]
    }
  },
  watch: {
    avatarSize () {
      if (this.visible === true) {
        this.visible = false
      }
    }
  },
  methods: {

  }
}
</script>

<style>
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
