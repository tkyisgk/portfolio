import Vue from 'vue'

export const imgLoad = Vue.mixin({
  data() {
    return {
      imagesNum: 0
    }
  },
  methods: {
    $imageOnLoad (src, func) {
      const img = new Image()
      img.onload = () => {
        func()
      }
      img.src = src
    },
    $loopImagesOnLoad (array, func = null) {
      const image = new Image()
      image.src = array[this.imagesNum]
      image.onload = () => {
        this.imagesNum++
        if(array.length !== this.imagesNum){
          this.$loopImagesOnLoad(array, func)
        } else {
          this.imagesNum = 0
          if (func) {
            func()
          }
        }
      }
    },
  }
})
