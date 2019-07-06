<template>
  <van-pull-refresh v-model="refresh" @refresh="_onRefresh">
    <van-list
      :offset="20"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="_onLoad"
    >
      <el-checkbox-group v-model="records">
        <div class="myInfo" v-for="item in recordsList" :key="item.id">
          <div class="pl20 bb1 pt10 pb10">
            <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
          </div>
          <div
            class="myInfo-inner"
          >
            <div>产品名称: {{item.productName}}</div>
            <div>规格型号: {{item.modelSpec}}</div>
            <div>抽检间隔: {{item.samplingInterval}}</div>
            <div>抽检时间: {{item.samplingTimeDescribe}}</div>
            <div>计划制定人: {{item.uname}}</div>
            <div>计划创建时间: {{item.ctime|getTime(true)}}</div>
            <div>更新时间: {{item.ltime|getTime(true)}}</div>
          </div>
        </div>
      </el-checkbox-group>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { contract } from '@api'
const { postSpotList } = contract
export default {
  name: 'Main',
  data () {
    return {
      pagination: {
        page: 0,
        rows: 6
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
      await this._postSpotList()
      this.loading = false
      return true
    },
    // 全选
    _allCheck () {
      if (this.records.length === this.recordsList.length) return (this.records = [])
      this.records = this.recordsList.map(item => item.id)
    },
    // 抽检 查询待审列表
    async _postSpotList () {
      const { records, pages, current } = await postSpotList(
        this.pagination
      )
      this.recordsList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
      else this.finished = false
      return true
    }
  }
}
</script>
