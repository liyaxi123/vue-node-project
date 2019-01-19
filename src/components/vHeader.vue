<template>
    <header class="header">
        <symbol id="icon-cart" viewBox="0 0 38 32">
          <title>cart</title>
          <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
          <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
          <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
          <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        </symbol>
          <div class="navbar">
          <div class="navbar-left-container">
            <a href="/">
              <img class="navbar-brand-logo" src="static/logo.png"></a>
          </div>
          <div class="navbar-right-container" style="display: flex;">
            <div class="navbar-menu-container">
              <!--<a href="/" class="navbar-link">我的账户</a>-->
              <span class="navbar-link" v-text="username" v-show='!loginflag'></span>
              <a href="javascript:void(0)" class="navbar-link" v-show="loginflag" @click="login_in()">Login</a>
              <a href="javascript:void(0)" class="navbar-link" v-show="!loginflag" @click="login_out()">Logout</a>
              <div class="navbar-cart-container">
                <span class="navbar-cart-count"></span>
                <a class="navbar-link navbar-cart-link" href="/#/cart">
                  <svg class="navbar-cart-logo">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
         <v-model ref='model' @close="childss">
           <template slot="description">
              <span class="back" @click="clickx">x</span>
              <div class="title">登陆页</div>
           </template>
           <template slot="contentModel">
              <div class="tips" v-show="tipsflag">你输入的账号或密码不正确</div>
                <div class="common">
                    <label for="username">用户名</label>
                        <input type="text" id="username" v-model="username">
                </div>
                <div class="common">
                    <label for="pwd">&nbsp;&nbsp;&nbsp;密码</label>
                        <input type="password" id="pwd" v-model='password' @keydown.enter="go_login">
                </div>
           </template>
           <template slot="buttonModel">
             <button class="btn_login" @click="go_login">登&nbsp;&nbsp;陆</button>
           </template>
         </v-model>
    </header>
</template>
<script>
import vModel from '@/components/vModel.vue';
import axios from 'axios';
export default {
data(){
  return {
    loginflag: true, //登录登出按钮的控制
    username:'',
    tipsflag:false,
     username:'',
    password:'',
   }
 },
 components:{
   vModel
 },
  methods:{
   login_in:function(){
     this.$refs.model.modelshowflag=true;
   },
   login_out: function(){
     //login_out要做的事情  后端把cookie删除，前端切换登录登出按钮
     axios.post('/users/login_out') //分别对应一级路由和二级路由
     .then((res)=>{    //兄弟请使用es箭头函数
       if(res.data.status==='0'){
         this.loginflag=true;
       }
     })
   },
   clickx(){
     this.$refs.model.modelshowflag=false;
   },
    go_login(){
            if(!this.username||!this.password){
                   this.tipsflag=true;
                return
            }
          axios.post('/users/login',{   //路径  /users对应一级路由（app.js），/login对应2级路由(user.js)
               username: this.username,
               password:this.password
          }).then((res)=>{    //这里还要用es6的语法，不然this指向有问题
                 var response = res.data;
                 if(response.status==='0'){
                   this.$refs.model.modelshowflag=false;
                     this.tipsflag=false;  
                     this.username=response.result.username;
                     this.loginflag=false;
                 }else{
                     this.tipsflag=true;
                 }
          })
        },
        childss(){
         this.$refs.model.modelshowflag=false;
        }
},
mounted(){
  axios.get('/users/checkout').then((res)=>{
    if(res.data.status==='0'){
      this.loginflag=false,
      this.username=res.data.result  //通过v-text来给元素内容添加值
    }
  })
}
}
</script>
<style scoped>
.common{ margin: 20px 0 10px -50px}
.common input { height:25px;width:200px;}
.title { text-align: center; margin-top:20px; font-weight: 300; font-size:30px;}
.btn_login { background: tomato;padding: 10px 20px;}
.back{ position: absolute; right:5px;top:3px; cursor: pointer; font-size: 20px; display:block;width: 20px; height:20px;line-height:15px;}
.back:hover{ border:1px solid goldenrod; border-radius: 50%; background: goldenrod}
.tips{color:red}
</style>
