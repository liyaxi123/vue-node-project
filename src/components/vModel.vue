<template>
<div v-show="modelshowflag">
<div class="model">
   <slot name="description"></slot>
   <slot name="contentModel"></slot>
    <div class="btn_model"><slot name="buttonModel"></slot></div>
    </div>
     <div class="over-lay" @click="close"></div>
</div>
</template>
<script>
import axios from 'axios';
export default{
    data(){
        return {
          modelshowflag:false,
        }
    },
    props:[],
    methods:{
        close(){
            this.$emit('close')
        }
    }
}
</script>
<style scoped>
.model { position:fixed; z-index: 1000; height: 300px; width: 400px; background: wheat; left:50%; top:50%; transform: translate(-200px, -50%); text-align: center;}
.btn_model{margin-top: 30px;}
.over-lay{     position: fixed; left: 0; right: 0; top: 0; bottom: 0; background: darkorchid; opacity: 0.6;}
</style>