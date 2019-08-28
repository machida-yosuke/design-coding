<template lang="pug">
.sketch
  canvas.sketch-canvas(ref='sketchPixelCanvas')
  canvas.sketch-mosaic-canvas(ref='sketchMosaicCanvas')
  input.range(type="range" value='1' min='1' max='10' @change='change($event)')
</template>

<script>
import Meta from '~/assets/mixins/meta'
import PixiColor from '~/assets/js/Mosaic/PixiColor'
import Mosaic from '~/assets/js/Mosaic/Mosaic'
import getSkechData from '~/assets/js/utils/getSkechData'
import {
  TimelineMax,
  Power1
} from 'gsap'
import loadTexture from '~/assets/js/utils/loadTexture'

const name = 'Mosaic'
const sketchData = getSkechData(name)
export default {
  mixins: [Meta],
  data() {
    return {
      colors: '',
      pixels: [],
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

  async mounted() {
    await this.createTexture()
    await this.setPixelSketch()
    this.setMosaicSketch()
  },
  beforeDestroy() {
    this.pixelSketch.destroy()
    this.mosaicSketch.destroy()
  },
  methods: {
    async createTexture() {
      this.demonTexture = await loadTexture({
        path: 'mosaic',
        name: 'demon-core.png'
      })
      this.texture = await loadTexture({
        path: 'mosaic',
        name: 'test.png'
      })
    },
    async setPixelSketch() {
      this.pixelSketch = new PixiColor({
        canvas: this.$refs.sketchPixelCanvas,
        texture: this.demonTexture
      })
      this.pixels = await this.pixelSketch.getAllPixels()
    },
    setMosaicSketch() {
      this.mosaicSketch = new Mosaic({
        canvas: this.$refs.sketchMosaicCanvas,
        texture: this.texture,
        pixels: this.pixels
      })
      this.mosaicSketch.start()
    },
    change(e) {
      const tl = new TimelineMax()
      tl.to(this.mosaicSketch.camera.position, 1, { z: e.target.value * 100, ease: Power1.easeInOut })
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
  &-mosaic-canvas{
    // position: absolute;
    width: 750px !important;
    height: 750px !important;
    border: 5px solid red;
    box-sizing: border-box;
    // top: 0;
    // right: 0;
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
.pixels{
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
