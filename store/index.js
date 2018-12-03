export const state = () => ({
  page: 'index',
  isImgLoaded: false
})

export const getters = {
  page: state => state.page,
  isImgLoaded: state => state.isImgLoaded,
}

export const mutations = {
  updatePage(state, pageName) {
    state.page = pageName
  },
  imgLoaded(state, boolean) {
    state.isImgLoaded = boolean
  }
}