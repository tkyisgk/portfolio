import Vue from 'vue'

import imgLoad from './imgLoad'
import animation from './animation'
import polyfill from './polyfill'

Vue.mixin({
  filters: {
    formatYM: (baseStr, insertStr) => {
      const splits = baseStr.split('-')
      return splits[0] + insertStr + splits[1]
    },
  },
  methods: {
    $delay (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    $setDeviceHeight(el, minus = 0) {
      el.style.height = `${window.innerHeight - minus}px`
    },
  }
})
