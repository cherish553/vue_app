<template>
  <div>
    <van-pull-refresh v-model="refresh" @refresh="_onRefresh">
      <van-list
        :offset="20"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="_onLoad"
      >
        <div class="myInfo" v-for="item in recordsList" :key="item.id"  @click="$jump('noneconformance_deal_review_histroy_detail',{id:item.id})">
          <div class="myInfo-title">{{item.oldCode}}</div>
          <div class="myInfo-inner">
            <div>委托类别: {{item.testType}}</div>
            <div>所属品类: {{item.category}}</div>
            <div>委托人: {{item.client}}</div>
            <div>不符合数量: {{item.noItemNum}}</div>
            <div>评审人: {{item.reviewName}}</div>
            <div>评审时间: {{item.reviewDate|getTime(true)}}</div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { contract } from '@api'
const { postSchemeReviewHistoryList } = contract
export default {
  data () {
    return {
      pagination: {
        page: 0,
        rows: 6
      },
      recordsList: [],
      refresh: false, // 上拉刷新
      loading: false, // 下拉加载
      finished: false // 是否获取到了所有数据
    }
  },
  methods: {
    // 失去焦点
    _blur () {
      this._onRefresh()
      this.focus = false
    },
    // 上拉刷新
    async _onRefresh () {
      this.pagination.page = 0
      this.recordsList = []

      await this._onLoad()
      this.refresh = false
    },
    // 下拉加载
    async _onLoad () {
      this.pagination.page++
      await this._postSchemeReviewHistoryList()
      this.loading = false
      return true
    },
    // 处理方案评审-历史评审分页列表
    async _postSchemeReviewHistoryList () {
      const { records, pages, current } = await postSchemeReviewHistoryList(this.pagination)
      this.recordsList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
      else this.finished = false
      return true
    }
  }
}
</script>
