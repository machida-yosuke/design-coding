<template lang="pug">
  .top
    .introduction
      canvas(ref='introductionCanvas')
      .introduction-scroll
        .introduction-scroll__scroll scroll
        .line-wrap
          .line-wrap__line
          .line-wrap__line
          .line-wrap__line
          .line-wrap__line
    .about
      .about-wrap
        .about-logo
        h1.about-title Design Coding
        h2.about-head ABOUT THIS PROJECT
        .about-description
          p.about-description__line This is a creative challenge. My aim is to attempt to creative coding.
          p.about-description__line I will do it in a mood. I won’t sweat it too much. Enjoy.
          p.about-description__line Create By Machida Yosuke.
        .about-sns
          a.about-sns__twitter(href="https://twitter.com/machida_yousuke?lang=ja")
          a.about-sns__github(href="https://github.com/machida-yosuke")
    .skech-index
</template>

<script>
import ThreeBase from '../assets/js/ThreeBase'
export default {
  mounted() {
    const introductionCanvas = new ThreeBase({ canvas: this.$refs.introductionCanvas })
    console.log(introductionCanvas)
  }
}
</script>

<style lang="scss">
@import "../assets/sass/utile.scss";
.introduction{
  top: 0;
  left: 0;
  width: 100vw;
  height: auto;
  min-height: 100vh;
  position: relative;
  background: red;
  &-scroll{
    position: absolute;
    bottom: 20px;
    transform: translate(-50%, 0);
    left: 50%;
    &__scroll{
      font-family: 'Open Sans', sans-serif;
      font-size: 16px;
      color: #fff;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
  }
}

.line-wrap{
  display: flex;
  width: 40px;
  justify-content: space-between;
  margin:  0 auto;
  &__line{
      height: 60px;
      width: 1px;
      background: #fff;
      display: inline-block;
      overflow: hidden;
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
  &-logo{
    @include set-image('top/logo.svg', 65px, 65px);
  }
  &-head{
    font-family: 'Dancing Script', cursive;
    font-size: 36px;
    margin: 50px 0 0 0;
    letter-spacing: 1px;
  }
  &-description{
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;

    &__line{
      margin-top:30px;
      text-align: center;
      letter-spacing: 1px;
    }
  }
}

.about-sns{
  display: flex;
  margin-top: 30px;
  &__twitter{
    @include set-image('top/twitter.svg', 25px, 20px);
  }
  &__github{
    @include set-image('top/github.svg', 20px, 20px);
    margin-left:18px;
  }
}

</style>
