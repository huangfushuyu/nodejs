//管理员的控制器
var adminController = {};

//引入栏目数据库模型
var itemModel = require('../models/itemModel.js');

// 引入文章数据库模型
var articleModel = require('../models/articleModel.js');

// 引入文章数据库模型
var adminModel = require('../models/adminModel.js');

// 引入友链数据库模型
var linkModel = require('../models/linkModel.js');

// 管理员的首页
adminController.index = function(req,res){
	// if(!req.session.user) res.redirect('/admin/login');
    res.render('admin/index'); 
} 

//添加栏目页面
adminController.itemAdd =  function(req,res){
	//验证有没有登录
	// if(!req.session.user) res.redirect('/admin/login');
    res.render('admin/itemAdd');
}

//插入栏目数据
adminController.itemInsert=function(req,res){
	itemModel.create(req.body,function(err){
		if(err){
			res.render('admin/error',{errText:'插入数据失败'});
		}else{
			// 跳转到栏目列表页
			res.redirect('/admin/itemList');
		}
	})
}

//栏目列表
adminController.itemList=function(req,res){

	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			res.render('admin/error',{errText:'数据查询失败'});
		}else{

			// 响应栏目列表页并获取数据
			res.render('admin/itemList',{items:data});
		}
	})
}

//删除栏目
adminController.itemDel=function(req,res){

	//db.collection.deleteOne()从集合中删除单个文档
	itemModel.deleteOne({_id:req.params._id},function(err){
		if(err){
			res.render('admin/error',{errText:'数据删除失败'});
		}else{
			res.redirect('/admin/itemList');
		}
	})
}

//编辑栏目
adminController.itemEdit=function(req,res){
	itemModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			res.render('admin/itemEdit',{item:data});
		}
	})
}

//修改栏目
adminController.itemUpdate=function(req,res){
	itemModel.update({_id:req.body._id},req.body,function(err){
		if(err){
			res.render('admin/error',{errText:'数据更新失败'});
		}else{
			res.redirect('/admin/itemList');
		}
	})
}

//文章发布
adminController.articleAdd=function(req,res){
	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
		    res.render('admin/articleAdd',{items:data});			
		}		
	});	
}

// 插入文章的数据
adminController.articleInsert = function(req,res){
	var imgType = ['image/jpeg','image/png','image/gif'];
	var fileSize = 1024 * 1024 * 5;
	var imgPath = 'uploads';
	var imgUpload = require('../configs/uploadImage_config.js');
	var upload = imgUpload(imgPath,imgType,fileSize).single('imgurl');
	upload(req,res,function(err){
		if(err){
			res.send('图片上传失败');
		}else{
			req.body.imgurl = req.file.filename;
			articleModel.create(req.body,function(err){
				if(err){
					res.render('admin/error',{errText:'文章数据添加失败'});
				}else{
					console.log(req.file.filename);
					res.redirect('/admin/articleList');				    	
				}
			});
		}
	})

}

// 文章列表
adminController.articleList = function(req,res){

	var page = req.query.page?req.query.page:1;
	var pageSize = 3;
	articleModel.find({}).count(function(err,total){
		if(err){
			res.render('admin/error',{errText:'数据查询失败'});			
		}else{
			var maxPage =  Math.ceil(total/pageSize);
			if(page<1) page = 1;
			if(page>maxPage) page = maxPage;
			var offsetPage = pageSize*(page-1);
			articleModel.find({}).limit(pageSize).skip(offsetPage).populate('itemId',{name:1}).exec(function(err,data){
				if(err){
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
			    	res.render('admin/articleList',{articles:data,maxPage:maxPage,page:page});	
				}
			})
		}
	})
	
}

// 编辑文章的页面
adminController.articleEdit = function(req,res){

	itemModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			articleModel.findOne({_id:req.params._id},function(err,data1){
				if(err){
					res.render('admin/error',{errText:'数据查询失败'});
				}else{
				    res.render('admin/articleEdit',{items:data,data:data1});			
				}	
			})
		}		
	});	
}

// 更新文章封面
adminController.articleImageUpdate = function(req,res){

	var imgType = ['image/jpeg','image/png','image/gif'];
	var fileSize = 1024 * 1024 * 5;
	var imgPath = 'uploads';
	var imgUpload = require('../configs/uploadImage_config.js');
	var upload = imgUpload(imgPath,imgType,fileSize).single('imgurl');
	upload(req,res,function(err){
		if(err){
			res.send('图片上传失败');
		}else{
			articleModel.update({_id:req.body._id},{$set:{imgurl:req.file.filename}},function(err){
				if(err){
					res.render('admin/error',{errText:'文章封面修改失败'});
				}else{
					res.redirect('/admin/articleList');
				}
			});
		}
	})
}

// 更新文章内容
adminController.articleTextUpdate = function(req,res){
	articleModel.update({_id:req.body._id},{$set:req.body},function(err){
		console.log(req.body);
		if(err){
			res.render('admin/error',{errText:'文章封面修改失败'});
		}else{
			res.redirect('/admin/articleList');
		}
	});
}


// 删除文章
adminController.articleRemove = function(req,res){

	articleModel.remove({_id:req.params._id},function(err){
		if(err){
			res.render('admin/error',{errText:'数据删除失败'});
		}else{
			res.redirect('/admin/articleList');
		}
	})
}

//友链添加
adminController.linkAdd =  function(req,res){
    res.render('admin/linkAdd');
}

//插入友链
adminController.linkInsert=function(req,res){
	linkModel.create(req.body,function(err){
		if(err){
			res.render('admin/error',{errText:'插入数据失败'});
		}else{
			// 跳转到友链列表页
			res.redirect('/admin/linkList');
		}
	})
}

//友链列表
adminController.linkList=function(req,res){

	linkModel.find({},function(err,data){
		if(err){
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			res.render('admin/linkList',{links:data});
		}
	})
}

//删除友链
adminController.linkDel=function(req,res){

	//db.collection.deleteOne()从集合中删除单个文档
	linkModel.deleteOne({_id:req.params._id},function(err){
		if(err){
			res.render('admin/error',{errText:'数据删除失败'});
		}else{
			res.redirect('/admin/linkList');
		}
	})
}

//编辑友链
adminController.linkEdit=function(req,res){
	linkModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			res.render('admin/linkEdit',{link:data});
		}
	})
}

//修改友链
adminController.linkUpdate=function(req,res){
	linkModel.update({_id:req.body._id},req.body,function(err){
		if(err){
			res.render('admin/error',{errText:'数据更新失败'});
		}else{
			res.redirect('/admin/linkList');
		}
	})
}

// 添加管理员页面
adminController.adminAdd = function(req,res){
	// 响应模版 分配数据
	res.render('admin/adminAdd');
}

// 添加管理员数据
adminController.adminInsert = function(req,res){

	var md5 = require('md5');
	if(req.body.code != req.session.code){
		res.send('验证码不正确');
		return;
	}
	if(req.body.password != req.body.repassword){
		res.send('两次密码不一致');
	}
	req.body.name = req.body.name.trim();
	req.body.password = md5(req.body.password.trim());

	adminModel.create(req.body,function(err){
		if(err){
			res.render('admin/error',{errText:'添加管理员失败'});
		}else{
			res.redirect('/admin/adminList');
		}
	})

}

// 管理员列表
adminController.adminList=function(req,res){
	adminModel.find({}).sort({order:1}).exec(function(err,data){
		if(err){
			res.render('admin/error',{errText:'数据查询失败'});
		}else{
			res.render('admin/adminList',{admins:data});
		}
	})
}

// 删除管理员
adminController.adminDel=function(req,res){
	adminModel.deleteOne({_id:req.params._id},function(err){
		if(err){
			res.render('admin/error',{errText:'数据删除失败'});
		}else{
			res.redirect('/admin/adminList');
		}
	})
}

// 验证码
adminController.code = function(req,res){
	var captchapng = require('captchapng');
	var code = parseInt(Math.random()*9000+1000);
	req.session.code = code;
    var p = new captchapng(80,20,code); 
    p.color(0, 0, 0, 0);  
    p.color(80, 80, 80, 255); 
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.send(imgbase64);
}


//登录页面
adminController.login = function(req,res){
	res.render('admin/login',{error:null});
}

// 登录的操作
adminController.doLogin = function(req,res){

	var md5 = require('md5');
	if(req.body.code != req.session.code){
		res.render('admin/login',{error:'验证码不正确'});
		return;
	}
	var name = req.body.name.trim();
	var password = md5(req.body.password.trim());
	adminModel.findOne({name:name},function(err,data){
		if(data==null){
			res.render('admin/login',{error:'用户名或密码不正确'});
		}else{
			if(password==data.password){
				req.session.user = data;
				res.redirect('/admin');			
			}else{
				res.render('admin/login',{error:'用户名或密码不正确'});
			}			
		}
	})
}


// 退出登录
adminController.logOut = function(req,res){
	// 把 登录时 添加的用户信息 赋值 null
	req.session.user = null;
	// 跳转到登录页面
	res.redirect('/admin/login');
}

//暴露模块
module.exports = adminController;