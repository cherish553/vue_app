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
          <div class="myInfo-inner" @click="$jump('subpackage_approval_detail',{id:item.id})">
            <div>分包原因: {{item.reason}}</div>
            <div>分包商: {{item.subcontractor}}</div>
            <div>分包总价: {{item.totalPrice}}</div>
            <div>分包项目数量: {{item.quantity}}</div>
            <div>状态: {{item.status.display}}</div>
            <div>申请人: {{item.applyName}}</div>
            <div>申请时间: {{item.applyTime|getTime(true)}}</div>
            <div>审批人: {{item.applyName}}</div>
            <div>审批时间: {{item.applyTime|getTime(true)}}</div>
          </div>
        </div>
      </el-checkbox-group>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { contract } from '@api'
const { postSubpackageList } = contract
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
    // 全选
    _allCheck () {
      if (this.records.length === this.recordsList.length) { return (this.records = []) }
      this.records = this.recordsList.map(item => item.id)
    },
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
      await this._postSubpackageList()
      this.loading = false
      return true
    },
    // 分包申请待审批分页列表
    async _postSubpackageList () {
      const { records, pages, current } = await postSubpackageList(
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
