<template>
  <div class="user-wrapper">
    <notice-bar
      :avatar-size="avatarSize"
      class="act-button"
    />
    <avatar-bar
      :avatar-size="avatarSize"
      class="act-button"
    />
  </div>
</template>

<script>
import noticeBar from '@/components/noticeBar'
import avatarBar from '@/components/avatarBar'

export default {
  name: 'UserMenu',
  components: {
    noticeBar,
    avatarBar
  },
  props: {
    avatarSize: {
      type: Number,
      default: 64
    }
  },
  data () {
    return {
      username: '',
      visible: false
    }
  },
  methods: {

  }
}
</script>

<style>
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
