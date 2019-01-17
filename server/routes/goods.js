var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var User = require("../models/user");

//连接Mongodb数据库
mongoose.connect('mongodb://admin:123456@192.168.6.128:27017/demoone')

mongoose.connection.on('connected',function(){
    console.log('已经成功连接！')
});
mongoose.connection.on('error',function(err){
 console.log('err'+err)
});
mongoose.connection.on('disconnected',function(){
    console.log('连接失败了！')
})
//这里是二级路由
router.get('/',function(req,res,next){
    var sort = req.param('sort');  //后端获取参数的方式 这个参数用来排序，价格，1正，-1到
    var page = parseInt(req.param('page'));   //调到哪一页
    var pageSize = parseInt(req.param('pageSize'));  //一页显示的数量
    var priceLevel = req.param('priceLevel');
    var params={};
    var lowPrice,upPrice;
    if (priceLevel!='all'){
        switch (priceLevel){
            case '0'    : lowPrice=1500;upPrice=2000; console.log(1111);break;
            case '100'    : lowPrice=2001;upPrice=3000;break;
            case '500'   : lowPrice=3001;upPrice=4000;break;
            case '1000'   : lowPrice=4001;upPrice=8000;break;
        };
        params ={
            salePrice: {$gte:lowPrice,$lte:upPrice}
        }
    }
    var skip = (page-1)*pageSize;
    // let params = {};
    var goodsModel = Goods.find(params).skip(skip).limit(pageSize);  //返回的是queryObject,
    goodsModel.sort({'salePrice':sort});//根据价格排序的逻辑 ,  sort排序函数就是query.sort() 1是升序，-1降序。
    goodsModel.exec(function(err,doc){   //Goods就是models里定义的
        if(err){
            res.json({
                status: '1',
                msg: err.message
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    list:doc,     //doc就是数据
                }
            })
        }
    })
})
//购物车添加功能
router.post('/addCart',function(req,res,next){
    var userId=10001,productId=req.body.productId;
    User.findOne({userId:userId},function(err,userdoc){
        if(err){
            res.json({
                status: '1',
                msg: err.message
            })
        }else{
            if(userdoc){
                var goodsItem='';
                userdoc.cartList.forEach(function(item,i){
                    if(item.productId===productId){
                        goodsItem=item;
                        item.productNum++
                    }
                })
                if(goodsItem){    //购物车中已存在该类商品
                    userdoc.save(function(err,doc){
                        if(err){
                            console.log('这里')
                            res.json({
                                status:'1',
                                msg:err.message
                            })
                        }else{
                            res.json({
                                status: '0',
                                msg:'you are successsful',
                            })
                        }
                    })
                }else{  //购物车中不存在该商品
                    Goods.findOne({productId:productId},function(err,doc2){
                        if(err){
                            console.log(12233)
                            res.json({
                                status:'1',
                                msg:err.message,
                            })
                        }else{
                            if(doc2){
                                //对比goods字段与user字段，进行字段的添加
                                doc2.productNum =1;
                                doc2.checked = 1;
                                console.log(doc2+"nihaoa")
                                userdoc.cartList.push(doc2);
                           
                                userdoc.save(function(err,doc){
                                    if(err){
                                        res.json({
                                            status:'1',
                                            msg:err.message
                                        })
                                    }else{
                                        res.json({
                                            status:'0',
                                            msg: 'you are successful!'
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
               
            }
        }
    })

})
module.exports=router;