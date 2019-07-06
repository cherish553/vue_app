<template>
  <div>
    <div class="myInfo-inner" >
      <div class="item plpr bb1">委托编号: {{data.code}}</div>
      <div class="item plpr bb1">委托状态: {{data.progress}}</div>
      <div class="item plpr bb1">委托类别: {{data.testType}}</div>
      <div class="item plpr bb1">零件来源: {{data.partsSource}}</div>
      <div class="item plpr bb1">样品性质: {{data.sampleNature}}</div>
      <div class="item plpr bb1">检验类别: {{data.checkType}}</div>
      <div class="item plpr bb1">样品名称: {{data.sampleName}}</div>
      <div class="item plpr bb1">规格型号: {{data.spec}}</div>
      <div class="item plpr bb1">生产单位: {{data.producer}}</div>
      <div class="item plpr bb1">样品数量: {{data.sampleQuantity}}</div>
      <div class="item plpr bb1">送检次数: {{data.testNum}}</div>
      <div class="item plpr bb1">委托人: {{data.client}}</div>
      <div class="item plpr bb1">委托职能: {{data.contractFunction}}</div>
      <div class="item plpr bb1">委托日期: {{data.entrustDate|getTime(true)}}</div>
      <div class="item plpr bb1">要求完成日期: {{data.dueDate|getTime(true)}}</div>
      <div class="item plpr bb1">试验目的: {{data.testPurpose}}</div>
      <div class="item plpr bb1">试验标准: {{data.standardType}}</div>
      <div class="item plpr bb1">检测费用: {{data.testCosts}}</div>
      <div class="item plpr bb1">费用承担单位: {{data.costsUndertaker}}</div>
    </div>
  </div>
</template>
<script>
import { contract } from '@api'
const { getContract } = contract
export default {
  name: 'Main',
  data () {
    return {
      id: this.$route.query.id,
      data: {}
    }
  },
  created () {
    this._getContract()
  },
  methods: {
    // 查询详情
    async _getContract () {
      const data = await getContract(this.id)
      this.data = data[0]
    }
  }
}
</script>
