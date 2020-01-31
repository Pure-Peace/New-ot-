<template>
  <div
    style="padding: 30px 60px;"
  >
    <div style="margin: 20px auto 0 auto; width: 85%; text-align: center; height: 100%; padding: 70px; border-radius: 8px 8px 0 0; background-color: #272023; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div style="font-size: 42px; font-weight: lighter;">
        查找一场比赛历史信息
      </div>
      <div style="font-size: 16px; font-weight: lighter; padding: 25px 0;  color: #E8DBDB;">
        mplink丢过来，我们带你飞 ╭(￣▽￣)╯╧═╧
      </div>
    </div>

    <div style="margin: 0 auto 60px auto; width: 85%; text-align: center; height: 67vh; padding: 0 70px 20px 70px; border-radius: 0 0 8px 8px; background-color: #231D20; box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 6px 0 rgba(0, 0, 0, 0.1);">
      <div>
        <div style="padding: 40px 0; font-size: 12px; min-width: 360px; max-width: 34%; margin: 0 auto 40px auto;">
          <a-icon
            style="font-size: 142px; padding: 30px 0;"
            type="search"
          />
          <input
            ref="mplink"
            placeholder="mplink或者多人游戏id都可以~"
            style="margin-top: 10px; transition: .8s ease; width: 100%; outline: none; background: #1F1F1F; border: 0px solid rgba(204, 174, 112, 0.8); border-radius: 6px; padding: 14px 10px;"
            :style="warning?'border: 2px solid #F1C40F;':'border: 2px solid #D1C3C3;'"
          >
        </div>

        <div style="margin-top: 50px; margin-bottom: 10px; display: flex; font-weight: bold; font-size: 12px;">
          <span
            class="login-action-button button-pink"
            style="margin: 0 auto; min-width: 20%; line-height: 30px;"
            @click="jumpToMatches"
          >
            走你！
            <a-icon
              style="margin-left: 4px; color: #FFFFFF;"
              type="heart"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      warning: false
    }
  },
  mounted () {
  },
  methods: {
    jumpToMatches () {
      if (this.$refs.mplink && this.$refs.mplink.value) {
        const matchId = this.$refs.mplink.value.replace(/[^0-9]/ig, '')
        if (matchId === '') {
          this.$message.warning('OxO 请输入一点东西吧...')
          this.warning = true
          setTimeout(() => {
            this.warning = false
          }, 2400)
        } else {
          this.$router.push({ name: 'matchInfo', params: { matchId: matchId } })
        }
      } else {
        this.$message.warning('OxO 请输入一点东西吧...')
        this.warning = true
        setTimeout(() => {
          this.warning = false
        }, 2400)
      }
    }
  }
}

</script>

<style>

</style>
