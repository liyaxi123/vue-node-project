<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>
<script>
import vGoodslist from '@/views/goodsList.vue';
export default {
  name: 'App',
  components: {
    vGoodslist
  },
 
}
</script>

