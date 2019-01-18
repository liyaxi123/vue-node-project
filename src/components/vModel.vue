<template>
<div v-show="modelshowflag">
<div class="model">
    <span class="back" @click="modelshowflag=!modelshowflag">x</span>
    <div class="title">登陆页</div>
    <div class="tips" v-show="tipsflag">你输入的账号或密码不正确</div>
    <div class="common">
        <label for="username">用户名</label>
            <input type="text" id="username" v-model="username">
    </div>
    <div class="common">
        <label for="pwd">&nbsp;&nbsp;&nbsp;密码</label>
            <input type="password" id="pwd" v-model='password'>
    </div>
    <div class="btn_model"><button class="btn_login" @click="go_login">登&nbsp;&nbsp;陆</button></div>
    </div>
     <div class="over-lay" @click="modelshowflag=!modelshowflag"></div>
</div>
</template>
<script>
import axios from 'axios';
export default{
    data(){
        return {
          modelshowflag:false,
          username:'',
          password:'',
          tipsflag:false
        }
    },
    methods:{
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
                      this.modelshowflag=false;
                     this.tipsflag=false;  
                     this.$parent.username=response.result.username;
                     this.$parent.loginflag=false;
                 }else{
                     this.tipsflag=true;
                 }
          })
        }
    }
}
</script>
<style scoped>
.model { position:absolute; z-index: 1000; height: 300px; width: 400px; background: wheat; left:50%; top:200px; transform: translate(-200px); text-align: center;}
.common{ margin: 20px 0 10px -50px}
.common input { height:25px;width:200px;}
.title { text-align: center; margin-top:20px; font-weight: 300; font-size:30px;}
.btn_login { background: tomato;padding: 10px 20px;}
.btn_model{margin-top: 30px;}
.back{ position: absolute; right:5px;top:3px; cursor: pointer; font-size: 20px; display:block;width: 20px; height:20px;line-height:15px;}
.back:hover{ border:1px solid goldenrod; border-radius: 50%; background: goldenrod}
.over-lay{     position: fixed; left: 0; right: 0; top: 0; bottom: 0; background: darkorchid; opacity: 0.6;}
.tips{color:red}
</style>