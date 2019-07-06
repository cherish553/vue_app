<template>
  <div class="pb50">
    <Top @_allCheck="$refs.Main._allCheck()"/>
    <Main :ref="Main"/>
    <cherish-bottom :option='option' @_submit="_submit" @_reject="_reject"/>
    <cherish-modal
      ref="modal"
      :show.sync="show"
      @_ok="_ok"
      :reason.sync="reason"
    />
  </div>
</template>
<script>
import Main from './main'
import Top from './top'
import { contract } from '@api'
const { postSupplyBack, postSupplyPass } = contract
export default {
  data () {
    return {
      Main: 'Main',
      show: false,
      reason: '',
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
  components: {
    Main,
    Top
  },
  methods: {
    // 点击底部   提交
    async _submit () {
      if (!this.$refs.Main.records.length) return this.$toast('至少选择一个')
      if (!await this.$confirms('确认提交')) return
      if (await this._postSupplyPass()) this._refresh()
    },
    // 点击底部   驳回弹窗
    _reject () {
      if (!this.$refs.Main.records.length) return this.$toast('至少选择一个')
      this.$refs.modal.value = ''
      this.reason = ''
      this.show = true
    },
    // 驳回弹框   点击确认
    async _ok () {
      if (!this.reason) return this.$toast('请填写驳回内容')
      if ((await this._postSupplyBack())) this._refresh()
    },
    // 供应部审核通过
    async _postSupplyPass () {
      if (await postSupplyPass({ ids: this.$refs.Main.records })) return this.$toast('批准通过')
    },
    // 供应部审核驳回
    async _postSupplyBack () {
      if (await postSupplyBack({
        ids: this.$refs.Main.records,
        reason: this.reason
      })) return this.$toast('驳回成功')
    },
    // 刷新列表并且关闭弹框
    _refresh () {
      this.show = false
      this.$refs.Main._onRefresh()
    }
  }
}
</script>
