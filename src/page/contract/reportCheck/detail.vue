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
      @_report="$jump('report_detail', { id,code:recordsList.code })"
      @_item="$jump('contract_common_sample_detail', { id:recordsList.id, test: true })"
      @_enclosure=" $jump('Enclosure', { id })"
    />
  </div>
</template>
<script>
import { contract } from '@api'
const { getContract } = contract
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
          methods: '_report'
        },
        {
          name: '项目',
          color: '#ffa721',
          methods: '_item'
        },
        {
          name: '附件',
          color: '#009944',
          methods: '_enclosure'
        }
      ]
    }
  },
  created () {
    this._getContract()
  },
  methods: {
    // 处理方案 查询 id 信息
    async _getContract () {
      this.recordsList = (await getContract(this.id))[0]
    }
  }
}
</script>
