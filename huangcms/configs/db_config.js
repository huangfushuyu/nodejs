//数据库的配置文件

//引入mongoose模块
var mongoose=require("mongoose");

//数据库地址
var DBURL='mongodb://localhost:27017/huangfu';

//连接数据库
mongoose.connect(DBURL,function(err){
	if(err){
		console.log('数据库连接失败');
	}else{
		console.log('数据库连接成功');
	}
}) 

//暴露
module.exports=mongoose;