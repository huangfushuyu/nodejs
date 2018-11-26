//引入数据库配置模块
var mongoose=require('../configs/db_config.js');

//定义栏目集合的骨架
var itemSchema=new mongoose.Schema({

	name:String,
	info:String,
	ctime:{
		type:Date,
		default:new Date(),
	},
	order:Number,
});

//创建数据模型
var itemModel=mongoose.model('item',itemSchema);

//暴露itmeSchema
module.exports=itemModel;