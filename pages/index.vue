<template lang="pug">
  .page-container
    Navigation(
      :navList="navList"
      :activeNav="activeSection",
      :smoothScrollContainer="smoothScrollContainer"
    )

    PixiParticle

    .page-wrapper(
      ref="container"
    )

      .page-inner(
        v-if="isImgLoaded"
      )

        SectionHeader(
          ref="headerSection"
        )

        SectionWorks(
          ref="workSection"
          :worksData="worksData"
          callBack="showDetail"
          @showDetail="showDetail"
        )

        SectionAboutMe(
          ref="aboutSection"
        )

        Footer

    .page-insert(
      v-if="isShowDetail"
    )
      WorkDetail(
        :worksData="worksData"
        :activeWorkIndex="activeWorkIndex"
        callBack="closeDetail"
        @closeDetail="closeDetail"
      )

</template>

<script>
// components

import Navigation from '~/components/Navigation.vue'
import PixiParticle from '~/components/PixiParticle.vue'
import SectionHeader from '~/components/SectionHeader.vue'
import SectionWorks from '~/components/SectionWorks.vue'
import SectionAboutMe from '~/components/SectionAboutMe.vue'
import WorkDetail from '~/components/WorkDetail.vue'
import Footer from '~/components/Footer.vue'
// library
import { mapGetters } from 'vuex'
import { createClient } from '~/plugins/contentful.js'
import { TweenMax, Circ, Expo } from 'gsap'
import Scrollbar from 'smooth-scrollbar'

const client = createClient()

export default {
  components: {
    Navigation,
    PixiParticle,
    SectionHeader,
    SectionWorks,
    SectionAboutMe,
    WorkDetail,
    Footer
  },
  asyncData({env}) {
    return client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
    }).then(posts => {
      return { worksData: posts.items }
    }).catch(e => {
      error({ statusCode: 404, message: 'データが取得できません' })
    })
  },
  data() {
    return {
      isShowDetail: false,
      activeWorkIndex: 0,
      activeSection: 0,
      smoothScrollContainer: {},
      scrollY: 0,
      navList: [
        {
          name: 'top',
          label: 'Top',
          scrollTop: 0
        },
        {
          name: 'works',
          label: 'Works',
          scrollTop: 0
        },
        {
          name: 'about',
          label: 'About Me',
          scrollTop: 0
        }
      ],
    }
  },
  computed: {
    ...mapGetters({
      isImgLoaded: 'isImgLoaded'
    })
  },
  watch: {
    async isImgLoaded() {
      // アニメーション開始

      await this.$delay(0)
      this.initSmoothScroll()
    }
  },
  created () {
    this.imgLoad()
  },
  mounted () {
  },
  methods: {
    imgLoad() {
      const imgList = []
      this.worksData.forEach( (item) => {
        imgList.push(item['fields']['heroImage']['fields']['file']['url'])
      })
      // 画像を読み込み後に表示する
      this.$loopImagesOnLoad(imgList, () => {
        this.$store.commit('imgLoaded', true)
      })
    },
    showDetail(index) {
      this.activeWorkIndex = index
      this.isShowDetail = true
    },
    closeDetail() {
      this.isShowDetail = false
    },
    initSmoothScroll() {
      const scrollOptions = {
        damping: this.$device.isMobile ? .2 : .8,
        renderByPixels: false,
        syncCallbacks: true,
      }
      this.smoothScrollContainer = Scrollbar.init(this.$refs.container, scrollOptions)

      this.navList[0].scrollTop = this.$refs.headerSection.$el.getBoundingClientRect().y,
      this.navList[1].scrollTop = this.$refs.workSection.$el.getBoundingClientRect().y,
      this.navList[2].scrollTop = this.$refs.aboutSection.$el.getBoundingClientRect().y

      this.smoothScrollContainer.addListener(({ offset }) => { 
        // 上下どちらのスクロールか判断する
        let direction
        if (this.scrollY <= offset.y) {
          direction = 'down'
        } else {
          direction = 'up'
        }

        switch(direction) {
          case 'down':
            if (this.navList.length - 1 === this.activeSection) return

            if (this.navList[this.activeSection + 1].scrollTop <= offset.y) {
              this.activeSection++
            }
            break
          case 'up':
            if (0 === this.activeSection) return

            if (offset.y < this.navList[this.activeSection].scrollTop) {
              this.activeSection--
            }
            break
        }
        // 現在のスクロール位置を保持
        this.scrollY = offset.y

      })
    }
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  position: relative;
  .page-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
}

</style>
