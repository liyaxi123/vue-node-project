import Vue from 'vue'
import Router from 'vue-router'
import vGoodsList from '@/views/goodsList.vue';
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: vGoodsList,
    }
  ]
     
})
