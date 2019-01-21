var express = require('express');
var router = express.Router();
require('./../util/util.js');
//这里做的时候有个疑问，该文件不引入mogoose行不行,结果不引入也行
 var moongose = require('mongoose');
var User = require('../models/user');
router.post('/login', function(req, res, next) {
  var params={
    userName:req.body.username,  //字段名称一定要和数据库相同，post获取参数的方式req.body
    userPwd: req.body.password
  }
   User.findOne(params,function(err,doc){
     if(err){
       res.json({
         status: '1',
         msg: 'err.message',
       })
     }else{
       if(doc){
           //查询到了数据，就需要在这里写入cookie,
           //做的时候还是有个疑问，app.js中导入了cookie中间件，这个文件就不需要再引用cookie中间件了。
           res.cookie('userId',doc.userId,{   //cookie的设置方式，前面是名称中括号是参数
             path:'/',
             maxAge:1000*60*60
           })
         res.json({
          status: '0',
          msg: 'you are successful',
          result:{
            username:doc.userName
          }
         });
         
       }else{
        res.json({
          status:'1',
          msg:'dont have this username',
        })
       }
     }
   })
});
router.post('/login_out',function(req,res,next){
   //后端需要删除cookie
   res.cookie('userId','',{
     path:'/',
     maxAge: -1
   });
   res.json({
    status: '0',
    msg: 'you are successful',
   })
});
//登录状态检查
router.get('/checkout',function(req,res,next){
  if(req.cookies.userId){
     var userId = req.cookies.userId
    User.findOne({userId:userId},function(err,doc){
       res.json({
         status: '0',
         msg:'你已经登录',
         result:doc.userName
       })
    })
  }else{
    res.json({
      msg:'对不起您未登录！',
      status:'1',
    })
  }
})
//删除购物车   根据前端传来的productID和缓存中的username   
router.post('/cartdel',function(req,res,next){   //为什么逻辑要写这里，因为要操作user文档，你再建个usermodel写其他地方也OK
  var userId = req.cookies.userId,productId=req.body.productId;
  User.update({userId:userId},{'$pull':{cartList:{productId:productId}}},function(err,doc){
    if(err){
      res.json({
        msg:err.message,
        status:'1',
      })
    }else{
      res.json({
        msg:'数据删除成功',
        status:'0',
        result:''
      })
    }
  }) 
});
//编辑购物车的数量
router.post('/carteditor',function(req,res,next){
 var userId= req.cookies.userId,productId = req.body.productId,productNum=req.body.productNum,checked=req.body.checked;
 User.update({userId:userId,'cartList.productId':productId},{
   'cartList.$.productNum':productNum,
   'cartList.$.checked':checked
 },function(err,doc){
   if(err){
     res.json({
       status:'1',
       msg:err.message,
       result:''
     })
   }else{
     res.json({
       //数据先返回去
       status:'0',
       msg:'数量已经更新成功了',
       result: doc
     })
   }
 })
});
//全选select
router.post('/checkedall',function(req,res,next){
  var checkedAll = req.body.checkedAll===true?1:0,userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        doc.cartList.forEach(element => {
          element.checked=checkedAll;
        });
        doc.save(function(err,doc){
          if(err){
            res.json({
              status:'1',
              msg:err.message,
              result:''
            })
          }else{
            res.json({
              status:'0',
              msg:'selectAll已经全部改好',
              result:doc
            })
          }
        })
      }
    }
  })
})
//用户地址初始加载
router.get('/addressList',function(req,res,next){
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'addressList已经成功返回',
          result:doc.addressList
        })
      }
    }
  })
});
//设为默认地址
router.post('/addressdefault',function(req,res,next){
    var userId=req.cookies.userId,addressId=req.body.addressId;
    User.findOne({userId:userId},function(err,doc){
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }else{
    if(doc){
      doc.addressList.forEach((item)=>{
        if(item.addressId===addressId){
          item.isDefault=true;
        }else{
          item.isDefault=false;
        }
      });
      doc.save(function(err,doc){
        if(err){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          })
        }else{
          if(doc){
            res.json({
              status:'0',
              msg:'默认地址已经更新成功',
              result:'',
            })
          }
        }
      })
    }    
      }
 })
});
router.post('/addressDelete',function(req,res,next){
  var addressId = req.body.addressId,userId= req.cookies.userId;
  User.update({userId:userId},{'$pull':{addressList:{addressId:addressId}}},function(err,doc){
    if(err){
      res.json({
        msg:err.message,
        status:'1',
      })
    }else{
      res.json({
        msg:'地址删除成功',
        status:'0',
        result:''
      })
    } 
  })
});
//有订单页面跳转至支付页面的接口
router.post('/payMent',function(req,res,next){
  var addressId = req.body.addressId, userId=req.cookies.userId,totolPrice=req.body.totolPrice;
 User.findOne({userId:userId},function(err,doc){
  if(err){
    res.json({
      status:'10001',
      msg: err.message,
    })
  }else{
    if(doc){
      //查找地址信息和购物车信息并进行保存
      var address='',cart=[];
      doc.addressList.forEach((item)=>{
        if(item.addressId===addressId){
          address=item
        }
      });
      doc.cartList.forEach((item)=>{
         if(item.checked===1){
           cart.push(item);
         }
      });
      var r1 =Math.floor( Math.random()*10);
      var r2 =Math.floor( Math.random()*10);
      var  sys = new Date().Format('yyyyMMddhhmmss');
      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
      var platform ='234';
      var orderId = platform+r1+sys+r2;
      //定义订单对象
      var order ={
        orderId:order,
        orderTotal:totolPrice,
        addressInfo:address,
        orderStatus:'1',
        createDate:createDate
      };
      doc.orderList.push(order);
      doc.save(function(err,doc){
        if(err){
          res.json({
            status:'1000001',
            msg:err.message
          })
        }else{
          if(doc){
            res.json({
              status:'0',
              msg:'你已经创建订单成功了！',
              result:{
                orderId:order.orderId,
                orderTotal:order.orderTotal
              }
            })
          }
        }
      })
      res.json({
        status:'0',
        msg: '你已经成功的进入支付页面了',
        result:''
      })
    }else{
      res.json({
        status:'1',
        msg: '没有你想要的数据',
        result:''
      })
    }
  }
 })
})
module.exports = router;
