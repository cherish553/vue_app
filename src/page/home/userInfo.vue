<template>
  <div>
    <div class="module">
      <div class="item plpr bt1">
        <span class="tag blue"></span>
          <div>
          <p>所属部门:</p>
          <p>{{userInfo.orgNames}}</p>
        </div>
      </div>
      <div class="item plpr bt1 bb1">
        <span class='tag blue'></span>
         <div>
           <p>所属角色:</p>
          <p>{{userInfo.roleNames}}</p>
        </div>
      </div>
    </div>
    <div class="module mt10">
      <div class="item plpr bt1">
        <span class='tag red'></span>
        <div>
          <p>真实姓名:</p>
          <p>{{userInfo.realname}}</p>
        </div>
      </div>
      <div class="item plpr bt1 bb1">
        <span class='tag red'></span>
        <div>
          <p>性 别:</p>
          <p>{{userInfo.sex===0?'男':'女'}}</p>
        </div>
      </div>
    </div>
    <div class="module mt10">
      <div class="item plpr bt1">
        <span class='tag blue'></span>
        <div>
          <p>手机号码:</p>
          <p>{{userInfo.mobile}}</p>
        </div>
      </div>
      <div class="item plpr bt1">
        <span class='tag blue'></span>
        <div>
          <p>个人邮箱:</p>
          <p>{{userInfo.email}}</p>
        </div>
      </div>
      <div class="item plpr bt1 bb1">
        <span class='tag blue'></span>
        <div>
          <p>联系QQ:</p>
          <p>{{userInfo.qq}}</p>
        </div>
      </div>
      <div class="login ml10 mr10" @click='_logout'>退出登录</div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    // 退出登录
    _logout () {
      this.$removeStorage('accessToken')
      this.$jump('System-Login')
    }
  }
}
</script>
