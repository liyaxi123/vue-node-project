<template>
<div>
    <v-header></v-header>
    <v-bread><span>商品</span></v-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="price"  @click="paixu">Price<span :class="{'rows':checked,'inrows':!checked}">↑</span></a>
            <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="setFilerPrice('all')">All</a></dd>
                <dd>
                  <a href="javascript:void(0)" @click="setFilerPrice(0)">0 - 100</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)" @click="setFilerPrice(100)">100 - 500</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)" @click="setFilerPrice(500)">500 - 1000</a>
                </dd>
                <dd>
                  <a href="javascript:void(0)" @click="setFilerPrice(1000)">1000 - 2000</a>
                </dd>
              </dl>
            </div>
            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img v-bind:src="'static/'+item.productImage"></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                 
                </ul>
                 <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >
                  <div v-show="loading" class="loading">  加载中</div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-model v-show="goshopModel" @close="childclose" ref="goshop">
        <p slot="description" class="description">您还未登录，请先登录！</P>
         <template slot="contentModel">
           <p class="shopfail">商品添加失败</p>
         </template>
         <template slot="buttonModel">
           <button class="modelButton" @click="closess">关闭</button>
         </template>
      </v-model>
       <v-model v-show="goshopsucceful" @close="childclose">
         <template slot="contentModel">
           <p class="shopfail succeful_shop_title">商品添加成功</p>
         </template>
         <template slot="buttonModel">
           <button class="modelButton  btn_shop_succeful" @click="goshopsucceful=false">继续购物</button>
           <router-link to="/goodsList"><button class="modelButton  btn_shop_succeful" @click="goshopsucceful=false">查看购物车</button></router-link>
         </template>
      </v-model>
      <v-footer></v-footer>
</div>
</template>
<script>
import '@/assets/css/base.css';
import '@/assets/css/product.css';
import '@/assets/css/login.css';
import vHeader  from '@/components/vHeader.vue';
import vFooter from '@/components/vFooter.vue';
import vBread from '@/components/vBread.vue';
import axios from "axios";
import vModel from '@/components/vModel.vue';
export default {
    data(){
        return {
            "goodsList":[],
            sortFlag:true,  //排序
            page:1, //当前页
            pageSize:8, //每页条数
            busy: true, //默认不能滚动加载
            priceLevel: 'all',
            loading: false,
            checked:true,
            goshopModel:false,  //购物失败提醒框控制
            goshopsucceful: false  //购物成功提示框
        }
    },
components: {
    vHeader,
    vFooter,
    vBread,
    vModel
 },
 methods:{
     //这里进行ajax请求
     getData(flag){
       console.log('this.busy'+this.busy)  //true
       this.loading=true;
       let param ={
         page: this.page,
         pageSize:this.pageSize,
         sort: this.sortFlag?1:-1,
         priceLevel: this.priceLevel
       };
       axios.get('/goods',{
         params:param
       }).then(res=>{
         this.loading=false;
          console.log('this.loading'+this.loading)
          let datas = res.data;
          if(datas.status=='0'){
            if(flag===true){
              this.goodsList = datas.result.list.concat(this.goodsList);
              if(datas.result.list.length<8){
                console.log('datas.result.list.length'+datas.result.list.length)
                this.busy=true;
              }else{
                this.busy=false;
              }
            }else{
              this.goodsList = datas.result.list;
              if(datas.result.list.length>=8){
                    this.busy=false   //false
              }
             
            }
          }else{
            this.goodsList=[];
          }
       })
     },
     paixu(){
       this.sortFlag=!this.sortFlag;
       this.page =1;
       this.getData();
       this.checked=!this.checked;
     },
     addCart:function(msf){
       axios.post('/goods/addCart',{
         productId:msf
       }).then((res)=>{ //这里一定要注意是res.data才代表数据
         console.log(res.data.status)
         if(res.data.status=="0"){
           this.goshopsucceful =true;
         }else{
          if(res.data.status==='2'){
            this.goshopModel=true;
          }  //2 为未登录状态
         }
       })
     },
     loadMore: function() {
      setTimeout(() => {
        this.page++
       this.getData(true)
      }, 500);
    },
    setFilerPrice: function(index){
      this.priceLevel = index;
      this.page = 1;
      this.getData(false);
    },
    childclose(){
      this.goshopModel=false;
      this.goshopsucceful =false;
    },
    closess(){
      this.goshopModel=false;
    }
 },
 mounted(){
   this.getData(false);
 }
}
</script>
<style scoped>
.rows{ display:inline-block;margin-left: 10px; transition: all 0.3s ease-in-out}
.inrows{ display: inline-block; margin-left: 10px;  transform: rotate(180deg);  transition: all .5s ease-out;}
.loading {position: absolute;top:50%; left: 50%}
.description{ color:indianred; font-size: 20px; margin:50px auto ;}
.shopfail { margin-top: 30px; font-size:17px; color:indianred;}
.modelButton { margin-top: 50px; padding:10px 30px; background:red; color: white;}
.btn_shop_succeful {margin-top: 100px;margin-left: 10px;}
.succeful_shop_title { margin-top: 70px; font-size: 20px;}
</style>