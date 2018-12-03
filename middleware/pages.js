export default function(context) {
  context.store.commit('updatePage', context.route.name)
}