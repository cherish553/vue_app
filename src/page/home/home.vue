<template>
  <div class="h100">
    <div class="module">
      <div class="container">
        <div class="center" @click="$jump('Home-MyInfo')">
          <div >
            <img src="@img/flowExamine.png" alt>
            <p>流程审批</p>
          </div>
        </div>
        <div class="center mt20">
          <div>
            <img src="@img/dataForm.png" alt>
            <p>数据报表</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import { system } from '@/api'
// const { postAppMenu } = system
export default {
  computed: {
    ...mapState({
      data: state => state.user.userInfo.name
    })
  },
  data () {
    return {
      appList: []
    }
  },
  created () {
    // this._postAppMenu()
  },
  methods: {
    // 获取app菜单
    // async _postAppMenu () {
    //   this.appList = await postAppMenu()
    // }
  }
}
</script>
