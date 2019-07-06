import Vue from 'vue'
import Router from 'vue-router'
import Routes from './routers'
import { getToken } from '@/common'
Vue.use(Router)

const router = new Router({
  routes: Routes
})
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!to.name) return next({ name: 'System-Login' })
  else if (to.name === 'System-Login' || to.name === 'System-RetrievePass') return next()
  else if (!token || token === 'undefiend' || token === 'null') return next({ name: 'System-Login' })
  next()
})

export default router
