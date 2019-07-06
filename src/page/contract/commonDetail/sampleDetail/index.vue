<template>
  <van-pull-refresh v-model="refresh" @refresh="_onRefresh">
    <van-list
      :offset="20"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="_onLoad"
    >
        <div class="myInfo" v-for="item in recordsList" :key="item.id">
          <div class="myInfo-title">{{item.sampleCode}}</div>
          <div
            class="myInfo-inner"
            @click="$route.query.test?$jump('contract_common_item_detail',{id:item.id,test:true}):$jump('contract_common_item_detail',{id:item.id})"
          >
            <div>样品类型: {{item.sampleType}}</div>
            <div>所属品类: {{item.category}}</div>
            <div>样品名称: {{item.name}}</div>
            <div>规格型号: {{item.modelSpec}}</div>
            <div>生产单位: {{item.producer}}</div>
          </div>
        </div>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { contract } from '@api'
const { postContractSample } = contract
export default {
  name: 'Main',
  data () {
    return {
      pagination: {
        page: 0,
        rows: 6,
        contractId: this.$route.query.id
      },
      records: [],
      recordsList: [],
      refresh: false, // 上拉刷新
      loading: false, // 下拉加载
      finished: false // 是否获取到了所有数据
    }
  },
  methods: {
    // 上拉刷新
    async _onRefresh () {
      this.pagination.page = 0
      this.recordsList = []
      this.records = []

      await this._onLoad()
      this.refresh = false
    },
    // 下拉加载
    async _onLoad () {
      this.pagination.page++
      await this._postContractSample()
      this.loading = false
      return true
    },
    // 全选
    _allCheck () {
      if (this.records.length === this.recordsList.length) return (this.records = [])
      this.records = this.recordsList.map(item => item.id)
    },
    // 会审人样品分页列表
    async _postContractSample () {
      const { records, pages, current } = await postContractSample(
        this.pagination
      )
      this.recordsList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
      return true
    }
  }
}
</script>
