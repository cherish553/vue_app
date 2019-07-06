<template>
    <div class="file-down" :style="height">
      <img src="@img/file-down.png" alt>
      <div>
      <p class="file-title">{{data.remark}}</p>
      <p class="file-time">{{data.ctime|getTime(true)}}</p>
      </div>
      <div @click="_view" class="file-view">预览报告</div>
    </div>
</template>
<script>
import { contract } from '@api'
const { postReportList } = contract
export default {
  data () {
    return {
      height: `height:${window.screen.availHeight / 2}px`,
      data: {},
      contractId: this.$route.query.id
    }
  },
  created () {
    this._postReportList()
  },
  methods: {
    // 预览报告查询列表
    async _postReportList () {
      this.data = (await postReportList({ contractId: this.contractId }))[0]
    },
    // 预览报告
    _view () {
      // eslint-disable-next-line no-undef
      const dtask = plus.downloader.createDownload(
      // 根据id报告文件  /v1/contract_report/download/one/{reportId}
        `${process.env.VUE_APP_BaseUrl}/wjl/v1/contract_report/download/one/${this.data.id}`, {}, (data, status) => {
          // eslint-disable-next-line no-undef
          if (status === 200) plus.runtime.openFile(data.filename)
        })
      dtask.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      dtask.setRequestHeader('accessToken', this.$getStorage('accessToken'))
      dtask.start()
    }
  }
}
</script>
