<template lang="pug">
  article
    h2.title {{ workData['fields']['title'] }}
    .article-head
      .head-detail
        .details
          dl
            dt Caption
            dd {{ workData['fields']['description'] }}
          dl
            dt Tags
            dd
              ul.tagList
                li.tagList-item(
                  v-for="(tag, index) in workData['fields']['tags']"
                  :key="index"
                ) {{ tag }}
          dl
            dt Release
            dd {{ workData['fields']['publishDate'] | formatYM('.') }}
              
          dl
            dt Site
            dd
              a(
                :href="workData['fields']['siteUrl']"
                target="_blank"
              ) {{ workData['fields']['siteUrl'] }}
      .head-image
        img(
          :src="workData['fields']['heroImage']['fields']['file']['url']"
          :alt="workData['fields']['title']"
        )
    .article-body
      vue-markdown(
        :source="workData['fields']['body']"
      )

</template>

<script>
// components

// library
import VueMarkdown from "vue-markdown"

export default {
  components: {
    VueMarkdown
  },
  props: ["workData"],
  data() {
    return {
    };
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
  },
  destroyed() {
  }
};
</script>

<style lang="scss" scoped>
article {
  margin: auto;
  padding: 74px 0;
  max-width: 960px;

  .title {
    font-size: 3.2rem;
    font-weight: 700;
  }

  .article-head {
    display: flex;
    align-items: flex-start;
    margin: 5% 0 0;

    .head-detail {
      flex-grow: 1;
      .details {
        dl {
          padding: 0 16px 0 0;
          &:not(:first-child) {
            margin: 5% 0 0;
          }
          dt {
            font-size: 1.4rem;
            font-family: $accent-font-family;
            font-weight: 700;
            color: $yellow;
          }
          dd {
            margin: 7px 0 0;
            font-size: 1.6rem;

            .tagList {
              display: flex;
              flex-wrap: wrap;
              &-item {
                &:not(:first-child) {
                  &::before {
                    content: "/";
                    padding: 0 8px;
                  }
                }
              }
            }

            a {
              position: relative;
              transition: color 0.3s ease-out;
              &::before {
                content: "";
                position: absolute;
                top: calc(50% - 1px);
                left: 0;
                width: 0;
                height: 1px;
                background-color: $brand-primary;
                transition: width 0.3s ease-out;
              }
              &:hover {
                color: $brand-primary;
                transition: color 0.7s ease-out;
                &::before {
                  width: 100%;
                  transition: width 0.7s ease-out;
                }
              }
            }
          }
        }
      }
    }
    .head-image {
      margin: -18px 0 0;
      max-width: 45.3125%;
      min-width: 45.3125%;
    }
  }
  .article-body /deep/ {
    margin: 8% 0 0;

    // contentfulのmarkdownで入力する
    h3 {
      position: relative;
      margin: 0 0 4%;
      padding: 0 0 20px 0px;
      font-size: 1.8rem;
      font-weight: 700;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6px;
        background-color: rgba($text-base, 0.4);
      }
    }

    p {
      font-size: 1.6rem;
      line-height: 2;
      letter-spacing: 0.1em;
      em {
        font-style: italic;
      }
      strong {
        color: $yellow;
        font-weight: 700;
      }
    }
    ul {
      padding: 0 10px;
      list-style-type: disc;
      li {
        margin: 3px 0;
        font-size: 1.6rem;
        line-height: 2;
      }
    }
    blockquote {
      position: relative;
      padding: 0 0 0 17px;
      font-style: italic;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 3px;
        height: 92%;
        background-color: rgba($text-base, 0.4);
      }
    }
    * {
      margin: 20px 0;
      & + h3 {
        margin: 6% 0 4%;
      }
    }
  }
}

// * -------------------
// * sp layout
// * -------------------

@include mq($breakpoint: sm) {
  article {
    margin: auto;
    padding: 37px 0;
    max-width: 100%;

    .title {
      font-size: 2.4rem;
    }

    .article-head {
      flex-direction: column;
      align-items: flex-start;
      margin: 10% 0 0;

      .head-detail {
        flex-grow: 1;
        .details {
          dl {
            padding: 0 0 0 4px;
            &:not(:first-child) {
              margin: 18% 0 0;
            }
            dt {
              font-size: 1.2rem;
            }
            dd {
              margin: 7px 0 0;
              font-size: 1.4rem;

              .tagList {
                &-item {
                  &:not(:first-child) {
                    &::before {
                      padding: 0 4px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .head-image {
        margin: 6% 0 0;
        min-width: 100%;
      }
    }
    .article-body /deep/ {
      margin: 12% 0 0;

      // contentfulのmarkdownで入力する
      h3 {
        margin: 0 0 4%;
        padding: 0 0 16px 0px;
        font-size: 1.6rem;
        &::after {
          height: 4px;
        }
      }

      p {
        font-size: 1.3rem;
      }
      ul {
        padding: 0 6%;
        li {
          margin: 8px;
          font-size: 1.3rem;
        }
      }
      blockquote {
        padding: 0 0 0 13px;
        &::before {
          width: 2px;
          height: 98%;
        }
      }
      * {
        margin: 5% 0;
        & + h3 {
          margin: 8% 0 5%;
        }
      }
    }
  }
}
</style>
