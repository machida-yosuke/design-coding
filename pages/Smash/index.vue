<template lang="pug">
.sketch
  canvas.sketch-canvas(ref='sketchCanvas')
</template>

<script>
import Meta from '~/assets/mixins/meta'
import Smash from '~/assets/js/Smash/Smash'
const name = 'Smash'
export default {
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: `DesignCoding | ${name}`,
        description: 'Smash is a creative challenge. My aim is to attempt to creative coding.',
        type: 'article',
        url: `https://machida-yosuke.github.io/design-coding/${name}/`,
        image: `https://machida-yosuke.github.io/img/ogp/${name}/ogp.png`
      },
      script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/oimo/1.0.9/oimo.min.js' }]
    }
  },
  mounted() {
    this.sketch = new Smash({
      canvas: this.$refs.sketchCanvas
    })
    this.sketch.start()
  },
  beforeDestroy() {
    this.sketch.destroy()
  },
  methods: {
  }
}
</script>

<style lang="scss">
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
</style>
