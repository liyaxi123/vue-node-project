var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs =require('ejs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goods = require('./routes/goods');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods',goods);
//登录拦截功能在这里处理
app.use(function(req,res,next){
  //req.originalUrl  返回的是完整请求地址包括参数，req.path返回的是不包括参数的请求地址
  if(req.originalUrl=='/users/login_in'||req.originalUrl=='/users/login_out'||req.path=='/goods'){
    res.next()
  }else{
    if(req.cookies.userId){
      res.next();
    }else{
      res.json({
        status:'1',
        msg:'sorry，你还未登录!',
      })
    }
  }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
