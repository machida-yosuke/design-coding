<template lang="pug">
  .songlesync
    .songle-wrap(:data-ua='deviceType')
      #songle
    .beat(v-show='isShowBeat')
    .dot(v-show='isShowDot')
    .sketch(:data-ua='deviceType' v-show='isShowCanvas')
      canvas.sketch-canvas(ref='sketchCanvas')
    .tap(v-if='deviceType == "smartphone"' ref='tap')
    .songle-widget(v-if='deviceType == "pc"')
    .access(v-if='deviceType == "pc"')
      .access-qr
      .access-description 本ページから動画を再生した後、スマホでアクセスすると画面が、シンクロしています。
</template>

<script>
import Meta from '~/assets/mixins/meta'
import SongleSyncCanvas from '~/assets/js/songleSync/SongleSyncCanvas'
import SongleSync from '~/assets/js/songleSync/SongleSync'
export default {
  mixins: [Meta],
  data() {
    return {
      deviceType: '',
      isShowBeat: 1,
      isShowDot: 0,
      isShowCanvas: 1,
      meta: {
        title: 'DesignCoding | SongleSync',
        description: 'SongleSync is a creative challenge. My aim is to attempt to creative coding.',
        type: 'article',
        url: 'https://machida-yosuke.github.io/design-coding/SongleSync/',
        image: 'https://machida-yosuke.github.io/img/ogp/SongleSync/ogp.png'
      }
    }
  },
  created() {
    const deviceType = this.$ua.deviceType()
    this.deviceType = deviceType
    console.log(this.deviceType)
  },
  mounted() {
    this.beat = (e) => {
      console.log(e, 'beat')
      this.sketch.tweenBeat(e)
    }
    this.chorus = (e) => {
      if (e === 'enter') {
        this.isShowCanvas = 1
        this.isShowDot = 1
        this.isShowBeat = 0
      }
      if (e === 'leave') {
        this.isShowCanvas = 0
        this.isShowBeat = 1
      }
    }
    this.chord = (e) => {
      console.log(e, 'chord')
    }
    this.finish = () => {
      this.isShowBeat = 1
      this.isShowDot = 0
      this.isShowCanvas = 0
    }
    this.$nextTick(() => {
      this.songleSync = new SongleSync()
      this.songleSync.setApi()
      this.songleSync.on('play', this.createSongleSyncCanvas)
      this.songleSync.on('beat', this.beat)
      this.songleSync.on('chorus', this.chorus)
      this.songleSync.on('chord', this.chord)
      this.songleSync.on('finish', this.finish)
    })
  },
  destroyed() {
    this.songleSync.removeListener('play', this.createSongleSyncCanvas)
    this.songleSync.removeListener('beat', this.beat)
    this.songleSync.removeListener('chorus', this.chorus)
    this.songleSync.removeListener('chord', this.chord)
    this.songleSync.removeListener('finish', this.finish)
    this.songleSync.destroy()
  },
  methods: {
    createSongleSyncCanvas() {
      this.sketch = new SongleSyncCanvas({ canvas: this.$refs.sketchCanvas, deviceType: this.deviceType })
      this.sketch.start()
      this.isShowCanvas = 0
    }
  }
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
.sketch{
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: relative;
  &[data-ua='pc']{
    min-width: 1000px;
    min-height: 500px;
  }
  &-canvas{
    position: absolute;
    width: 100% !important;
    height: 100% !important;
    top: 0;
    left: 0;
  }
}

.beat{
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 25vw;
  height: 100%;
}

.dot{
  position:absolute;
  pointer-events: none;
  padding: 100%;
  background-size: 50px 50px, 50px 50px;
  background-position: 0 0, 25px 25px;
  background-origin: content-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
