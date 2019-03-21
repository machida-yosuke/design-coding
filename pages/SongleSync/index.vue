<template lang="pug">
  .songlesync
    #songle
    .access
    .test {{ meta.title }}
</template>

<script>
import Meta from '~/assets/mixins/meta'
import SongleSync from '~/assets/js/songleSync/SongleSync'
export default {
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: 'SongleSync',
        description: 'SongleSync',
        type: 'article',
        url: 'https://example.com/SongleSync',
        image: 'https://example.com/img/ogp/SongleSync.jpg'
      }
    }
  },
  mounted() {
    this.songleSync = new SongleSync()
    this.songleSync.setApi()
  },
  beforeDestroy() {
    this.songleSync.destroy()
  },
  methods: {}
}
</script>

<style lang="scss">
.songlesync{
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 720px;
}

#songle{
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.access{
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 200px;
  height: 200px;
  background: red;
}
</style>
