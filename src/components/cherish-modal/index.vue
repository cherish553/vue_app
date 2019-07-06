<template>
  <el-dialog
    :before-close="_close"
    :modal='modal' center :title="title" :visible.sync="show" :show-close="false">
    <el-input
      :readonly='readonly'
      @focus="$emit('_focus')"
      @change="_onChange"
      :type='type'
      :rows="9"
      :placeholder="placeholder"
      v-model="value"
    ></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="$emit('update:show', false)">取 消</el-button>
      <el-button size="mini" type="primary" @click="$emit('_ok')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      value: this.reason
    }
  },
  props: {
    modal: { type: Boolean, default: true },
    readonly: { type: Boolean, default: false },
    type: { type: String, default: 'textarea' },
    show: { type: Boolean },
    placeholder: { type: String, default: '请输入驳回原因' },
    okText: { type: String, default: '确认' },
    cancelText: { type: String, default: '取消' },
    title: { type: String, default: '驳回原因' },
    reason: { type: String }
  },
  methods: {
    _onChange (value) {
      this.$emit('update:reason', value)
    },
    _close () {
      this.$emit('update:show', false)
    }
  }
}
</script>
