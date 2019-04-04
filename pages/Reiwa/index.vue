<template lang="pug">
.sketch
  canvas.sketch-canvas(ref='sketchCanvas')
</template>

<script>
import Meta from '~/assets/mixins/meta'
import Reiwa from '~/assets/js/Reiwa/Reiwa'
import getSkechData from '~/assets/js/utils/getSkechData'
const name = 'Reiwa'
const sketchData = getSkechData(name)
export default {
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: `DesignCoding | ${sketchData.title}`,
        description: `${sketchData.description}`,
        type: 'article',
        url: `https://machida-yosuke.github.io/design-coding/${sketchData.title}/`,
        image: `https://example.com/img/ogp/${sketchData.title}/ogp.png`
      }
    }
  },
  mounted() {
    this.sketch = new Reiwa({
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
