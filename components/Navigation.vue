<template lang="pug">
  nav
    ul.navList
      li.navList-item(
        v-for="(navItem, index) in navList"
        :key="index"
      )
        a(
          :class="{ active: activeNav === index}"
          @click="handlePageTransition(index)"
        ) {{ navItem['label'] }}
</template>

<script>
// components
// library
import {mapGetters} from 'vuex'

export default {
  props: [
    'navList',
    'activeNav',
    'smoothScrollContainer'
  ],
  methods: {
   handlePageTransition(navIndex) {
     this.smoothScrollContainer.scrollTo(0, this.navList[navIndex].scrollTop, 600)
   }
  }
}
</script>

<style lang="scss" scoped>

nav {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 10;
}

.navList {
  text-align: right;

  &-item {
    a {
      position: relative;
      font-size: 1.6rem;
      font-family: $accent-font-family;
      transition: color .2s ease-out;
      &::before {
        content: '';
        position: absolute;
        top: calc(50% - 1px);
        left: 0;
        width: 0;
        height: 1px;
        background-color: $brand-primary;
        transition: width .2s ease-out;
      }
      &.active,
      &:hover {
        color: $brand-primary;
        &::before {
          width: 100%;
        }
      }
    }
    &:not(:first-child) {
      margin: 14px 0 0 0;
    }
  }
}

// * -------------------
// * sp layout
// * -------------------

@include mq($breakpoint: sm) {
  nav {
    bottom: 30px;
    right: 12px;
  }

  .navList {

    &-item {
      a {
        font-size: 1.4rem;
      }
      &:not(:first-child) {
        margin: 16px 0 0 0;
      }
    }
  }
}

</style>
