<template>
  <div>
    <div class="topBlue">
      <img @click="$back" class="back" src="@img/backWhite.png" alt>
      <span class="title">{{title}}</span>
    </div>
    <div class="position"></div>
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  watch: {
    $route: {
      handler (val, oldVal) {
        if (val.query.code) {
          this.title = val.query.code
          return
        }
        this.title = val.meta.title
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
