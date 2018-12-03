import Vue from 'vue'
import {TweenMax, Power3} from 'gsap'

export const animetion = Vue.mixin({
  methods: {
    $fadeInAnime(array, delay = 0, func = null) {
      requestAnimationFrame(() => {

        TweenMax.staggerTo(array, 1, {
          alpha: 1,
          y: 0,
          delay: delay,
          ease: Power3.easeIn,
        }, .1, () => {
          if (func) {
            func
          }
        })

      })
    },
    $fadeOutAnime(array, delay = 0, func = null) {
      requestAnimationFrame(() => {

        TweenMax.staggerTo(array, .2, {
          alpha: 0,
          y: '100%',
          delay: delay,
          ease: Power3.easeOut,
        }, .1, () => {
          if (func) {
            func
          }
        })

      })
    }
  }
})
