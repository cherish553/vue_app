 <template>
  <div>
    <div class="item-detail">
      <div class="myInfo-title">委托编号: {{recordsList.code}}</div>
      <div class="myInfo-title">委托状态: {{recordsList.progress}}</div>
      <div class="myInfo-title">委托类别: {{recordsList.testType}}</div>
      <div class="myInfo-title">所属品类: {{recordsList.category}}</div>
      <div class="myInfo-title">服务等级: {{recordsList.serveGrade}}</div>
      <div class="myInfo-title">送检次数: {{recordsList.testNum}}</div>
      <div class="myInfo-title">委托人: {{recordsList.client}}</div>
      <div class="myInfo-title">委托职能: {{recordsList.contractFunction}}</div>
      <div class="myInfo-title">委托日期: {{recordsList.entrustDate|getTime(true)}}</div>
      <div class="myInfo-title">要求完成日期: {{recordsList.dueDate|getTime(true)}}</div>
      <div class="myInfo-title">试验目的: {{recordsList.testPurpose}}</div>
      <div class="myInfo-title">检测费用: {{recordsList.testCosts}}</div>
      <div class="myInfo-title">费用承担单位: {{recordsList.costsUndertaker}}</div>
      <div class="myInfo-title">检测科室: {{recordsList.groupName}}</div>
    </div>
    <cherish-bottom
      :option="option"
      @_submit="$jump('report_detail', { id,code:recordsList.code })"
      @_reject="_reject"
      @_sample=" $jump('noneconformance_inconformity_item', { id })"
    />
    <cherish-modal ref="modal" :show.sync="show" @_ok="_ok" :reason.sync="reason"/>
  </div>
</template>
<script>
import { contract } from '@api'
const { getContract, postSchemeReviewPass, postSchemeReviewBack } = contract
export default {
  data () {
    return {
      show: false,
      reason: '',
      id: this.$route.query.id,
      recordsList: {},
      option: [
        {
          name: '报告',
          color: '#e7340c',
          methods: '_submit'
        },
        {
          name: '项目',
          color: '#ffa721',
          methods: '_reject'
        },
        {
          name: '附件',
          color: '#009944',
          methods: '_sample'
        }
      ]
    }
  },
  created () {
    this._getContract()
  },
  methods: {
    // 处理方案评审-驳回
    async _postSchemeReviewBack () {
      if (
        await postSchemeReviewBack({
          ids: [this.id],
          remark: this.reason
        })) return this.$toast('驳回成功')
    },
    // 驳回弹框   点击确认
    async _ok () {
      if (!this.reason) return this.$toast('请填写驳回内容')
      if ((await this._postSchemeReviewBack())) this._refresh()
    },
    // 处理方案评审-通过
    async _postSchemeReviewPass () {
      if (await postSchemeReviewPass({ ids: [this.id] })) { return this.$toast('审批通过') }
    },
    // 点击底部   提交
    async _submit () {
      this.$jump('report_detail')
    },
    // 点击底部   驳回弹窗
    _reject () {
      console.log(111)
      this.$jump('contract_common_sample_detail', { id: this.recordsList.id, test: true })
    },
    // 处理方案 查询 id 信息
    async _getContract () {
      this.recordsList = (await getContract(this.id))[0]
    },
    // 弹框回调
    _refresh () {
      this.show = false
      this.reason = ''
    }
  }
}
</script>
