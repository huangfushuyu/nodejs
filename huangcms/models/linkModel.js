//引入数据库配置模块
var mongoose=require('../configs/db_config.js');

//定义友链栏目集合的骨架
var linkSchema=new mongoose.Schema({

	name:String,
	info:String,
	ctime:{
		type:Date,
		default:new Date(),
	},
});

//创建数据模型
var linkModel=mongoose.model('link',linkSchema);

//暴露linkSchema
module.exports=linkModel;