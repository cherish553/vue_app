<template>
    <div class="file-down" :style="height">
      <img src="@img/file-down.png" alt>
      <div>
      <p class="file-title">{{form.fileName}}</p>
      <p class="file-time">{{form.ctime|getTime(true)}}</p>
      </div>
      <div @click="_view" class="file-view">查看附件</div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      form: this.$route.query,
      height: `height:${window.screen.availHeight / 2}px`,
      data: {},
      contractId: this.$route.query.id
    }
  },
  methods: {
    // 预览报告
    _view () {
      // eslint-disable-next-line no-undef
      const dtask = plus.downloader.createDownload(
      // 根据id报告文件  /v1/contract_report/download/one/{reportId}
        `${process.env.VUE_APP_BaseUrl}/wjl/v1/contract_attachment/download/${this.form.id}`, {}, (data, status) => {
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
