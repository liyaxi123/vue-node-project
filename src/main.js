// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll';
import vuex from 'vuex';
Vue.use(infiniteScroll);
Vue.use(vuex)
Vue.config.productionTip = false
const store = new vuex.Store({
  state:{
    cartCount:0
  },
  mutations:{
    updataCount(state,n){
      state.cartCount=n;
    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
