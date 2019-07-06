<template>
  <div class="login-input flex" :class='className' :style="{marginTop:`${mt}px`}">
    <img class="icon-cherish" :style="{width:`${imgWidth}px`}" :src="icons()">
    <van-cell-group>
      <van-field
        @keyup.enter="$emit('_blur')"
        :value="value"
        @blur="$emit('_blur')"
        @focus="$emit('_focus')"
        :placeholder="placeholder"
        :type="type"
        @input="_input"
      />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgWidth: 18
    }
  },
  props: {
    className: String,
    icon: String,
    mt: {
      type: String,
      default: '20'
    },
    placeholder: String,
    value: String,
    type: String
  },
  methods: {
    _input (data) {
      this.$emit(`update:data`, data)
    },
    icons () {
      switch (this.icon) {
        case 'phone':
          return require('@img/phone.png')
        case 'psd':
          return require('@img/psd.png')
        case 'code':
          return require('@img/code.png')
        case 'search':
          this.imgWidth = 23
          return require('@img/search.png')
      }
      // switch()
    }
  }
}
</script>
