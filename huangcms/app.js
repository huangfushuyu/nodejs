var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入 session 模块
var session = require('express-session')

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 设置 cookie
app.use(cookieParser());

// 设置session
app.use(session({
	resave: true, 
	saveUninitialized: true, 
	secret : 'suiji',
	cookie:{
		maxAge:1000*60*30
	}
}))

app.use(function(req,res,next){
	// res.locals 本地存储信息的对象
	// 设置默认信息 
	res.locals.user = '';
	if(req.session.user){
		res.locals.user = req.session.user;
	}
	next();
})


// 配置静态资源库
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// 设置路由
// 前台路由(用户的页面)
app.use('/', indexRouter);
// 后台路由(管理员的页面)
app.use('/admin', adminRouter);

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
