<template>
  <div class="pb50">
    <Top @_allCheck="$refs.Main._allCheck()"/>
    <Main :ref="Main"/>
    <cherish-bottom :option="option" @_submit="_submit" @_reject="_reject"/>
    <!-- 提交弹窗 -->
    <cherish-modal
     :modal='false'
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
    <!-- 驳回弹窗 -->
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
import Top from './top'
import { contract } from '@api'
const { postMainCheckBack, postDictList, postMainCheckSubmit } = contract
export default {
  data () {
    return {
      pagination: {
        page: 0,
        rows: 6
      },
      finished: false,
      loading: false,
      Main: 'Main',
      show: false,
      show1: false,
      visible: false,
      reason: '',
      reason1: '',
      dictList: [], // 服务器的等级
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
        }
      ]
    }
  },
  components: {
    Main,
    Top
  },
  created () {
    this._onLoad()
  },
  methods: {
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
    // 委托主审通过
    async _postMainCheckSubmit () {
      if (await postMainCheckSubmit({ ids: this.$refs.Main.records, serveGrade: this.$refs.modal1.value })) return this.$toast('主审通过')
    },
    // 获取服务器等级
    async _postDictList () {
      const { records, pages, current } = await postDictList(
        this.pagination
      )
      this.dictList.push(...records)
      if (pages === current || !pages || !records.length) this.finished = true
    },
    // 点击底部   提交弹框 输入框聚焦
    _focus () {
      this.visible = true
    },
    // 点击底部   提交添加服务等级弹框
    async _oks () {
      if (!this.$refs.modal1.value) return this.$toast('请选择服务等级')
      if (!await this._postMainCheckSubmit()) return
      this.show1 = false
      this.$refs.Main._onRefresh()
    },
    // 点击底部   提交
    async _submit () {
      if (!this.$refs.Main.records.length) return this.$toast('至少选择一个')
      this.$refs.modal1.value = ''
      this.reason1 = ''
      this.show1 = true
    },
    // 点击底部   驳回弹窗
    _reject () {
      if (!this.$refs.Main.records.length) return this.$toast('至少选择一个')
      this.$refs.modal.value = ''
      this.reason = ''
      this.show = true
    },
    // 驳回弹框   点击确认
    async _ok () {
      if (!this.reason) return this.$toast('请输入内容')
      if (await this._postMainCheckBack()) this._refresh()
    },
    // 委托主审驳回
    async _postMainCheckBack () {
      if (
        await postMainCheckBack({
          ids: this.$refs.Main.records,
          reason: this.reason
        })
      ) return this.$toast('驳回成功')
    },
    // 刷新列表并且关闭弹框
    _refresh () {
      this.show = false
      this.$refs.Main._onRefresh()
    }
  }
}
</script>
