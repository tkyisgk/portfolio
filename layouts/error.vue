<template lang="pug">
  div
    .container-wrapper
      h2.notfound {{ error.message }}
</template>

<script>
// component
// library
export default {
  props: ['error']
}
</script>

<style lang="scss" scoped>
.container-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .notfound {
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 1.4;
  }
}

/* --------------------------------
 * smart phone
 * -------------------------------- */

@include mq($breakpoint: md) {
  .container-wrapper {
    padding: 0 20px;
    width: 100%;
    .notfound {
      font-size: 2.0rem;
    }
  }
}
</style>
