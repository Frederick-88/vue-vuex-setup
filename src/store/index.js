import Vue from "vue"
import Vuex from "vuex"
import VuexPersist from "vuex-persist"
// todos
import todosState from "./todos/state"
import todosActions from "./todos/actions"
import todosMutations from "./todos/mutations"
import todosGetters from "./todos/getters"

Vue.use(Vuex)

// this will make state persist within the app
const vuexLocalStorage = new VuexPersist({
  key: "vue-vuex-todos", // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  reducer: (state) => ({
    todos: state.todos,
  }),
})

export default new Vuex.Store({
  state: {
    todos: todosState,
    theme: false, // false = light | true = dark
  },
  actions: {
    ...todosActions,
    setTheme({ commit }, payload) {
      commit("SET_THEME", payload)
    },
  },
  mutations: {
    ...todosMutations,
    SET_THEME(state, theme) {
      state.theme = theme
    },
  },
  getters: {
    ...todosGetters,
  },
  plugins: [vuexLocalStorage.plugin],
})
