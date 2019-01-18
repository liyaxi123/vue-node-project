var express = require('express');
var router = express.Router();
//这里做的时候有个疑问，该文件不引入mogoose行不行,结果不引入也行
// var moongose = require('mongoose');
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
   //后盾需要删除cookie
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
    User.findOne({userId:userId},function(err,doc){
       res.json({
         status: '0',
         msg:'你已经登录',
         result:doc.userName
       })
    })
  }else{
    res.json({
      msg:'对不齐你好未登录！',
      status:'1',
    })
  }
})
module.exports = router;
