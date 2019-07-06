<template>
 <transition name="fade">
  <div class="mask" v-show="visible" :style="height">
    <transition name="bounce">
      <div v-show="visible" class="mask-bottom"  :style="max">
        <slot name="inner"></slot>
        <p @click="$emit('update:visible', false)" class="bottom-back">返回</p>
      </div>
    </transition>
  </div>
   </transition>
</template>
<script>
export default {
  data () {
    return {
      height: { height: document.documentElement.clientHeight + 'px' },
      max: { 'max-height': document.documentElement.clientHeight + 'px' }
    }
  },
  props: {
    visible: { type: Boolean, default: false },
    data: []
  }
}
</script>
