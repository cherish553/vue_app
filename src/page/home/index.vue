<template>
  <div class="bottom-tabbar">
    <top :userInfo="userInfo"/>
    <router-view/>
    <bottom/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import top from './compoents/top'
import bottom from './compoents/bottom'
// import { system } from '@/api'
// const { userRelResource } = system
export default {
  components: {
    top,
    bottom
  },
  created () {
    // this._userRelResource()
  },
  methods: {
    // 获取用户权限列表
    // async _userRelResource () {
    //   const data = await userRelResource()
    //   console.log(data)
    // }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  }
}
</script>
