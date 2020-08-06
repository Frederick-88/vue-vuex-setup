import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import App from "./App"
import store from "./store"
import "./main.css"

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app")
