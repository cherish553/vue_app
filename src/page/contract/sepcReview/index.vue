<template>
  <div>
    <cherish-top :name="['待审核', '历史审核']" :indexs.sync="index"/>
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
const { postExamineAdopt, postExamineBack } = contract
export default {
  components: {
    HistoricalAudit,
    Audit
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
    // 型号变更复核通过
    async _postExamineAdopt () {
      if (await postExamineAdopt({ ids: this.$refs.Audit.records })) return this.$toast('审批通过')
    },
    // 驳回弹框   点击确认
    async _ok () {
      if (!this.reason) return this.$toast('请填写驳回内容')
      if ((await this._postExamineBack())) this._refresh()
    },
    // 型号变更复核驳回
    async _postExamineBack () {
      if (
        await postExamineBack({
          ids: this.$refs.Audit.records,
          remark: this.reason
        })) return this.$toast('驳回成功')
    },
    // 点击底部   提交
    async _submit () {
      if (!this.$refs.Audit.records) return this.$toast('至少选择一个')
      if (!await this.$confirms('确认提交')) return
      if (await this._postExamineAdopt()) this._refresh()
    },
    // 点击底部   驳回弹窗
    _reject () {
      if (!this.$refs.Audit.records) return this.$toast('至少选择一个')
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
