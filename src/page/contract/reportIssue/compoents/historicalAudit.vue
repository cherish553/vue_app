<template>
  <div>
     <div :class="[focus?'search-active':'','bgc','pl20','pr20']">
     <cherish-input
      className='bg229'
      @_focus='focus = true'
      @_blur='_blur'
      icon="search"
      mt="10"
      placeholder="请输入编号"
      :data.sync="pagination.code"
    ></cherish-input>
    </div>
    <van-pull-refresh v-show='!focus' v-model="refresh" @refresh="_onRefresh">
      <van-list
        :offset="20"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="_onLoad"
      >
        <div class="myInfo" v-for="item in recordsList" :key="item.id"  @click="$jump('report_check_detail',{id:item.id})">
          <div class="myInfo-title">{{item.code}}</div>
          <div class="myInfo-inner">
            <div>委托类别: {{item.testType}}</div>
            <div>所属品类: {{item.category}}</div>
            <div>服务等级: {{item.serveGrade}}</div>
            <div>送检次数: {{item.testNum}}</div>
            <div>委托人: {{item.client}}</div>
            <div>委托日期: {{item.entrustDate|getTime(true)}}</div>
          </div>
        </div>
      </van-list>

    </van-pull-refresh>
  </div>
</template>
<script>
import { contract } from '@api'
const { postReportIssueHistoryList } = contract
export default {
  data () {
    return {
      focus: false,
      pagination: {
        page: 0,
        rows: 6,
        code: ''
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
      await this._postReportIssueHistoryList()
      this.loading = false
      return true
    },
    // 报告签发历史分页列表
    async _postReportIssueHistoryList () {
      const { records, pages, current } = await postReportIssueHistoryList(this.pagination)
      this.recordsList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
      else this.finished = false
      return true
    }
  }
}
</script>
