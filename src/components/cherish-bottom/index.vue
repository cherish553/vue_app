<template>
<div  class="h50">
  <div class="cherish-bottom">
    <div v-for='item in option' :key='item.color'  :style="{background:item.color}" @click="$emit(item.methods)">{{item.name}}</div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'cherishBottom',
  props: {
    option: {
      type: Array,
      required: true
    }
  }
}
</script>
