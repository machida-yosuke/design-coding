<template lang="pug">
  .sketch
    canvas.sketch-canvas(ref='sketchCanvas')
</template>

<script>
import Meta from '~/assets/mixins/meta'
import IntroductionDemo from '~/assets/js/introduction/IntroductionDemo'
export default {
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: 'DesignCoding | PrmitiveGraphic',
        description: 'DesignCoding is a creative challenge. My aim is to attempt to creative coding.',
        type: 'article',
        url: 'https://machida-yosuke.github.io/design-coding/PrmitiveGraphic/',
        image: 'https://example.com/img/ogp/PrmitiveGraphic/ogp.png'
      }
    }
  },
  mounted() {
    this.sketch = new IntroductionDemo({
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
