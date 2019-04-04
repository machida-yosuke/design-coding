<template lang="pug">
  .top
    .introduction
      .sketch
        canvas.sketch-canvas(ref='sketchCanvas')
      .introduction-scroll
        .introduction-scroll__scroll SCROLL
        .line-wrap
          .line-wrap__line(v-for='n,index in 4' :data-num='index')
    .about
      .about-wrap
        h2.about-head ABOUT THIS PROJECT
        h1.about-title Design Coding
        .about-description
          p.about-description__line This is a creative challenge. My aim is to attempt to creative coding.
          p.about-description__line I will do it in a mood. I won’t sweat it too much. Enjoy.
          p.about-description__line Create By Machida Yosuke.
        .about-logo
        .about-sns
          a.about-sns__twitter(href="https://twitter.com/machida_yousuke?lang=ja" target='_blank')
          a.about-sns__github(href="https://github.com/machida-yosuke/design-coding" target='_blank')
    .sketch-wrap
      .sketch-index-wrap(v-for='data,index in sketchData')
        nuxt-link.sketch-link(:to='data.title + "/" + data.query')
          canvas.sketch-index-canvas(:data-name='data.title' ref='sketchIndexCanvas')
</template>

<script>
import PrmitiveGraphic from '~/assets/js/PrmitiveGraphic/PrmitiveGraphic'
import SketchIndex from '~/assets/js/Top/SketchIndex'
import sketchData from '~/assets/json/DesignCoding.json'
import Meta from '~/assets/mixins/meta'

export default {
  mixins: [Meta],
  data() {
    return {
      sketchData: sketchData,
      meta: {
        title: 'DesignCoding',
        description: 'DesignCoding is a creative challenge. My aim is to attempt to creative coding.',
        type: 'article',
        url: 'https://machida-yosuke.github.io/design-coding/',
        image: 'https://machida-yosuke.github.io/design-coding/img/ogp/ogp.png'
      }
    }
  },
  mounted() {
    this.sketch = new PrmitiveGraphic({
      canvas: this.$refs.sketchCanvas
    })
    this.sketch.start()

    this.$refs.sketchIndexCanvas.forEach((element) => {
      this.sketchIndex = new SketchIndex({
        canvas: element
      })
      this.sketchIndex.start()
    })
  },
  beforeDestroy() {
    this.sketch.destroy()
    this.sketchIndex.destroy()
  }
}
</script>
<style lang="scss">

.top{
  top: 0;
  left: 0;
  width: 100vw;
  position: relative;
  overflow: hidden;
}
.introduction{
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: relative;
  .sketch{
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: relative;
    &-canvas{
      position: absolute;
      width: 100% !important;
      height: 100% !important;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &-scroll{
    position: absolute;
    bottom: 20px;
    transform: translate(-50%, 0);
    left: 50%;
    &__scroll{
      font-family: 'Open Sans', sans-serif;
      font-size: 10px;
      color: #fff;
      text-align: center;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
  }
}

.line-wrap{
  display: flex;
  width: 20px;
  justify-content: space-between;
  margin:  0 auto;
  @for $i from 0 through 4 {
      &__line[data-num="#{$i}"]{
      height: 20px;
      width: 1px;
      display: inline-block;
      overflow: hidden;
      position: relative;
      &::before{
        content: "";
        position: absolute;
        left: 0;
        background: #fff;
        top: 0;
        width: 100%;
        height: 100%;

        animation: scroll-line 1s linear infinite;
        animation-delay: $i * 100ms;
        transform-origin: center top;
      }
    }
  }
}

.about{
  width: 100%;
  height: 640px;
  background: #000;
  color: #fff;
  display: flex;
  &-wrap{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  &-head{
    font-family: 'Dancing Script', cursive;
    font-size: 36px;
    letter-spacing: 1px;
  }

  &-title{
    font-family: 'Open Sans', sans-serif;
    font-weight: 800;
    font-size: 30px;
    letter-spacing: 1px;
    margin-top:40px;
  }
  &-description{
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    &__line{
      margin-top:30px;
      text-align: center;
      letter-spacing: 1px;
    }
  }
  &-logo{
    margin: 30px 0;
    @include set-image('top/logo.svg', 50px, 50px);
  }
}

.about-sns{
  display: flex;
  &__twitter{
    @include set-image('top/twitter.svg', 25px, 20px);
  }
  &__github{
    @include set-image('top/github.svg', 20px, 20px);
    margin-left:18px;
  }
}
.sketch-wrap{
  background: #000;
  display: grid;
  grid-auto-rows:18.7vw;
  grid-template-columns:33.3vw 33.3vw 33.4vw;
}

.sketch-index-wrap{
  position: relative;
  top:0;
  left: 0;
}

.sketch-link{
  position: absolute;
  top:0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}

.sketch-index-canvas{
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}

</style>
