<template lang="pug" >
  .container
    nuxt
</template>

<script>
// component
// library
import {mapGetters} from 'vuex'
import {TweenMax, TimelineMax, Power2, Power3, Expo, Circ} from 'gsap'

export default {
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      page: 'page',
    })
  },
  created() {
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

.container {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

</style>
