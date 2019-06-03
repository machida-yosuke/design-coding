<template lang="pug">
.sketch
  canvas.sketch-canvas(ref='sketchCanvas')
  .colors(ref='colors')
  .pixles(ref='pixles')
    .pixle(v-for='(pixle,index) in pixles' :style="{background: `rgba(${pixles[index][0]}, ${pixles[index][1]}, ${pixles[index][2]}, ${pixles[index][3]})`}")
  input.range(type="range" value='1' min='1' max='10' @change='change($event)')
</template>

<script>
import Meta from '~/assets/mixins/meta'
import Mosaic from '~/assets/js/Mosaic/Mosaic'
import getSkechData from '~/assets/js/utils/getSkechData'
import {
  TimelineMax,
  Power1
} from 'gsap'

const name = 'Mosaic'
const sketchData = getSkechData(name)
export default {
  mixins: [Meta],
  data() {
    return {
      colors: '',
      pixles: [],
      zoom: 1,
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
    this.sketch = new Mosaic({
      canvas: this.$refs.sketchCanvas,
      colors: this.$refs.colors
    })

    this.pixles = this.sketch.getAllPixels()
    // this.sketch.start()
  },
  beforeDestroy() {
    this.sketch.destroy()
  },
  methods: {
    change(e) {
      const tl = new TimelineMax()
      tl.to(this.$refs.pixles, 0.2, { scale: e.target.value, ease: Power1.easeInOut })
    }
  }
}
</script>

<style lang="scss">
.sketch{
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  &-canvas{
    position: absolute;
    // width: 100% !important;
    // height: 100% !important;
    top: 0;
    left: 0;
  }
}
.colors{
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  position: fixed;
  color: #000;
}
.pixles{
  display: flex;
  width: 1000px;
  height: 1000px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  transform: scale(0.7);
}
.pixle{
  width: 20px;
  height: 20px;
  position: relative;
  transform-origin: center;
  transform: scale(1);
  transition: all 250ms;
  &:hover{
    transform: scale(1.5);
    z-index: 9999;
  }
  &:before{
    content: '';
   @include set-image('mosaic/test.png', 20px, 20px);
   position: absolute;
   top: 0;
  }
}
.range{
  position: fixed;
  bottom: 50px;
}
</style>
