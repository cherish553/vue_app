import Vue from 'vue'
import Vuex from 'vuex'
import modules from './store'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules,
  // 严格模式，禁止直接修改 state
  strict: true
})

export default store
