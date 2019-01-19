<template lang="pug">
  .detail-container(
    ref="container"
  )
    .detail-inner(
      ref="inner"
    )
      .work-wrapper
        Article(
          :workData="workData"
        )

    .controllers(
      ref="controllers"
    )
      button(
        type="button"
        class="prev anime-fadeIn_m"
        @click="prevData"
      )
        span PREV
      button(
        type="button"
        class="close anime-fadeIn_m"
        @click="closeAnime"
      )
        span CLOSE
      button(
        type="button"
        class="next anime-fadeIn_m"
        @click="nextData"
      )
        span NEXT

    .masks(
      ref="masks"
    )
      .mask
      .mask
      .mask
        .mask-inner
          span.title {{ maskTitle }}

</template>

<script>
// components
import Article from "~/components/Article.vue"

// library
import { mapGetters } from "vuex"
import { TweenMax, Power3, Expo } from "gsap"
import Scrollbar from "smooth-scrollbar"

export default {
  components: {
    Article
  },
  props: [
    "worksData",
    "activeWorkIndex",
    "callBack"
  ],
  data() {
    return {
      workData: {},
      targetIndex: 0,
      maskTitle: "",
      smoothScrollContainer: "",
    }
  },
  created() {
    this.setIndex()
    this.initData()
  },
  mounted() {
    this.openAnime()
    this.setDeviceHeight()
    this.initSmoothScroll()
  },
  methods: {
    setIndex() {
      this.targetIndex = this.activeWorkIndex
    },
    initData() {
      this.workData = this.worksData[this.targetIndex]
      this.setTitle()
    },
    setTitle() {
      this.maskTitle = this.worksData[this.targetIndex]["fields"]["title"]
    },
    prevData() {
      if (this.targetIndex === 0) {
        this.targetIndex = this.worksData.length - 1
      } else {
        this.targetIndex--
      }
      this.setTitle()
      this.openAnime(this.initData)
    },
    nextData() {
      if (this.targetIndex === this.worksData.length - 1) {
        this.targetIndex = 0
      } else {
        this.targetIndex++
      }
      this.setTitle()
      this.openAnime(this.initData)
    },
    openAnime(callback = null) {
      const maskList = this.$refs.masks.querySelectorAll(".mask")

      const showInner = () => {
        TweenMax.set(this.$refs.inner, {
          opacity: 1,
          onComplete: () => {
            if (callback !== null) callback()
            this.scrollTop()
            hideMasks()
          }
        })
      }
      const hideMasks = () => {
        TweenMax.to(maskList, 0.6, {
          y: "+=100%",
          delay: 1,
          ease: Power3.easeIn,
          onComplete: () => {
            unvisibleMasks()
            showBtns()
          }
        })
      }
      const visibleMasks = () => {
        TweenMax.set(this.$refs.masks, {
          display: "block"
        })
      }
      const unvisibleMasks = () => {
        TweenMax.set(this.$refs.masks, {
          display: "none"
        })
      }
      const showBtns = () => {
        const controllers = this.$refs.controllers.querySelectorAll("button")

        this.$fadeInAnime(controllers)
      }

      requestAnimationFrame(() => {
        visibleMasks()

        TweenMax.staggerTo(
          maskList,
          0.6,
          {
            y: "-100%",
            ease: Power3.easeIn
          },
          0.1,
          showInner
        )
      })
    },
    closeAnime() {
      this.maskTitle = ""

      const hideBtns = () => {
        const controllers = this.$refs.controllers.querySelectorAll("button")

        this.$fadeOutAnime(controllers)
      }

      const hideInner = () => {
        TweenMax.set(this.$refs.inner, {
          opacity: 0,
          onComplete: () => moveMasks()
        })
      }

      const moveMasks = () => {
        TweenMax.staggerTo(
          this.$refs.masks.querySelectorAll(".mask"),
          0.6,
          {
            y: "100%",
            ease: Power3.easeIn
          },
          0.1,
          hideWorkDetail
        )
      }

      const hideWorkDetail = () => {
        this.$emit(this.callBack)
      }

      const visibleMasks = () => {
        TweenMax.set(this.$refs.masks, {
          display: "block"
        })
        TweenMax.set(this.$refs.masks.querySelectorAll(".mask"), {
          y: "-200%"
        })
      }

      requestAnimationFrame(() => {
        visibleMasks()
        hideBtns()

        TweenMax.staggerTo(
          this.$refs.masks.querySelectorAll(".mask"),
          0.6,
          {
            y: "-100%",
            ease: Power3.easeIn
          },
          0.1,
          hideInner
        )
      })
    },
    initSmoothScroll() {
      const scrollOptions = {
        damping: this.$device.isMobile ? 0.2 : 0.8,
        renderByPixels: false,
        syncCallbacks: true
      }
      this.smoothScrollContainer = Scrollbar.init(this.$refs.inner, scrollOptions)
    },
    scrollTop() {
      this.smoothScrollContainer.scrollTo(0, 0)
    },
    setDeviceHeight() {
      if (this.$device.isDesktop) return

      this.$setDeviceHeight(this.$refs.container)
      this.$setDeviceHeight(this.$refs.inner, this.$refs.controllers.clientHeight)
      this.$setDeviceHeight(this.$refs.masks)

      this.resizeEvent()
    },
    resizeEvent(type = "init") {
      switch (type) {
        case "init":
          window.addEventListener("resize", this.setDeviceHeight)
          break
        case "destroy":
          window.removeEventListener("resize", this.setDeviceHeight)
          break
      }
    }
  },
  destroyed() {
    this.resizeEvent("destroy")
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
}

.detail-inner {
  width: inherit;
  height: calc(100vh - 62px);
  background-color: rgba(0, 0, 0, 1);
  opacity: 0;

  .work-wrapper {
    overflow: auto;
  }
}

.controllers {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 62px;

  button {
    width: 33.33333%;
    height: 100%;
    background-color: rgba($grey-01, 1);
    transition: all 0.2s ease-out;
    &.close {
      order: 2;
      text-align: center;
    }
    &.prev {
      order: 1;
      padding: 0 0 0 30px;
      text-align: left;
    }
    &.next {
      order: 3;
      padding: 0 30px 0 0;
      text-align: right;
    }
    span {
      position: relative;
      display: inline-block;
      font-size: 1.6rem;
      color: $text-inverse;
      font-family: $accent-font-family;
      font-weight: 700;
      letter-spacing: 0.1em;
      transition: all 0.2s ease-out;
    }
    &:hover {
      background-color: $blue;
      span {
        color: $text-base;
      }
    }
  }
}

.masks {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  .mask {
    position: absolute;
    top: 100%;
    left: 0;
    width: inherit;
    height: inherit;
    &:nth-child(1) {
      background: $red;
    }
    &:nth-child(2) {
      background: $grey-01;
    }
    &:nth-child(3) {
      background: $blue;
    }
    &-inner {
      display: flex;
      justify-content: center;
      align-items: center;
      width: inherit;
      height: inherit;
      .title {
        @include fitFontSize(120);
        font-family: $accent-font-family;
        font-weight: 700;
      }
    }
  }
}

// * -------------------
// * sp layout
// * -------------------

@include mq($breakpoint: sm) {
  .detail-inner {
    .work-wrapper {
      margin: auto;
      width: 94%;
    }
  }

  .controllers {
    min-height: 50px;
    height: 50px;

    button {
      span {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
