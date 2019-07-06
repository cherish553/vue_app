import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from '@/plugin/vant'
import element from '@/plugin/element'
import common from '@/common'
import cherish from '@/components'
import filter from '@/filter'
/***
  vconsole在手机端调试console。发布之前删除
*/
// import Vconsole from 'vconsole'
// const vconsole = new Vconsole()
// export default vconsole
Vue.use(cherish)
  .use(element)
  .use(vant)
  .use(common)
  .filter('getTime', filter.getTime)

Vue.config.productionTip = false

export const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
