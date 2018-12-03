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
    $scrollEventOnce(e, callback) {
      const delta = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.detail);
      if (!delta) {
        return;
      }
      const uintDelta = Math.abs(delta);

      if (uintDelta - this.scrollData.delta > 0) {
        const timeStamp = e.timeStamp;

        if (!this.scrollData.delta) {
          this.scrollData.timeStamp = timeStamp - this.scrollData.sleep - 100;
        }

        if (!this.scrollData.isFired && timeStamp - this.scrollData.timeStamp > this.scrollData.sleep) {
          // コールバック実行
          callback(e)
          this.scrollData.isFired = true;
        }
        this.scrollData.timeStamp = timeStamp;
      } else {
        this.scrollData.isFired = false;
      }
      this.scrollData.delta = uintDelta;
    },
    $setDeviceHeight(el, minus = 0) {
      el.style.height = `${window.innerHeight - minus}px`
    },
  }
})
