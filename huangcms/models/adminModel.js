// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

//定义管理员集合的骨架
var adminSchema =  new mongoose.Schema({
	name : String,  	
	password:String,
	info : String,		
	tel  : String,		
	ctime: {
		type: Date,		
		default: new Date()
	},
});

var adminModel = mongoose.model('admin',adminSchema);

// 暴露 itemModel 
module.exports = adminModel;