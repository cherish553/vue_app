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
            <el-checkbox :label="item.id">{{item.code}}</el-checkbox>
          </div>
          <div
            class="myInfo-inner"
            @click="$jump('contract_meeting_check_detail',{id:item.id})"
          >
            <div>委托类别: {{item.testType}}</div>
            <div>所属品类: {{item.category}}</div>
            <div>样品名称: {{item.sampleName}}</div>
            <div>规格型号: {{item.spec}}</div>
            <div>主审人: {{item.mainChecker}}</div>
            <div>主审日期: {{item.mainCheckDate|getTime(true)}}</div>
            <div>服务等级: {{item.serveGrade}}</div>
          </div>
        </div>
      </el-checkbox-group>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { contract } from '@api'
const { postMeetingCheckList } = contract
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
      await this._postMeetingCheckList()
      this.loading = false
      return true
    },
    // 全选
    _allCheck () {
      if (this.records.length === this.recordsList.length) return (this.records = [])
      this.records = this.recordsList.map(item => item.id)
    },
    // 委托会审分页列表
    async _postMeetingCheckList () {
      const { records, pages, current } = await postMeetingCheckList(
        this.pagination
      )
      this.recordsList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
      return true
    }
  }
}
</script>
