export default {
  setTodos: ({ commit }, payload) => {
    commit("SET_TODOS", payload)
    commit("SET_TODOS_COUNT")
  },
}
