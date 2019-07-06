<template>
  <div>
    <Top @_allCheck="$refs.Main._allCheck()"/>
    <Main ref='Main' />
    <cherish-bottom :option='option' @_add="_add" @_delete="_delete"/>
  </div>
</template>
<script>
import { contract } from '@api'
import Main from './main'
import Top from './top'
const { deleteAttachmentFile } = contract
export default {
  components: {
    Main,
    Top
  },
  computed: {
    componentName () {
      return this.component[this.index]
    }
  },
  data () {
    return {
      id: this.$route.query.id,
      index: 0,
      option: [
        {
          name: '添加', color: '#e7340c', methods: '_add'
        },
        {
          name: '删除', color: '#ffa721', methods: '_delete'
        }
      ]
    }
  },
  methods: {
    // 点击底部   上传
    async _add () {
      this.$jump(`UpLoad`, { id: this.id })
    },
    // 点击底部  删除
    async _delete () {
      if (!this.$refs.Main.records.length) return this.$toast('至少选择一个')
      if (!await this.$confirms('确认删除')) return
      if (await this._deleteAttachmentFile()) this.$refs.Main._onRefresh()
    },
    // 根据 ids 删除上传的附件
    async _deleteAttachmentFile () {
      if (await deleteAttachmentFile(this.$refs.Main.records)) return this.$toast('成功删除')
    }
  }
}
</script>
