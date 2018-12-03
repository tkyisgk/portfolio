<template lang="pug">
  .particle-container(
    ref="container"
  )

</template>

<script>
// components

// library
import * as PIXI from 'pixi.js'
import { TweenMax, Power4 } from 'gsap'
import PixiPlugin from "gsap/PixiPlugin" // TweenMaxでpixiを扱う

export default {
  data() {
    return {
      particleCount: 140,
      particleColors: [
        'e43a19',
        '111f4d',
        'AA9E85',
      ],
    }
  },
  mounted () {
    this.initPixi()
  },
  methods: {
    initPixi() {

      PIXI.utils.skipHello()

      const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true
      })

      this.$refs.container.appendChild(app.view)

      for (let i = 0; i < this.particleCount; i++) {
        const particleSettings = {
          particleSize: 10,
          x: Math.floor(Math.random() * app.renderer.width),
          y: Math.floor(Math.random() * app.renderer.height),
          scale: Math.floor(Math.random() * 3) / 3,
          alpha: Math.random(),
          particleSpeed: Math.floor(Math.min(1000, Math.random() * 1000)),
          color: this.particleColors[Math.floor(Math.random() * this.particleColors.length)]
        }
        this.createParticle(app, particleSettings)
      }

    },
    createParticle(app, setting) {
      const graphic = new PIXI.Graphics()
      graphic.beginFill(`0x${setting.color}`)
      graphic.drawCircle(0, 0, setting.particleSize)
      graphic.endFill()

      const texture = graphic.generateCanvasTexture()
      texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST

      const particleSprite = new PIXI.Sprite(texture)
      particleSprite.anchor.set(0.5)
      particleSprite.blendMode = PIXI.BLEND_MODES.SCREEN

      TweenMax.set(particleSprite, {
        pixi: {
          x: setting.x,
          y: setting.y,
          scale: setting.scale,
          alpha: setting.alpha
        }
      }, 0)

      TweenMax.to(particleSprite, setting.particleSpeed, {
        pixi: {
          x: Math.floor(Math.random() * app.renderer.width),
          y: Math.floor(Math.random() * app.renderer.height)
        },
        ease: Power4.easeOut,
        onComplete: () => {
        }
      }, 1)

      // ADD SPRITE TO STAGE
      app.stage.addChild(particleSprite)
    }
  }
}
</script>

<style lang="scss" scoped>

.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}

</style>
