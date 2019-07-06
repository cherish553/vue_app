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
          <div class="myInfo-title">{{item.name}}</div>
          <div class="myInfo-inner">
            <div>标准号: {{item.code}}</div>
            <div>标准名称: {{item.standardName}}</div>
            <div>试验类别: {{item.category}}</div>
            <div v-if="$route.query.test">检测结果: {{item.testValue}}</div>
          </div>
        </div>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { contract } from '@api'
const { postItemPageVo } = contract
export default {
  name: 'Main',
  data () {
    return {
      pagination: {
        page: 0,
        rows: 6,
        contractSampleId: this.$route.query.id
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
      await this._postItemPageVo()
      this.loading = false
      return true
    },
    // 检测项目分页列表
    async _postItemPageVo () {
      const { records, pages, current } = await postItemPageVo(
        this.pagination
      )
      this.recordsList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
      return true
    }
  }
}
</script>
