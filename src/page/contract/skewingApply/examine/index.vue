<template>
  <div>
     <Top @_allCheck="$refs.Main._allCheck()"/>
    <Main ref='Main' />
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
import { contract } from '@api'
import Main from './main'
import Top from './top'
const { postDeviatePass, postDeviateBack } = contract
export default {
  components: {
    Main,
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
    // 偏离申请通过
    async _postDeviatePass () {
      if (await postDeviatePass({ ids: this.$refs.Main.records })) return this.$toast('审批通过')
    },
    // 驳回弹框   点击确认
    async _ok () {
      if (!this.reason) return this.$toast('请填写驳回内容')
      if ((await this._postDeviateBack())) this._refresh()
    },
    // 偏离申请驳回
    async _postDeviateBack () {
      if (
        await postDeviateBack({
          ids: this.$refs.Main.records,
          remark: this.reason
        })) return this.$toast('驳回成功')
    },
    // 点击底部   提交
    async _submit () {
      if (!this.$refs.Main.records) return this.$toast('至少选择一个')
      if (!await this.$confirms('确认提交')) return
      if (await this._postDeviatePass()) this._refresh()
    },
    // 点击底部   驳回弹窗
    _reject () {
      if (!this.$refs.Main.records) return this.$toast('至少选择一个')
      this.$refs.modal.value = ''
      this.reason = ''
      this.show = true
    },
    // 刷新列表并且关闭弹框
    _refresh () {
      this.show = false
      this.$refs.Main._onRefresh()
    }
  }
}
</script>
