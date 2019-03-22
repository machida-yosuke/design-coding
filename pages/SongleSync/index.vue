<template lang="pug">
  .songlesync
    .songle-wrap(:data-ua='deviceType')
      #songle
    .beat
    .tap(v-if='deviceType == "smartphone"' ref='tap')
    .songle-widget(v-if='deviceType == "pc"')
    .access(v-if='deviceType == "pc"')
      .access-qr
      .access-description
        | 本ページから動画を再生した後、
        | スマホでアクセスすると画面が、シンクロしています。
</template>

<script>
import Meta from '~/assets/mixins/meta'
import SongleSync from '~/assets/js/songleSync/SongleSync'
export default {
  mixins: [Meta],
  data() {
    return {
      deviceType: '',
      meta: {
        title: 'DesignCoding | SongleSync',
        description: 'SongleSync is a creative challenge. My aim is to attempt to creative coding.',
        type: 'article',
        url: 'https://machida-yosuke.github.io/design-coding/SongleSync',
        image: 'https://machida-yosuke.github.io/img/ogp/SongleSync/ogp.png'
      }
    }
  },
  created() {
    const deviceType = this.$ua.deviceType()
    this.deviceType = deviceType
  },
  mounted() {
    console.log(this.deviceType)
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
  position: fixed;
  width: 100%;
  height: 100%;
}

.songle-wrap{
  top: 0;
  left: 0;
  position: absolute;
  overflow: hidden;
  &[data-ua='pc']{
    width: 100%;
    height: 100%;
    min-width: 1280px;
    min-height: 720px;
  }
   &[data-ua='smartphone']{
    width: 260vw;
    height: 200vh;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
}
#songle{
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}

.beat{
  position: absolute;
  top: 0;
  width: 25vw;
  height: 100%;
  background: red;
}
.access{
  position: absolute;
  bottom: 30px;
  left: 30px;
  background: white;
  display: flex;
  padding: 10px;
  &-qr{
     @include set-image('SongleSync/qr.png', 100px, 100px);
  }
  &-description{
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    width: 180px;
    margin-top: 15px;
    margin-left: 10px;
    line-height: 20px;
  }
}

.songle-widget{
  position: absolute;
  bottom: 30px;
  right: 30px;
  background: white;
  padding: 20px;
}
</style>
