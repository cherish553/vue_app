<template>
  <div>
    <Top v-if="componentName==='Audit'" @_allCheck="$refs.Audit._allCheck()"/>
    <cherish-top :name="['待评审', '历史评审']" :indexs.sync="index"/>
    <component :ref="componentName" :is="componentName"></component>
    <cherish-bottom v-if="componentName==='Audit'" :option='option' @_submit="_submit" @_reject="_reject"/>
    <cherish-modal
      ref="modal"
      :show.sync="show"
      @_ok="_ok"
      :reason.sync="reason"
    />
  </div>
</template>
<script>
import { contract } from '@api'
import HistoricalAudit from './compoents/historicalAudit'
import Audit from './compoents/audit'
import Top from './top'
const { postSchemeReviewPass, postSchemeReviewBack } = contract
export default {
  components: {
    HistoricalAudit,
    Audit,
    Top
  },
  computed: {
    componentName () {
      return this.component[this.index]
    }
  },
  data () {
    return {
      reason: '',
      show: false,
      index: 0,
      component: ['Audit', 'HistoricalAudit'],
      option: [
        {
          name: '提交', color: '#e7340c', methods: '_submit'
        },
        {
          name: '驳回', color: '#ffa721', methods: '_reject'
        }
      ]
    }
  },
  methods: {
    // 处理方案评审-通过
    async _postSchemeReviewPass () {
      if (await postSchemeReviewPass({ ids: this.$refs.Audit.records })) return this.$toast('审批通过')
    },
    // 驳回弹框   点击确认
    async _ok () {
      if (!this.reason) return this.$toast('请填写驳回内容')
      if ((await this._postSchemeReviewBack())) this._refresh()
    },
    // 处理方案评审-驳回
    async _postSchemeReviewBack () {
      if (
        await postSchemeReviewBack({
          ids: this.$refs.Audit.records,
          remark: this.reason
        })) return this.$toast('驳回成功')
    },
    // 点击底部   提交
    async _submit () {
      if (!this.$refs.Audit.records.length) return this.$toast('至少选择一个')
      if (!await this.$confirms('确认提交')) return
      if (await this._postSchemeReviewPass()) this._refresh()
    },
    // 点击底部   驳回弹窗
    _reject () {
      if (!this.$refs.Audit.records.length) return this.$toast('至少选择一个')
      this.$refs.modal.value = ''
      this.reason = ''
      this.show = true
    },
    // 刷新列表并且关闭弹框
    _refresh () {
      this.show = false
      this.$refs.Audit._onRefresh()
    }
  }
}
</script>
