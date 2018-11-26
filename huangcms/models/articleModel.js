// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

//定义文章集合骨架
var articleSchema=new mongoose.Schema({
	itemId : {
		type: 'ObjectId',
		ref: 'item'
	},
	title 		:String,		
	author 		:String,		
	content 	:String, 		
	keywords	:String,		
	description	:String,		
	imgurl		:String, 		
	ctime: {
		type: Date,		
		default: new Date()
	},
});

// 创建文章数据模型
var articleModel = mongoose.model('article',articleSchema);

// 暴露articleMode 
module.exports = articleModel;