import { vue } from '@/main.js'
export default {
  install (Vue) {
    // 获取token
    Vue.prototype.$setToken = setStorage('accessToken')
    // 获取userNmae
    Vue.prototype.$setUserName = setStorage('username')
    // 获取密码
    Vue.prototype.$setPassWord = setStorage('password')
    // 通过name跳转
    Vue.prototype.$jump = (name, query = {}) => vue.$router.push({ name, query })
    // 通过path跳转
    Vue.prototype.$path = (path, query = {}) => vue.$router.push({ path: `wjl/${path}`, query })
    // 消息跳转
    Vue.prototype.$jumpPage = path => vue.$router.push({ path: `${path.trim()}` })
    // 返回上一级路由
    Vue.prototype.$back = () => vue.$router.go(-1)
    // 获取Storage
    Vue.prototype.$getStorage = key => localStorage.getItem(`${key}`)
    // 移除storage
    Vue.prototype.$removeStorage = key => localStorage.removeItem(`${key}`)
    // vant dialog
    Vue.prototype.$confirms = (title, message = '') => vue.$dialog.confirm({ className: 'w75', title, message, confirmButtonColor: '#e7340c' }).catch(() => '')
    // 打印
    Vue.prototype.log = value => console.log(`%c ${value}`, 'color:white;background:black;font-size:20px;')
  }
}
// 柯里化
export const getToken = () => localStorage.getItem(`accessToken`)
const setStorage = key => value => localStorage.setItem(`${key}`, `${value}`)
