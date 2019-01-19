import Vue from 'vue'

export const polyfill =  Vue.mixin({
  methods: {
    $closest(node, selector) {
      return (node.closest || function(_selector) {
        do {
          // nodeとselectorがマッチしたら返す
          if ((node.matches || node.msMatchesSelector).call(node, _selector)) {
            return node
          }
          // マッチしなかったら親要素を代入
          node = node.parentElement || node.parentNode
        } while (node !== null && node.nodeType === 1)

        return null
      }).call(node, selector)
    },
  }
})
