<template>
  <div class="top">
    <div class="mine-bg">
      <div>
        <img :src="userInfo.sex===0?require('@img/man.png'):require('@img/woman.png')">
        <div class="mine-word">
            <p>{{userInfo.username}}</p>
            <p>欢迎使用万家乐LIMS管理系统</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default () {
        return {
          sex: 0
        }
      }
    }
  }
}
</script>
