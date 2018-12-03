<template lang="pug">
  section#about
    .content-wrapper
      .introduction
        h3 タクヤ イシガキ
        p 
          | 東京都内でWEBエンジニアをしています。
          br
          | 求めていることを的確に提供し、
          br
          | なにも考えずに目的を達成でき、
          br
          | サイト訪れたあとにほんの少しの余韻を持って帰ってもらえる。
          br
          | そんなインタラクションを提供できるように日々勉強しております。
          br
          | SPAでWebサイトを構築することが得意です。
      .introduction
        h3 開発技術など
        dl
          dt Front
          dd
            | HTML / CSS  / Javascript / JQuery /
            br
            | Pug / SCSS / Stylus / Typescript 
            br
            | Angular / Vue / Nuxt
        dl
          dt Back
          dd Java / PHP
        dl
          dt CMS
          dd Wordpress / Contentful
        dl
          dt DB
          dd Oracle / Postgress / MYSQL / DB2
    
    .bg

</template>

<script>
// components

// library
import {mapGetters} from 'vuex'
import {TweenMax, Circ, Expo} from 'gsap'

export default {
  data() {
    return {
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
   
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
section {
  position: relative;
  padding: 0 0 744px;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(/assets/img/img-aboutMe.jpg);
    background-size: cover;
    overflow: hidden;
    z-index: -1;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    &::before {
      background-color: rgba(0, 0, 0, .5);
      z-index: 1;
    }
    &::after {
      margin: -10px;
      background: inherit;
      background-size: cover;
      filter: blur(10px);
    }
  }
}

.content-wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 0% 0 0% 13.4%;

  .introduction {
    line-height: 2;
    letter-spacing: 0.1em;
    &:not(:first-child) {
      margin: 9.2% 0 0;
    }
    h3 {
      margin: 0 0 7px;
      font-size: 2.2rem;
    }
    p {
      font-size: 1.6rem;
    }
    dl {
      margin-top: 16px;
      display: flex;
      font-size: 1.6rem;
      dt {
        width: 72px;
      }
      dd {
        position: relative;
        padding: 0 0 0 26px;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 1px;
          height: 80%;
          background-color: rgba(255, 255, 255, .8);
        }
      }
    }
  }
}

// * -------------------
// * sp layout
// * -------------------

@include mq($breakpoint: sm) {
  section {
    padding: 0 0 600px;
  }

  .content-wrapper {
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    width: 96%;

    .introduction {
      &:not(:first-child) {
        margin: 11% 0 0;
      }
      h3 {
        font-size: 1.4rem;
      }
      p {
        font-size: 1.2rem;
      }
      dl {
        font-size: 1.2rem;
        dt {
          width: 52px;
        }
        dd {
          padding: 0 0 0 18px;
        }
      }
    }
  }
}

</style>
