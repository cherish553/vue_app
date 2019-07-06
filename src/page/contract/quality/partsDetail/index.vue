<template>
  <div class="pb50">
    <!-- 提交 -->
    <cherish-modal
      :modal="false"
      :readonly="true"
      type="text"
      placeholder="请选择服务等级"
      title="添加服务等级"
      ref="modal1"
      :show.sync="show1"
      @_ok="_oks"
      @_focus="_focus"
      :reason.sync="reason1"
    />
    <Main :ref="Main"/>
    <cherish-bottom
      :option="option"
      @_enclosure="$jump('Enclosure', { id })"
      @_submit="_submit"
      @_reject="_reject"
      @_sample=" $jump('contract_common_sample_detail', { id })"
    />
    <cherish-modal ref="modal" :show.sync="show" @_ok="_ok" :reason.sync="reason"/>
     <!-- 选择服务等级 -->
    <cherish-bottom-dialog :visible.sync="visible">
      <div slot="inner">
        <van-list
          :offset="20"
          v-model="loading"
          :finished="finished"
          @load="_onLoad"
        >
          <div
            @click="_addGrade(item.name)"
            class="bottom-inner pl10"
            v-for="item in dictList"
            :key="item.id"
          >{{item.name}}</div>
        </van-list>
      </div>
    </cherish-bottom-dialog>
  </div>
</template>
<script>
import Main from './main'
import { contract } from '@api'
const { postQualityback, postDictList, postQualityPass } = contract
export default {
  data () {
    return {
      dictList: [],
      visible: false,
      reason1: '',
      show1: false,
      loading: false,
      finished: false,
      pagination: {
        page: 0,
        rows: 6
      },
      id: this.$route.query.id,
      Main: 'Main',
      show: false,
      reason: '',
      option: [
        {
          name: '提交',
          color: '#e7340c',
          methods: '_submit'
        },
        {
          name: '驳回',
          color: '#ffa721',
          methods: '_reject'
        },
        {
          name: '样品',
          color: '#009944',
          methods: '_sample'
        },
        {
          name: '附件',
          color: '#00B7EE',
          methods: '_enclosure'
        }
      ]
    }
  },
  components: {
    Main
  },
  created () {
    this._onLoad()
  },
  methods: {
    // 质量部审核通过
    async _postQualityPass () {
      if (await postQualityPass({ ids: [this.id], serveGrade: this.$refs.modal1.value })) return this.$toast('主审通过')
    },
    // 点击底部   提交添加服务等级弹框
    async _oks () {
      if (!this.$refs.modal1.value) return this.$toast('请选择服务等级')
      if (await this._postQualityPass()) this.$back()
    },
    // 点击底部   提交弹框 输入框聚焦
    _focus () {
      this.visible = true
    },
    // 获取服务器等级
    async _postDictList () {
      const { records, pages, current } = await postDictList(
        this.pagination
      )
      this.dictList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
    },
    // 选中服务等级
    _addGrade (e) {
      this.$refs.modal1.value = e
      this.visible = false
    },
    // 下拉加载
    async _onLoad () {
      this.pagination.page++
      await this._postDictList()
      this.loading = false
    },
    // 点击底部   提交
    async _submit () {
      this.$refs.modal1.value = ''
      this.reason1 = ''
      this.show1 = true
    },
    // 点击底部   驳回弹窗
    _reject () {
      this.$refs.modal.value = ''
      this.reason = ''
      this._refresh()
      this.show = true
    },
    // 驳回弹框   点击确认
    async _ok () {
      if (!this.reason) return this.$toast('请填写驳回内容')
      if (await this._postQualityback()) this.$back()
    },
    // 质量部审核驳回
    async _postQualityback () {
      if (
        await postQualityback({
          ids: [this.id],
          reason: this.reason
        })
      ) return this.$toast('驳回成功')
    },
    // 刷新列表并且关闭弹框
    _refresh () {
      this.show = false
    }
  }
}
</script>
