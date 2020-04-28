<template>
  <div style="display: flex; padding: 30px 60px;">
    <div
      id="toc"
      style="width: 25%;"
    />
    <vue-markdown
      :source="wiki"
      :toc="true"
      toc-id="toc"
      :toc-first-level="1"
      style="padding: 0 30px; width: 60%;"
    />
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import $backend from '@/apis/backend'

export default {
  components: {
    VueMarkdown
  },
  data () {
    return {
      wiki: 'loading..'
    }
  },
  mounted () {
    this.getWiki()
  },
  methods: {
    getWiki () {
      $backend.fetchWiki(

      ).then(responseData => {
        this.wiki = responseData
      }).catch(error => {
        console.log(error.message)
      })
    }
  }
}

</script>

<style>

</style>
