<template>
<div>
  <div class="login-bg" :style="bgHeight">
    <div style="padding: 100px 40px 0 40px">
      <router-view/>
    </div>
     <div class="bottom">万家乐LIMS V1.0.0.0</div>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      bgHeight: { height: document.documentElement.clientHeight + 'px' }
    }
  }
}
</script>
