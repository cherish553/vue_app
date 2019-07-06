 <template>
  <div>
    <!-- <div class="ml10 mr10">
          <cherish-input bgc='#E5E5E5' src="@/../static/image/search.png" placeholder="请输入关键字"></cherish-input>
    </div>-->
    <!-- <div class="myInfo" @click="$path('noneconformance_deal_review')">
      <div class="myInfo-title">处理方案评审</div>
    </div>-->
    <!-- <Checkbox-group  v-model="records"> -->
    <!-- <div class="myInfo"> -->
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
      @_appeal="$jump('report_sign_appeal', { ids: id })"
      @_report="$jump('report_detail', { id,code:recordsList.code })"
      @_item="$jump('contract_common_sample_detail', { id: recordsList.id, test: true })"
      @_submit="_submit"
    />
    <!-- </div> -->
  </div>
  <!-- </Checkbox-group> -->
</template>
<script>
import { contract } from '@api'
const { getContract, postReportMeetingPass } = contract
export default {
  data () {
    return {
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
          name: '提交',
          color: '#009944',
          methods: '_submit'
        },
        {
          name: '申诉',
          color: '#00B7EE',
          methods: '_appeal'
        }
      ]
    }
  },
  created () {
    this._getContract()
  },
  methods: {
    //  报告会签通过提交
    async _postReportMeetingPass () {
      if (await postReportMeetingPass({ ids: [this.id] })) return this.$toast('审批通过')
    },
    // 提交
    async _submit () {
      if (!await this.$confirms('确认提交')) return
      if (await this._postReportMeetingPass()) this._refresh()
    },
    // 处理方案 查询 id 信息
    async _getContract () {
      this.recordsList = (await getContract(this.id))[0]
    }
  }
}
</script>
