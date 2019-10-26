<template>
  <div class="user-wrapper">
    <!--div style="float: left;padding: 0 16px; margin: 0 10px;">
      <a-input-search
        placeholder="搜索"
        @search="onSearch"
      />
    </div-->
    <notice-bar class="act-button" />

    <a-dropdown>
      <span class="act-button ant-dropdown-link user-dropdown-menu">

        <a-avatar
          class="avatar"
          icon="user"
          :size="avatarSize"
          src="https://a.ppy.sh/5084172?.jpg"
          style="background-color: #grey; transition: .4s ease;"
          @mousedown="(e)=>{e.preventDefault()}"
        />
      </span>

      <a-menu
        slot="overlay"
        class="user-dropdown-menu-wrapper"
        style="border-radius: 6px; max-width: 130px;"
      >
        <a-menu-item
          key="0"
          @click="()=> this.$info({
            title: '呃',
            content: '这个还没做',
            onOk () {}
          })"
        >
          <a-icon type="user" />
          <span>登录</span>
        </a-menu-item>
        <a-menu-item key="1">
          <a-icon type="setting" />
          <span>测试</span>
        </a-menu-item>
        <a-menu-item
          key="2"
          disabled
        >
          <a-icon type="setting" />
          <span>测试</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item
          key="3"
          disabled
          @click="handleLogout"
        >
          <a-icon type="logout" />
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import noticeBar from '@/components/noticeBar'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {
    noticeBar
  },
  props: {
    avatarSize: {
      type: Number,
      default: 64
    }
  },
  data () {
    return {
      username: ''
    }
  },
  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar']),
    onSearch () {
      this.$info({
        title: '呃',
        content: '这个还没做',
        onOk () {}
      })
    },
    handleLogout () {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          return that.Logout({}).then(() => {
            window.location.reload()
          }).catch(err => {
            that.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {

        }
      })
    }
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
    background: rgba(0, 0, 0, 0.025);
  }
</style>
