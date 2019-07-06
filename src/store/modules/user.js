import { system } from '@/api'
const { getUserInfo } = system
const user = {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    getUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    async getUserInfo ({ commit, state }, args) {
      commit('getUserInfo', await getUserInfo())
    }
  }
}
export default user
