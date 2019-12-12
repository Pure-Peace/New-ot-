<template>
  <div class="cent">
    <a-card
      style="width: 900px; margin: 20px auto;"
      hoverable
      class="shadow"
    >
      <div slot="title">
        <span class="title">OCLR S3 Draft!</span>
        <br>Welcome~
      </div>
      <span
        slot="customRender"
        slot-scope="item"
      >
        <a-icon type="home" />{{ item.key }}
      </span>
      <router-link
        slot="extra"
        to="/ranking"
      >
        2019年11月17日 · 周日
      </router-link>
      <div class="cl">
        点击下方按钮立即进入OCLR S3的选秀平台~
        <br>哈哈哈哈……
        <a-button
          style="position: absolute; right: 30px; bottom: 30px;"
          size="default"
          type="primary"
          @click="modal2Visible=!modal2Visible"
        >
          Let's do it!
        </a-button>
      </div>
      <img
        slot="cover"
        alt="example"
        src="@/assets/cover.jpg"
      >
    </a-card>
    <a-modal
      :visible="modal2Visible"
      cancel-text="终止施法"
      ok-text="开始施法"
      title="验证您的身份"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <p>欢迎您，还需要一步即可进入选秀平台</p>
      <a-input-password
        v-model="pas"
        placeholder="请吟唱咒语"
      />
      <p />
    </a-modal>
  </div>
</template>

<script>

export default {
  data () {
    return {
      modal2Visible: false,
      confirmLoading: false,
      pas: ''
    }
  },
  methods: {
    goRanking () {
      this.$router.push({ path: '/ranking' })
    },
    handleOk (e) {
      this.confirmLoading = true
      if (this.pas === 'baozhageniubi') {
        this.$message.success('正在前往！')
        setTimeout(() => {
          this.$router.push({ path: '/AfcY8sfe6kZ45xjYs' })
          this.confirmLoading = false
        }, 1000)
      } else {
        this.$message.warning('咒语不正确哦！')
        this.confirmLoading = false
      }
    }
  }
}

</script>

<style>
.title {
  font-size: 32px;
}
.cl {
  padding: 10px 0;
}
.shadow {
}

</style>
