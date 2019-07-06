<template>
  <div>
    <cherish-common-top/>
    <!-- <div class="myInfo" @click="$path('contract_meeting_check')">
      <div class="myInfo-title">研发委托会审</div>
    </div>
    <div class="myInfo" @click="$path('contract_main_check')">
      <div class="myInfo-title">研发委托主审</div>
    </div>
    <div class="myInfo" @click="$path('contract_approve')">
      <div class="myInfo-title">研发委托批准</div>
    </div>
    <div class="myInfo" @click="$path('supply_department_audit')">
      <div class="myInfo-title">新零部件供应部审核</div>
    </div>
    <div class="myInfo" @click="$path('quality_audit')">
      <div class="myInfo-title">新零部件质量审核</div>
    </div>
    <div class="myInfo" @click="$path('spec_change_check')">
      <div class="myInfo-title">型号变更审核</div>
    </div>
    <div class="myInfo" @click="$path('spec_change_recheck')">
      <div class="myInfo-title">型号变更复核</div>
    </div>
    <div class="myInfo" @click="$path('skewing_apply')">
      <div class="myInfo-title">偏离审核</div>
    </div>
    <div class="myInfo" @click="$path('sampling_plan_approval')">
      <div class="myInfo-title">抽检计划审批</div>
    </div>
    <div class="myInfo" @click="$path('subpackage_approval')">
      <div class="myInfo-title">分包审批</div>
    </div>
    <div class="myInfo" @click="$path('noneconformance_deal_review')">
      <div class="myInfo-title">处理方案评审</div>
    </div>
     <div class="myInfo" @click="$path('report_check')">
      <div class="myInfo-title">报告审核</div>
    </div>
     <div class="myInfo" @click="$path('report_sign')">
      <div class="myInfo-title">报告会签</div>
    </div>
     <div class="myInfo" @click="$path('report_issue')">
      <div class="myInfo-title">报告签发</div>
    </div>
     <div class="myInfo" @click="$path('quality-main-check')">
      <div class="myInfo-title">质量委托主审</div>
    </div>
     <div class="myInfo" @click="$path('quality-meeting-check')">
      <div class="myInfo-title">质量委托会审</div>
    </div>
     <div class="myInfo" @click="$path('quality-approve')">
      <div class="myInfo-title">质量委托批准</div>
    </div>-->
    <van-pull-refresh v-model="refresh" @refresh="_onRefresh">
      <van-list
        :offset="20"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="_onLoad"
      >
        <div class="myInfo" v-for="item in recordsList" @click="$jumpPage(item.uri)" :key="item.id">
          <div :class="[item.read===2?'colorRed':'','myInfo-title']">{{item.title}}</div>
          <div class="myInfo-inner">
            <p :class="[item.read===2?'colorRed':'','myInfo-Number']">委托编号{{item.content}}</p>
            <p class="myInfo-time">{{item.ctime|getTime}}</p>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { system } from '@api'
const { postMessage } = system
export default {
  data () {
    return {
      recordsList: [],
      pagination: {
        page: 0,
        rows: 6
      },
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
      await this._postMessage()
      this.loading = false
      return true
    },
    // 数据审核历史
    async _postMessage () {
      const { records, pages, current } = await postMessage(this.pagination)
      this.recordsList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
      else this.finished = false
      return true
    }
  }
}
</script>
