<template>
  <a-locale-provider :locale="huohuo">
    <div class="app">
      <a-back-top />
      <top-nav />
      <content-layout />
      <footer-bar />
    </div>
  </a-locale-provider>
</template>

<script>
import topNav from '@/layout/topNav'
import contentLayout from '@/layout/contentLayout'
import footerBar from '@/layout/footerBar'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'App',
  components: {
    topNav,
    contentLayout,
    footerBar
  },
  data () {
    return {
      huohuo: zhCN
    }
  }
}
</script>

<style>
  .app {
    height: 100vh;
    font-family: "Microsoft YaHei";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 150px;
    background: #898989;
  }
  ::-webkit-scrollbar-thumb:hover {
    border-radius: 150px;
    background: #4A4A4A;
  }
  ::-webkit-scrollbar-track {
    border-radius: 150px;
    background: #ccc;
  }
  #nprogress .bar{
      background: #FFEC00 !important;
      box-shadow: 0 0 1px 1px #FFFCD3;
      height: 2px !important;
  }
  #nprogress .peg{
      box-shadow: 0 0 10px #FFEC00, 0 0 5px #FFEC00 !important;
  }
  .ant-popover-arrow {
    display: none !important;
  }
  .ant-popover-inner-content {
    padding: 0 0 !important;
  }
  .ant-tooltip-arrow {
    display: none !important;
  }
</style>
