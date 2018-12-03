<template lang="pug">
  section#works
    ul.workList(
      ref="workList"
    )
      li.workList-item.anime-fadeIn_s(
        v-for="(data, index) in worksData"
        :key="index"
        @click="showDetail(index)"
      )
        h3.title {{ data['fields']['title'] }}
        .image-box
          PixiGlitch(
            :thumbnailUrl="data['fields']['heroImage']['fields']['file']['url']"
          )
        span.tag {{ data['fields']['tags'][0]}}
        .release {{ data['fields']['publishDate'] | formatYM('.')  }}


</template>

<script>
// components
import PixiGlitch from '~/components/PixiGlitch.vue'
// library
import {mapGetters} from 'vuex'

export default {
  components: {
    PixiGlitch
  },
  props: [
    'worksData',
    'callBack'
  ],
  data() {
    return {
    }
  },
  watch: {
  },
  mounted () {
    this.initAnime()
  },
  methods: {
    initAnime() {
      const items = this.$refs.workList.querySelectorAll('.workList-item')

      this.$fadeInAnime(items, 0.4)
    },
    showDetail(index) {
      this.$emit(this.callBack, index)
    }
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>

.workList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: auto;
  padding: 0 0 8%;
  max-width: 960px;

  &-item {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 0 80px;
    width: 43.75%;
    cursor: pointer;

    &:nth-child(even) {
      margin: 104px 0 0;
    }

    .title {
      order: 3;
      margin: 8px 0 0;
      font-size: 2.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .image-box {
      order: 1;
      position: relative;
      width: 100%;
      &::before {
        content:""; 
        display: block;
        padding-top: 66.66666%;
      }
    }
    .tag {
      order: 2;
      margin: 10px 0 0;
      font-size: 1.4rem;
      color: $yellow;
    }
    .release {
      position: absolute;
      top: 0;
      right: -73px;
      transform: rotate(90deg);
      font-size: 1.2rem;
      font-family: $accent-font-family;
      letter-spacing: 0.15em;
      transform-origin: left center;
    }
  }
}

// * -------------------
// * sp layout
// * -------------------

@include mq($breakpoint: sm) {
  .workList {
    flex-direction: column;
    margin: auto;
    padding: 0 0 16%;
    width: 96%;

    &-item {
      margin: 0px 0 24px;
      width: 100%;

      &:nth-child(even) {
        margin: 0 0 20px;
      }

      .title {
        order: 4;
        margin: 8px 0 0;
        font-size: 1.8rem;
      }
      .image-box {
        order: 2;
      }
      .tag {
        order: 3;
        margin: 10px 0 0;
        font-size: 1.2rem;
      }
      .release {
        order: 1;
        position: relative;
        top: 0;
        right: 0;
        margin: 0 0 7px;
        font-size: 1.2rem;
        text-align: right;
        transform: none;
      }
    }
  }
}

</style>
