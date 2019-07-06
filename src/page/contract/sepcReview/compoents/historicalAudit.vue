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
        <div class="myInfo" v-for="item in recordsList" :key="item.id">
          <div class="myInfo-title">{{item.newsSpec}}</div>
          <div class="myInfo-inner">
          <div>原样机型号: {{item.oldSpec}}</div>
          <div>申请人: {{item.specChange}}</div>
          <div>申请时间: {{item.specChangeDate|getTime(true)}}</div>
          <div>复核人: {{item.specCheck}}</div>
          <div>复核时间: {{item.specCheckDate|getTime(true)}}</div>
          <div>申请原因: {{item.specChangeRemark}}</div>
          </div>
        </div>
      </van-list>

    </van-pull-refresh>
  </div>
</template>
<script>
import { contract } from '@api'
const { postCheckHistoryList } = contract
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
      await this._postCheckHistoryList()
      this.loading = false
      return true
    },
    // 历史复核分页列表
    async _postCheckHistoryList () {
      const { records, pages, current } = await postCheckHistoryList(this.pagination)
      this.recordsList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
      else this.finished = false
      return true
    }
  }
}
</script>
