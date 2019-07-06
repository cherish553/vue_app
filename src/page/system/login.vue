<template>
  <div>
    <div class="logo">
      <img src="@img/WJL.png">
    </div>
    <cherish-input
      icon="phone"
      mt="40"
      placeholder="请输入您的账户"
      :value="form.username"
      :data.sync="form.username"
    ></cherish-input>
    <cherish-input
      icon="psd"
      :data.sync="form.password"
      placeholder="请输入您的密码"
      :value="form.password"
      type="password"
    ></cherish-input>
    <div class="memberPass">
      <el-checkbox  v-model="checked" @change="!checked">记住密码</el-checkbox>
      <div @click="$jump('System-RetrievePass')" class="forgetPass">忘记密码？</div>
    </div>
    <div class="login" @click="_login">立即登录</div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { system } from '@/api'
const { login } = system
export default {
  data () {
    return {
      checked: true,
      form: {
        username: this.$getStorage('username') || '',
        password: this.$getStorage('password') || '',
        newPwd: ''
      }
    }
  },
  methods: {
    ...mapActions({
      // 获取用户信息
      _getUserInfo: 'user/getUserInfo'
    }),
    // 登录
    async _login () {
      // 通过验证
      if (this._checkSubmit() !== true) return
      this.$toast({ message: '登录中...', duration: 0 })
      const token = await login(this.form)
      if (token === -5) return
      this.$toast.clear()
      // token为false去激活
      if (!token) return this._inactivate()
      // 获取用户信息
      this._getUserInfo()
      this.$setToken(token)
      // 是否选择记住密码
      if (this.checked) {
        this.$setUserName(this.form.username)
        if (this.form.newPwd) this.$setPassWord(this.form.newPwd)
        else this.$setPassWord(this.form.password)
      } else {
        this.$removeStorage('username')
        this.$removeStorage('password')
      }
      this.$jump('Home-Home')
    },
    // 验证
    _checkSubmit () {
      if (!this.form.username) return this.$toast('请输入用户名')
      if (!this.form.password) return this.$toast('请输入密码')
      if (!/^[a-zA-Z0-9]{6,20}$/.test(this.form.password)) { return this.$toast('密码为6-20位字母或数字') }
      return true
    },
    // 首次输入需要激活
    async _inactivate () {
      const { value } = await this._prompt()
      this.form.newPwd = value
      this._login()
    },
    // 再次输入密码弹窗
    _prompt () {
      return this.$prompt('请输入密码', '', {
        center: true,
        inputType: 'password',
        showClose: false,
        customClass: 'w80',
        confirmButtonText: '确定',
        inputPattern: /^[a-zA-Z0-9]{6,20}$/,
        showCancelButton: false,
        inputErrorMessage: '密码为6-20位字母或数字',
        beforeClose (action, instance, done) {
          switch (action) {
            case 'confirm':
              done()
          }
        }
      })
    }
  }
}
</script>
