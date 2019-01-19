<template lang="pug">
  header(
    ref="header"
  )
    .wrapper
      h1.anime-fadeIn_s(
        ref="name"
      ) TAKUYA ISHIGAKI
      h2.anime-fadeIn_s(
        class="anime-fadeIn"
        ref="lead"
      ) I'm front-end engineer in Tokyo.

</template>

<script>
// components

// library
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      // isImgLoaded: 'isImgLoaded'
    })
  },
  watch: {
    // isImgLoaded() {
    //   console.log('load')
    //   // アニメーション開始
    //   this.initAnime()
    // }
  },
  mounted () {
    this.initAnime()
    this.setDeviceHeight()
  },
  methods: {
    initAnime() {
      const targets = [
        this.$refs.name,
        this.$refs.lead,
      ] 

      this.$fadeInAnime(targets)
    },
    setDeviceHeight() {
      if (this.$device.isDesktop) return

      this.$setDeviceHeight(this.$refs.header)
    }
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
  width: 100%;
  height: 500px;

  .wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;

    h1 {
      font-size: 4.8rem;
      font-family: $accent-font-family;
      font-weight: 500;
      letter-spacing: 0.25em;
    }
    h2 {
      margin: 2.0em 0 0;
      font-family: $accent-font-family;
      font-size: 2.4rem;
      letter-spacing: 0.14em;
    }
  }
}

// * -------------------
// * sp layout
// * -------------------

@include mq($breakpoint: sm) {
  header {
    height: 100vh;

    .wrapper {
      h1 {
        font-size: 2.4rem;
      }
      h2 {
        margin: 1.0em 0 0;
        font-size: 1.4rem;
      }
    }
  }
}

</style>
