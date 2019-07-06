<template>
  <div class="pb50">
    <Main :ref="Main"/>
    <cherish-bottom :option='option' @_enclosure="$jump('Enclosure', { id })" @_submit="_submit" @_reject="_reject" @_sample=" $jump('contract_common_sample_detail', { id })"/>
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
import { contract } from '@api'
const { postApprovekBack, postApprovePass } = contract
export default {
  data () {
    return {
      id: this.$route.query.id,
      Main: 'Main',
      show: false,
      reason: '',
      option: [
        {
          name: '提交', color: '#e7340c', methods: '_submit'
        },
        {
          name: '驳回', color: '#ffa721', methods: '_reject'
        },
        {
          name: '样品', color: '#009944', methods: '_sample'
        },
        {
          name: '附件', color: '#00B7EE', methods: '_enclosure'
        }
      ]
    }
  },
  components: {
    Main
  },
  methods: {
    // 点击底部   提交
    async _submit () {
      if (!await this.$confirms('确认提交')) return
      if (await this._postApprovePass()) this.$back()
    },
    // 点击底部   驳回弹窗
    _reject () {
      this.$refs.modal.value = ''
      this.reason = ''
      this._refresh()
      this.show = true
    },
    // 驳回弹框   点击确认
    async _ok () {
      if (!this.reason) return this.$toast('请输入内容')
      if ((await this._postApprovekBack())) this.$back()
    },
    // 委托批准通过
    async _postApprovePass () {
      if (await postApprovePass({ ids: [this.id] })) return this.$toast('批准通过')
    },
    // 委托会审驳回
    async _postApprovekBack () {
      if (await postApprovekBack({
        ids: [this.id],
        reason: this.reason
      })) return this.$toast('驳回成功')
    },
    // 刷新列表并且关闭弹框
    _refresh () {
      this.show = false
    }
  }
}
</script>
