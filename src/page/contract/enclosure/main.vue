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
    <div class="none">
      <el-checkbox-group v-model="records">
        <div class="myInfo"  v-for="item in recordsList" :key="item.id">
          <div class="pl20 bb1 pt10 pb10 flex">
            <el-checkbox :label="item.id">{{item.fileName}}</el-checkbox>
             <div @click="_view(item)" class="fileName">{{item.fileName}}</div>
          </div>
        </div>
      </el-checkbox-group>
      </div>
    </van-list>
  </van-pull-refresh>
  <van-image-preview
  v-model="show"
  :images="images"
>
</van-image-preview>
  </div>
</template>
<script>
import { contract } from '@api'
const { postAttachmentList } = contract
export default {
  name: 'Main',
  data () {
    return {
      images: [],
      show: false,
      pagination: {
        page: 0,
        rows: 6,
        contractId: this.$route.query.id
      },
      records: [],
      recordsList: [],
      refresh: false, // 上拉刷新
      loading: false, // 下拉加载
      finished: false // 是否获取到了所有数据
    }
  },
  methods: {
    // 预览
    _view (item) {
      if (item.type === 'png' || item.type === 'jpg') return this._postAttachmentPreview(item.objectKey)
      this.$jump('FileView', { id: item.id, fileName: item.fileName, ctime: item.ctime })
    },
    // 预览附件
    async _postAttachmentPreview (e) {
      this.images[0] = `${process.env.VUE_APP_BaseUrl}/wjl/v1/contract_attachment/view?objectKey=${e}`
      this.show = true
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
      await this._postAttachmentList()
      this.loading = false
      return true
    },
    // 全选
    _allCheck () {
      if (this.records.length === this.recordsList.length) return (this.records = [])
      this.records = this.recordsList.map(item => item.id)
    },
    // 附件 分页列表
    async _postAttachmentList () {
      const { records, pages, current } = await postAttachmentList(
        this.pagination
      )
      this.recordsList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
      return true
    }
  }
}
</script>
