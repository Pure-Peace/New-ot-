<template>
  <div style="padding: 10px 100px; margin-top: 30px;">
    <div style="background-color: #1E1E1E; width: 85%; min-width: 620px; padding: 24px 24px; border-radius: 14px;margin: 0 auto;">
      {{ $route.params.userKey }}
    </div>
  </div>
</template>

<script>
import $backend from '../backend'

export default {

  data () {
    return {
    }
  },
  mounted () {
    this.doubleGetEloInfo()
  },
  methods: {
    doubleGetEloInfo () {
      if (this.$route.params.userKey) {
        let userKey = this.$route.params.userKey
        $backend.eloGetUserByOsuName(
          userKey
        ).then(responseData => {
          console.log(responseData)
          if (responseData.length === 0) {
            console.log('biss')
          }
        }).catch(error => {
          console.log(error.message)
        })
        if (userKey.replace(/[^0-9]/ig, '').length === userKey.length) {
          $backend.eloGetUserByOsuId(
            userKey
          ).then(responseData => {
            console.log(responseData)
            if (responseData.length === 0) {
              console.log('biss')
            }
          }).catch(error => {
            console.log(error.message)
          })
        }
      } else {
        console.log('参数不足')
      }
    }
  }
}

</script>

<style>

</style>
