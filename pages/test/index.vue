<template lang="pug">
  .test {{ meta.title }}
</template>

<script>
import Meta from '~/assets/mixins/meta'

export default {
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: 'Test-Page!',
        description: 'ページ個別のディスクリプション',
        type: 'article',
        url: 'https://example.com/test',
        image: 'https://example.com/img/ogp/test.jpg'
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style>
</style>
