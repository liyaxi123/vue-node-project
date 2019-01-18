<template>
<div>
    <v-header></v-header>
    <v-bread></v-bread>
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
        }
    },
components: {
    vHeader,
    vFooter,
    vBread,
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
       }).then(function(res){ //这里一定要注意是res.data才代表数据
         console.log(res.data.status)
         if(res.data.status=="0"){
           alert('添加成功')
         }else{
           alert('添加失败')
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
    }
 },
 mounted(){
   this.getData(false);
 }
}
</script>
<style scoped>
.rows{
  display:inline-block;
  padding-left: 5px;
transition: all 0.3s ease-in-out
}
.inrows{
  display: inline-block;
  padding-left: 5px; 
   transform: rotateX(180deg); 
    transition: all .5s ease-out;
}
.loading {
 position: absolute;
  top:50%; left: 50%
}
</style>