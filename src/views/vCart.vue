<template>
<div>
  <v-header></v-header>
  <v-bread><span>购物车</span></v-bread>
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <symbol id="icon-add" viewBox="0 0 32 32">
      <title>add2</title>
      <path class="path1"
            d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
    </symbol>
    <symbol id="icon-ok" viewBox="0 0 32 32">
      <title>ok</title>
      <path class="path1"
            d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z"></path>
    </symbol>
    <symbol id="icon-edit" viewBox="0 0 32 32">
      <title>edit</title>
      <path class="path1"
            d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"></path>
    </symbol>
    <symbol id="icon-del" viewBox="0 0 32 32">
      <title>delete</title>
      <path class="path1"
            d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
      <path class="path2"
            d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
      <path class="path3"
            d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
      <path class="path4"
            d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
    </symbol>
    <symbol id="icon-clock" viewBox="0 0 32 32">
      <title>clock</title>
      <path class="path1" fill="#605f5f"
            d="M16 29c-7.168 0-13-5.831-13-13s5.832-13 13-13c7.168 0 13 5.832 13 13s-5.832 13-13 13zM16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16z"></path>
      <path class="path2" fill="#605f5f"
            d="M23.958 21.837l-6.958-6.489v-6.282c0-0.827-0.673-1.5-1.5-1.5s-1.5 0.673-1.5 1.5v6.934c0 0.414 0.174 0.814 0.477 1.098l7.435 6.934c0.279 0.259 0.642 0.402 1.023 0.402 0.415 0 0.814-0.174 1.096-0.477 0.564-0.605 0.532-1.555-0.073-2.12z"></path>
    </symbol>
  </defs>
</svg>
<div class="container">
  <div class="cart">
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>我的购物车</span></h2>
    </div>
    <div class="item-list-wrap">
      <div class="cart-item">
        <div class="cart-item-head">
          <ul>
            <li>商品</li>
            <li>价格</li>
            <li>数量</li>
            <li>总计</li>
            <li>编辑</li>
          </ul>
        </div>
        <ul class="cart-item-list">
          <li  v-for="(item,index) in items">
            <div class="cart-tab-1">
              <div class="cart-item-check">
                <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'check':item.checked==1?true:false}" @click="editor('select',item,item.checked)">
                  <svg class="icon icon-ok">
                    <use xlink:href="#icon-ok"></use>
                  </svg>
                </a>
              </div>
              <div class="cart-item-pic">
                <img :src="'static/'+item.productImage">
              </div>
              <div class="cart-item-title">
                <div class="item-name">{{item.productName}}</div>
              </div>
            </div>
            <div class="cart-tab-2">
              <div class="item-price">{{item.salePrice}}</div>
            </div>
            <div class="cart-tab-3">
              <div class="item-quantity">
                <div class="select-self select-self-open">
                  <div class="select-self-area">
                    <a class="input-sub" @click="editor('reduce',item)">-</a>
                    <span class="select-ipt" >{{item.productNum}}</span>
                    <a class="input-add" @click="editor('add',item)">+</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-tab-4">
              <div class="item-price-total">{{item.productNum*item.salePrice}}</div>
            </div>
            <div class="cart-tab-5">
              <div class="cart-item-opration">
                <a href="javascript:;" class="item-edit-btn" @click="del(item)">
                  <svg class="icon icon-del">
                    <use xlink:href="#icon-del"></use>
                  </svg>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-foot-wrap">
      <div class="cart-foot-inner">
        <div class="cart-foot-l">
          <div class="item-all-check">
            <a href="javascipt:;" @click='cartSeletAll()'>
                  <span class="checkbox-btn item-check-btn" v-bind:class="{'check':checkall}">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
              <span>选择所有</span>
            </a>
          </div>
        </div>
        <div class="cart-foot-r">
          <div class="item-total">
            总计 <span class="total-price">{{totalPrice | currency('$')}}</span>
          </div>
          <div class="btn-wrap">
            <a class="btn btn--red" :class="{'btn--dis':cartCheckedCount===0}" @click="submit()">提交</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<v-model @close="cartModel" v-show="cartModelFlag">
  <p slot="contentModel" class="shopfail succeful_shop_title">你确定要删除该商品？</p>
    <template slot="buttonModel">
      <button class="modelButton  btn_shop_succeful" @click="delCart()">删除</button>
      <button class="modelButton  btn_shop_succeful" @click="closeDel()">关闭</button>
    </template>
</v-model>
<v-footer></v-footer>
</div>
</template>
<script>
import vHeader from '../components/vHeader';
import vBread from '../components/vBread';
import vFooter from '../components/vFooter';
import vModel from '../components/vModel'
import '@/assets/css/base.css';
import '@/assets/css/checkout.css';
import '@/assets/css/login.css';
import '@/assets/css/product.css';
import axios from 'axios';
import {currency} from './../util/currency.js';
export default{
  data(){
    return{
      items:[],
      cartModelFlag: false,  //控制模态框
      productId:0,
    }
  },
  filters:{
    currency: currency
  },
  computed:{
    checkall:{   //购物车与checked数量一致时，全选为true
      get(){
         return this.cartCheckedCount===this.items.length; 
      }
    },
    cartCheckedCount(){ //已选商品个数
      let i=0;
      this.items.forEach((item)=>{
        if(item.checked===1){
          i++
        }
      })
      return i;
    },
    totalPrice(){ //总价的计算属性。
      var total=0;
      this.items.forEach((item)=>{
        if(item.checked===1){
          total+=item.salePrice*item.productNum
        }
      });
      return total
    }
  },
  methods:{
    submit(){
      if(this.cartCheckedCount===0){
        return;
      }else{
        this.$router.push({path:'/addressList'});
      }     
    },
    //全选
    cartSeletAll(){
       var flag=!this.checkall;
      this.items.forEach((item)=>{
        item.checked=flag===true?1:0;
      })
      axios.post('/users/checkedall',{
        checkedAll: flag
      }).then((res)=>{
        if(res.data.status==='0'){
          console.log('全选check已经更新')
        }else{
          console.log('出错了')
        }
      })
    },
    editor(ags,item,check){
      if(ags==='reduce'){
        if(item.productNum<=1){
          return;
        }
        item.productNum-=1;  //item不存在于data数据中为什么还可以自动更新呢？!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         this.cartNum(item.productId,item.productNum);
         this.$store.commit('updataCount',-1)
      }else if(ags ==='add'){
        item.productNum+=1;
        this.cartNum(item.productId,item.productNum);
        this.$store.commit('updataCount',1)
      }else if(ags==='select'){
        //数据库中checked为1 是选中，为0是未选中,改变数据库中的状态
          if(check===1){
            item.checked =0;
            this.cartNum(item.productId,item.productNum,item.checked);
            this.$store.commit('updataCount',-item.productNum);
          }else{
            item.checked =1;
            this.cartNum(item.productId,item.productNum,item.checked);
                this.$store.commit('updataCount',item.productNum);
          }
      }
    },
    //点击删除按钮后，模态框的删除按钮事件,需要后端配合删除数据
    delCart(){
        axios.post('/users/cartdel',{
       productId:this.productId.productId
     }).then((res)=>{
       if(res.data.status==='0'){
         this.cartModelFlag=false;
         this.getCartList();
            this.$store.commit('updataCount',-this.productId.productNum)
       }
     })
    },
    //改变数量后触发的ajax,后端需要同步改变数量
    cartNum(productId,productNum,checked){
      axios.post('/users/carteditor',{
        productId:productId,
        productNum:productNum,
        checked:checked
      }).then((res)=>{
        if(res.data.status==='0'){
          console.log('后端数量已经更改');
        }else{
          console.log('错误！')
        }
      })
    },
    //模态框的取消事件
    closeDel(){
 this.cartModelFlag=false;
    },
    cartModel(){
      this.cartModelFlag=false;
    },
   
    del(index){
      //1：data中的数据才会自动更新，所以所有数据要和data产生关联。
      //2:下面是改变数组的正确方式
      // this.flag.splice(index,1,false); 
      // this.totalprice-=this.items[index].itemTotal;
      //删除功能需要后端配合前端传递商品id
     this.productId=index;
     this.cartModelFlag =true;
    },
    getCartList(){
        axios.get('/goods/List').then((res)=>{
      let data = res.data;
      if(data.status==='0'){
        this.items = data.result;
      }else{
        alert(data.msg)
      }
    })
    },
  },
  mounted(){
    this.getCartList();
  },
components: {
    vHeader,
    vFooter,
    vBread,
    vModel
 },
}
</script>
 <style scoped>
    .input-sub,.input-add{ min-width: 40px; height: 100%; border: 0; color: #605F5F;  text-align: center; font-size: 16px; overflow: hidden; display: inline-block; background: #f0f0f0;}
    .item-quantity .select-self-area{ background:none; border: 1px solid #f0f0f0;}
    .item-quantity .select-self-area .select-ipt{ display: inline-block; padding:0 3px; width: 30px; min-width: 30px; text-align: center; }
    .btn_shop_succeful {margin-top: 100px;margin-left: 10px;}
    .succeful_shop_title { margin-top: 70px; font-size: 20px;}
    .modelButton { margin-top: 50px; padding:10px 30px; background:red; color: white;}
  </style>

