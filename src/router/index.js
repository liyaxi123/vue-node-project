import Vue from 'vue'
import Router from 'vue-router'
import vGoodsList from '@/views/goodsList.vue';
import vCart from '@/views/vCart.vue';
import { model } from 'mongoose';
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: vGoodsList,
    },
    {
      path:'/goodsList',
      name:'goodsList',
      component:vCart,
    }
  ]
     
})
