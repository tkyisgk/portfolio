const config = require('./.contentful.json')
require('dotenv').config()

module.exports = {
  /**
   * single page application
   */
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'TAKUYA ISHIGAKI',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },

      { name: 'Keywords', content: '' },
      { hid: 'description', name: 'description', content: 'Takuya Ishigaki - Web Developer in Japan.' },
      { name: 'og:title', content: 'TAKUYA ISHIGAKI' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'http://pf.tkyisgk.com/' },
      { name: 'og:image', content: 'http://pf.tkyisgk.com/assets/ogp.png' },
      { name: 'og:description', content: 'Takuya Ishigaki - Web Developer in Japan.' },
      { name: 'og:site_name', content: 'TAKUYA ISHIGAKI' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@web_des_igner' },
      { name: 'theme-color', content: '#111f4d' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/assets/favicon.ico' },
      { rel: 'apple-touch-icon-precomposed', href: '/assets/apple-touch-icon.png' },
    ]
  },
  css: [
    '~/assets/scss/cores/_reset.scss',
    '~/assets/scss/cores/_fonts.scss',
    '~/assets/scss/cores/_foundation.scss',
    '~/assets/scss/cores/_animation.scss',
  ],
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: config.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID
  },
  modules: [
    ['nuxt-sass-resources-loader', {
      resources: [
        '~/assets/scss/variables/*.scss',
        '~/assets/scss/mixins/*.scss',
      ]
    }],
    'nuxt-device-detect', // デバイス判定
    'nuxt-user-agent', // userAgent判定
  ],
  /*
  ** Customize the progress bar color
  */
  loading: false,
  /**
   * middleware
   */
  router: {
    middleware: 'pages'
  },
  /*
  ** 共通で利用するスクリプト
  */
  plugins: [
    '~/plugins/mixin',
    '~/plugins/contentful',
  ],
  /*
  ** Build configuration
  */
  build: {
    /**
     * 重複してバンドルさせないため、よく使うライブラリは定義しておく。
     * https://ja.nuxtjs.org/guide/plugins/
     */
    vendor: [
      'gsap',
      'pixi.js'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
}
