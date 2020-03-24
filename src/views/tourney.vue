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
                v-for="map in mappool"
                :key="map"
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
import $backend from '@/backend'

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
    fetchEwc () {
      $backend.getEwc().then(res => {
        let ewc = res
        let mappool = res.map((tourneyName) => {
          return $backend.getMappool(
            tourneyName
          ).then(res).catch(error => {
            console.log(error)
          })
        })
        Promise.all(mappool).then(res => {
          let obj = {}
          ewc.map((v, i) => {
            obj[ewc[i]] = res[i]
          })
          this.ewc = obj
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

</script>

<style>

</style>
