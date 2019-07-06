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
          <div class="myInfo-title">{{item.name}}</div>
          <div class="myInfo-inner">
            <div>标准号: {{item.code}}</div>
            <div>标准名称: {{item.standardName}}</div>
            <div>试验类别: {{item.category}}</div>
            <div>检测结果: {{item.testValue}}</div>
            <div>质量缺陷等级: {{item.qualityDefectRegistration}}</div>
            <div>处理办法: {{item.treatmentMethod}}</div>
          </div>
        </div>
      </van-list>

    </van-pull-refresh>
  </div>
</template>
<script>
import { contract } from '@api'
const { postConformityMaskList } = contract
export default {
  data () {
    return {
      pagination: {
        contractId: this.$route.query.id,
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
      await this._postConformityMaskList()
      this.loading = false
      return true
    },
    // 不符合项处理蒙版分页
    async _postConformityMaskList () {
      const { records, pages, current } = await postConformityMaskList(this.pagination)
      this.recordsList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
      else this.finished = false
      return true
    }
  }
}
</script>
