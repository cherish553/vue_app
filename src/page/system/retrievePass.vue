<template>
  <div>
    <img @click="$jump('System-Login')" class="back" src="@img/back.png" alt>
    <div class="passLogo">
      <img src="@img/ZH.png">
    </div>
    <cherish-input
      icon="phone"
      mt="40"
      :data.sync="form.mobile"
      placeholder="请输入您的手机号"
      :value="form.mobile"
    ></cherish-input>
    <div class="code">
      <cherish-input icon="code" :data.sync="form.code" placeholder="验证码" :value="form.code"></cherish-input>
      <div class="codes" @click="_getCode">验证码</div>
    </div>
    <cherish-input
      icon="psd"
      type="password"
      :data.sync="form.password"
      placeholder="请输入您的新密码"
      :value="form.userName"
    ></cherish-input>
    <div class="login" @click="_changPwd">即 刻 去 登 录</div>
  </div>
</template>
<script>
import { system } from '@/api'
const { getCode, changPwd } = system
export default {
  data () {
    return {
      form: {
        mobile: '',
        password: '',
        code: ''
      }
    }
  },
  methods: {
    // 修改密码
    async _changPwd () {
      if (this._submitCheck() !== true) return
      const data = await changPwd(this.form)
      console.log(data)
    },
    // 获取验证码
    async _getCode () {
      if (!this.form.mobile) return this.$toast('请输入手机号')
      if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.form.mobile
        )
      ) return this.$toast('手机号格式不正确')
      if (await getCode({ mobile: this.form.mobile })) this.$toast('发送成功')
    },
    // 校验输入内容是否正确
    _submitCheck () {
      if (this.form.mobile === '') return this.$toast('请输入手机号')
      else if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.form.mobile
        )
      ) return this.$toast('手机号格式不正确')
      if (this.form.code === '') return this.$toast('请输入验证码')
      if (this.form.password === '') return this.$toast('请输入密码')
      else if (!/^[a-zA-Z0-9]{6,20}$/.test(this.form.password)) return this.$toast('密码为6-20位字母或数字')
      return true
    }
  }
}
</script>
