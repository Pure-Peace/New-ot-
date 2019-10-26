<template>
  <div class="cent">
    <a-card
      style="width:900px; margin: 59px auto;"
      hoverable
      class="shadow"
      @mousedown="(e)=>{e.preventDefault() }"
    >
      <div slot="title">
        <span class="title">ELO RANKING SYSTEM ON OSU!</span>
        <br>正在测试
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
        2019年8月27日
      </router-link>
      <div class="cl">
        机器学习是一门多领域交叉学科，涉及概率论、统计学、逼近论、凸分析、算法复杂度理论等多门学科。
        <br>它是人工智能的核心，是使计算机具有智能的根本途径。
        <a-button
          style="margin-left:740px"
          size="default"
          type="primary"
          @click="goRanking"
        >
          走进科学
        </a-button>
      </div>
      <div
        slot="cover"
        style="width:100%; height: 250px;background-repeat: no-repeat; background-size: 100% 100%;"
        :style="'background-image: url(' + require('../assets/cover.jpg') + ');'"
      />
      <template
        slot="actions"
        class="ant-card-actions"
      />
    </a-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    goRanking () {
      this.$router.push({ path: '/ranking' })
    }
  }
}
</script>

<style>
.title {
  font-size: 32px;
}
.cl {
}
.shadow {
}

</style>
