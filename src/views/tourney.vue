<template>
  <div style="padding: 10px 100px; margin-top: 80px;">
    <a-spin :spinning="initing">
      <div style="background-color: #1E1E1E; width: 85%; min-width: 620px; padding: 24px 24px; border-radius: 14px;margin: 0 auto;">
        <div>
          <h1>常规比赛</h1>
          xxxxxxxx
        </div>
        <div style="margin-top: 100px;">
          <h1>EWC周赛</h1>
          <div
            v-for="(mappool, tourneyName) in ewc"
            :key="tourneyName"
            style="background-color: orange; padding: 20px; margin: 20px; cursor: pointer;"
          >
            <div style="background-color: green; padding: 20px; margin: 20px; cursor: pointer;">
              {{ tourneyName }}
            </div>
            <div style="background-color: red; padding: 20px; margin: 20px; cursor: pointer;">
              <div
                v-for="(map, idx) in mappool"
                :key="idx"
                style="background-color: blue; padding: 20px; margin: 20px; "
              >
                {{ map.mappool_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import $backend from '@/apis/backend'

export default {
  data () {
    return {
      initing: false,
      ewc: {}
    }
  },
  mounted () {
    this.fetchEwc()
  },
  methods: {
    async fetchEwc () {
      const ewc = await $backend.getEwc()
      const mappool = await Promise.all(
        ewc.map(async tourneyName =>
          $backend.getMappool(
            tourneyName
          ).catch(error => {
            console.log(error)
          })
        ).filter(pool => pool)
      )
      this.ewc = ewc.reduce((re, tour, idx) => {
        re[tour] = mappool[idx]
        return re
      }, {})
    }
  }
}

</script>

<style>

</style>
