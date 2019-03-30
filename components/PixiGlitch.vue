<template lang="pug">
  .thumbnail(
    ref="canvas"
  )

</template>

<script>
// components

// library
import {mapGetters} from 'vuex'
import * as PIXI from 'pixi.js'
import * as FILTERS from 'pixi-filters'
import PixiPlugin from "gsap/PixiPlugin" // TweenMaxでpixiを扱う
import {TweenMax, Power0, Expo} from 'gsap'

export default {
  props: [
    'thumbnailUrl',
  ],
  mounted () {
    if (this.$device.isDesktop) {
      this.initPixi()
    } else {
      this.setBgImage()
    }
  },
  methods: {
    initPixi() {

      PIXI.utils.skipHello()

      const app = new PIXI.Application(
        this.$refs.canvas.clientWidth,
        this.$refs.canvas.clientHeight, {
          transparent: true
        }
      )

      this.$refs.canvas.appendChild(app.view)
      const container = new PIXI.Container()
      container.interactive = true
      app.stage.addChild(container)

      const background = PIXI.Sprite.fromImage(this.thumbnailUrl)
      background.width = app.renderer.width
      background.height = app.renderer.height
      background.alpha = 1
      container.addChild(background)

      const startGlitch = () => {
        container.filters = [new FILTERS.GlitchFilter({
          slices: 10,
          fillMode: 2,
          direction: 10,
          red: [4, -4],
          green: [-4, -4],
          blue: [4, -4]
        })]

        requestAnimationFrame(() => {

          TweenMax.to(container.filters[0], .04, {
            pixi: {
              offset: 3,
              seed: 4,
            },
            yoyo: true,
            repeat: 6,
            ease: Power0.easeNone,
            onComplete: () => {
              stopGlitch()
            }
          })

        })
      }

      const stopGlitch = () => {
        container.filters = null
      }

      container.mouseover = function(mouseData) {
        startGlitch()
      }

      container.mouseout = function(mouseData) {
        stopGlitch()
      }

      container.click = function(mouseData) {
        startGlitch()
      }

      const resize = () => {
        app.renderer.view.style.width = `${this.$refs.canvas.clientWidth}px`
        app.renderer.view.style.height = `${this.$refs.canvas.clientHeight}px`
      }

      window.addEventListener('resize', resize)
    },
    setBgImage() {
      const thumbnail = this.$refs.canvas
      thumbnail.style.backgroundImage = `url(${this.thumbnailUrl})`
      thumbnail.style.backgroundSize = `cover`
    }
  }
}
</script>

<style lang="scss" scoped>

.thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

</style>
