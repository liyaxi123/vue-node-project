import Vue from 'vue'
import Router from 'vue-router'
import vGoodsList from '@/views/goodsList.vue';
import vCart from '@/views/vCart.vue';
import { model } from 'mongoose';
import vAddress from './../views/vAddress.vue';
import vOrderConfirm from  './../views/vOrderConfirm.vue';
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
    },
    {
      path:'/addressList',
      name:'addressList',
      component:vAddress
    },
    {
      path:'/orderConfirm/:addressId',
      name:'orderConfirm',
      component:vOrderConfirm
    }
  ]
     
})
