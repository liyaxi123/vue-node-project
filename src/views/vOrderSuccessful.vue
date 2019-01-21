<template>
<div>
    <v-header></v-header>
    <v-bread><span>订单成功页</span></v-bread>
    <div class="container">
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>核实</span></h2>
    </div>
    <!-- 进度条 -->
    <div class="check-step">
      <ul>
        <li class="cur"><span>确认地址</span> address</li>
        <li class="cur"><span>查看</span> 订单</li>
        <li class="cur"><span>支</span> 付</li>
        <li class="cur"><span>订单</span> 完成</li>
      </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="" alt=""></div>
      <div class="order-create-main">
        <h3>恭喜您 <br>商品已经下单了</h3>
        <p>
          <span>订单号：{{orderId}}</span>
          <span>订单总价：{{totalPrice|currency('$')}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <router-link to="/goodsList" class="btn btn--m">购物车</router-link>
          </div>
          <div class="btn-r-wrap">
             <router-link to="/" class="btn btn--m">商品列表</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <v-footer></v-footer>
</div>
</template>
<script>
// import '@/assets/css/base.css';
// import '@/assets/css/product.css';
// import '@/assets/css/login.css';
import vHeader  from '@/components/vHeader.vue';
import vFooter from '@/components/vFooter.vue';
import vBread from '@/components/vBread.vue';
import axios from "axios";
import {currency} from './../util/currency.js';
export default{
    data(){
        return{
            totalPrice:0,
            orderId:'',
        }
    },
    components:{
        vHeader,
        vFooter,
        vBread,
    },
    mounted(){
        var orderId = this.$route.query.orderId;
        axios.get('/users/orderInfo',{
            params:{
                orderId:orderId
            }
        }).then((res)=>{
            if(res.data.status==='0'){
                this.totalPrice=res.data.result;
                this.orderId=orderId;
            }else{
                console.log('抱歉出错了')
            }
        })
    },
    filters:{
        currency:currency
    }
}
</script>
<style>

</style>