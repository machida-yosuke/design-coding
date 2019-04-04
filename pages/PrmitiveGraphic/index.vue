<template lang="pug">
  .sketch
    canvas.sketch-canvas(ref='sketchCanvas')
</template>

<script>
import Meta from '~/assets/mixins/meta'
import PrmitiveGraphic from '~/assets/js/PrmitiveGraphic/PrmitiveGraphic'
import getSkechData from '~/assets/js/utils/getSkechData'
const name = 'PrmitiveGraphic'
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
    this.sketch = new PrmitiveGraphic({
      canvas: this.$refs.sketchCanvas
    })
    this.sketch.start()
  },
  beforeDestroy() {
    this.sketch.destroy()
  }
}
</script>

<style lang="scss">
.sketch{
  top: 0;
  left: 0;
  width: 100vw;
  min-width: 1000px;
  height: 100vh;
  min-height: 500px;
  position: relative;
  &-canvas{
    position: absolute;
    width: 100% !important;
    height: 100% !important;
    top: 0;
    left: 0;
  }
}
</style>
