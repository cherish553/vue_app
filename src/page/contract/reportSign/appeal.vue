<template>
  <div class="item-detail">
    <div class="myInfo-title flex">
      <span class="w74">申诉人 :</span>
      <van-field placeholder='请输入申诉人'  v-model="form.negotiationUserName"/>
    </div>
    <div class="myInfo-title flex">
      <span class="w74">检测人 :</span>
      <van-field placeholder='请输入检测人' v-model="form.endName"/>
    </div>
    <div class="myInfo-title flex">
      <span class="w74">申诉时间 :</span>
      <van-field placeholder='请选择申诉时间' readonly @focus='show=true' @_focus='show=false' :value="date"/>
    </div>
    <div class="myInfo-title">
        <span>申诉原因 :</span>
       <div class="nopadding">
      <van-field  placeholder='请输入申诉原因' rows="1" autosize type="textarea" v-model="form.allegeReason"/>
       </div>
    </div>
     <van-datetime-picker
     @confirm='_confirm'
     @cancel='show = false'
     v-show="show"
        v-model="form.allegeDate"
        type="datetime"
      />
    <cherish-bottom :option='option' @_submit="_submit"/>
  </div>
</template>
<script>
import { contract } from '@api'
const { postReportMeetingAppeal } = contract
export default {
  data () {
    return {
      show: false,
      value: '',
      form: {
        ids: this.$route.query.ids,
        negotiationUserName: '',
        endName: '',
        allegeDate: new Date(),
        allegeReason: ''
      },
      option: [
        {
          name: '确认', color: '#e7340c', methods: '_submit'
        }
      ]
    }
  },
  computed: {
    date () {
      let time = this.form.allegeDate
      if (!time) return ''
      time = new Date(time)
      const year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      let hours = time.getHours()
      let minutes = time.getMinutes()
      day = day > 9 ? day : '0' + day
      month = month > 9 ? month : '0' + month
      hours = hours > 9 ? hours : '0' + hours
      minutes = minutes > 9 ? minutes : '0' + minutes
      return `${year}-${month}-${day}  ${hours}:${minutes}`
    }
  },
  methods: {
    // 报告会签申诉提交
    async _postReportMeetingAppeal () {
      if (await postReportMeetingAppeal(this.form)) return this.$toast('申诉成功')
    },
    // 时间选择器点击确认
    _confirm (e) {
      if (!this.form.allegeDate) this.form.allegeDate = `${e}`
      this.show = false
    },
    // 点击底部的提交
    async _submit () {
      this.form.allegeDate = this.date
      if (!this.form.negotiationUserName) return this.$toast('请输入申诉人')
      if (!this.form.endName) return this.$toast('请输入检测人')
      if (!this.form.allegeDate) return this.$toast('请选择申诉时间')
      if (!this.form.allegeReason) return this.$toast('请输入申诉原因')
      if (await this._postReportMeetingAppeal()) this.$back()
    }
  }
}
</script>
