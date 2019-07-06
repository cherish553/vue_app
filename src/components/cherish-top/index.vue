<template>
<div>
  <div class="cherish-top">
    <p
      :class="[indexs===index?'cherish-top-active':'']"
      v-for="(item,index) in name"
      :key="index"
      @click="$emit('update:indexs', index)"
    >{{item}}</p>
  </div>
  <div class="h50"></div>
  </div>
</template>
<script>
export default {
  props: {
    name: Array,
    indexs: {
      type: Number,
      default: 0
    }
  }
}
</script>
