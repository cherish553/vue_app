<template>
  <van-pull-refresh v-model="refresh" @refresh="_onRefresh">
    <van-list
      :offset="20"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="_onLoad"
    >
      <el-radio-group v-model="records" fill='#ffffff' text-color="red">
        <div class="myInfo" v-for="item in recordsList" :key="item.id">
          <div class="pl20 bb1 pt10 pb10">
             <el-radio :label="item.id">{{item.newsSpec}}</el-radio>
          </div>
          <div
            class="myInfo-inner"
          >
            <div>原样机型号: {{item.oldSpec}}</div>
            <div>申请人: {{item.specChange}}</div>
            <div>申请时间: {{item.specChangeDate|getTime(true)}}</div>
            <div>复核人: {{item.specCheck}}</div>
            <div>复核时间: {{item.specCheckDate|getTime(true)}}</div>
            <div>申请原因: {{item.specChangeRemark}}</div>
          </div>
        </div>
        </el-radio-group>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { contract } from '@api'
const { postExamineList } = contract
export default {
  name: 'Main',
  data () {
    return {
      pagination: {
        page: 0,
        rows: 6
      },
      records: '',
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
      this.records = ''

      await this._onLoad()
      this.refresh = false
    },
    // 下拉加载
    async _onLoad () {
      this.pagination.page++
      await this._postExamineList()
      this.loading = false
      return true
    },
    // 型号变更审核分页列表
    async _postExamineList () {
      const { records, pages, current } = await postExamineList(
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
