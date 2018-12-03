<template>
  <div>
    <div class="container-wrapper">
      <h2 class="notfound">Not Found</h2>
      <div class="action-box">
        <nuxt-link to="/">Top Page</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
// component
// library
import {mapGetters} from 'vuex'
export default {
  props: ['error'],
  components: {
  },
  computed: {
    ...mapGetters({
    })
  },
  created() {
  },
}
</script>

<style lang="scss" scoped>
.container-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .notfound {
    font-size: 6.6rem;
    font-family: "objektiv-mk1";
    font-weight: 800;
  }
}

/* --------------------------------
 * smart phone
 * -------------------------------- */

@include mq($breakpoint: md) {
  .container-wrapper {
    width: 100%;
    text-align: center;
    .notfound {
      font-size: 3.8rem;
    }
    .action-box {
      margin: 11% auto 3%;
    }
  }
}
</style>
