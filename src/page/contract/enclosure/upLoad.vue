<template>
  <div>
    <el-upload
      :headers="{ accessToken: $getStorage('accessToken') }"
      class="upload-demo"
      :action="action"
      multiple
    >
      <el-button size="small" type="primary">请选择附件上传</el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  data () {
    return {
      headers: {},
      action: `${
        process.env.VUE_APP_BaseUrl
      }/wjl/v1/contract_attachment/upload/${this.$route.query.id}`
    }
  }
}
</script>
