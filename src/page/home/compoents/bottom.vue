<template>
  <div>
    <van-tabbar route active-color="#e7340c" inactive-color="#000"  v-model="active">
      <van-tabbar-item replace :to="{name:'Home-Home',replace:true}" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace :to="{name:'Home-UserInfo',replace:true}" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
    <!-- <tabbar style="position: fixed">
      <tabbar-item :link="{name:'index-Home',replace:true}" selected>
        <img slot="icon" src="@/../static/image/nav/home.png">
        <img slot="icon-active" src="@/../static/image/nav/homeSelect.png">
        <span slot="label" class="da">首页</span>
      </tabbar-item>
      <tabbar-item :link="{name:'index-UserInfo',replace:true}">
        <img slot="icon" src="@/../static/image/nav/mine.png">
        <img slot="icon-active" src="@/../static/image/nav/mineSelect.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>-->
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>
