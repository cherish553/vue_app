 <template>
  <div>
      <div class="item-detail">
        <div class='myInfo-title'>不合格委托编号: {{recordsList.code}}</div>
        <div class='myInfo-title'>委托状态: {{recordsList.progress}}</div>
        <div class='myInfo-title'>委托类别: {{recordsList.testType}}</div>
        <div class='myInfo-title'>所属品类: {{recordsList.category}}</div>
        <div class='myInfo-title'>不符合项目数量: {{recordsList.noItemNum}}</div>
        <div class='myInfo-title'>送检次数: {{recordsList.testNum}}</div>
        <div class='myInfo-title'>委托人: {{recordsList.client}}</div>
        <div class='myInfo-title'>委托职能: {{recordsList.contractFunction}}</div>
        <div class='myInfo-title'>委托日期: {{recordsList.entrustDate|getTime(true)}}</div>
        <div class='myInfo-title'>处理人: {{recordsList.registerName}}</div>
        <div class='myInfo-title'>处理时间: {{recordsList.registeDate|getTime(true)}}</div>
        <div class='myInfo-title'>要求完成日期: {{recordsList.dueDate|getTime(true)}}</div>
        <div class='myInfo-title'>试验目的: {{recordsList.testPurpose}}</div>
        <div class='myInfo-title'>检测费用: {{recordsList.testCosts}}</div>
        <div class='myInfo-title'>费用承担单位: {{recordsList.costsUndertaker}}</div>
        <div class='myInfo-title'>检测科室: {{recordsList.groupName}}</div>
      </div>
       <cherish-bottom
      :option="option"
      @_submit=" $jump('noneconformance_inconformity_item', { id })"
    />
  </div>
</template>
<script>
import { contract } from '@api'
const { postHandleDetail } = contract
export default {
  data () {
    return {
      id: this.$route.query.id,
      recordsList: [],
      option: [
        {
          name: '查看不符合项目',
          color: '#e7340c',
          methods: '_submit'
        }
      ]
    }
  },
  created () {
    this._postHandleDetail()
  },
  methods: {
    // 处理方案 查询 id 信息
    async _postHandleDetail () {
      this.recordsList = (await postHandleDetail({ id: this.id }))[0]
    }
  }
}
</script>
