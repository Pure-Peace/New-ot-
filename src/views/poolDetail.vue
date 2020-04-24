<template>
  <div style="padding: 10px 100px; margin-top: 80px;">
    {{ poolName }} - {{ pool }}

    <div
      v-for="(map, idx) in maps"
      :key="idx"
    >
      {{ map }}
    </div>
  </div>
</template>

<script>
import $mappool from '@/apis/mappool'

export default {
  data () {
    return {
      initing: false,
      pool: undefined,
      poolName: undefined,
      maps: []
    }
  },
  beforeMount () {
    const params = this.$route.params
    if (params) {
      this.pool = params.pool
      this.poolName = params.poolName || params.pool.mappool_name
      if (!this.pool && this.poolName) this.getPool()
      this.poolName ? this.getMaps() : console.log('呵呵1')
    } else {
      console.log('呵呵2')
    }
  },
  methods: {
    async getPool () {
      this.pool = await $mappool.getPool(this.poolName)
      console.log(this.pool)
    },
    async getMaps () {
      this.maps = await $mappool.getMaps(this.poolName)
      console.log(this.maps)
    }
  }
}

</script>

<style>

</style>
