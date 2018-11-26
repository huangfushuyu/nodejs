var indexController = {};

// 引入栏目数据库模型
var itemModel = require('../models/itemModel.js');

// 引入文章数据库模型
var articleModel = require('../models/articleModel.js');

// 引入友链数据库模型
var linkModel = require('../models/linkModel.js');

// 首页
indexController.index = function(req, res, next) {
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			getItemArticles(0)
			function getItemArticles(i){
				articleModel.find({itemId:data[i]._id}).limit(5).exec(function(err,articles){
					data[i].articlelist = articles;
					if(i<data.length-1){
						getItemArticles(++i);
					}else{
						linkModel.find({},function(err,data1){
							res.render('index',{items:data,links:data1});	
						})
					    					
					}
				});	
			}
			
		}		
	});

}

// 内容页
indexController.article = function(req,res){

	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			articleModel.findOne({_id:req.params._id},function(err,data1){
				if(err){
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
				    res.render('article',{items:data,data:data1});			
				}	
			})
		}		
	});	
}

//栏目页
indexController.item=function(req,res){
	// 查找所有栏目
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			// 查找指定的栏目
			itemModel.findOne({_id:req.params._id},function(err,data2){
				if(err){
						res.render('admin/error',{errText:'数据查询失败'});
				}else{
					console.log(data2);
					//查找指定栏目下的文章
					articleModel.find({itemId:req.params._id},function(err,data1){
						if(err){
							res.render('admin/error',{errText:'数据查询失败'});
						}else{
						    res.render('item',{items:data,city:data2,articles:data1});			
						    		
						}	
					})
				}
		})
		}
	})
}

// 暴露 控制
module.exports = indexController;

