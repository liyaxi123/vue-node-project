var express = require('express');
var router = express.Router();
var moongose = require('mongoose');
var User = require('../models/user');
router.post('/login', function(req, res, next) {
   var userId=req.body.username;
   User.findOne({'userId':userId},function(err,doc){
     if(err){
       res.json({
         status: '1',
         msg: '请求出错了',
         result:''
       })
     }else{
       if(doc){
         res.json({
          status: '0',
          msg: 'you are successful',
          result:''
         });
         
       }else{
        res.json({
          status:'1',
          msg:'dont have this username',
          result:''
        })
       }
     }
   })
});

module.exports = router;
