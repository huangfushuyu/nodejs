#CMS 内容管理系统

#用户名：皇甫书宇
#密码:huangfu
---

##用到的技术
	HTML css js
	Bootstrap 框架
	Materialize-UI 框架
	Node.js Express 框架
	MongoDB mongoose
	Md5 uid multer
	验证码模块 captchapng
---
##功能
	前台
		首页
		列表页
		内容页
		栏目下面有对应的文章
		列表页分页没有写
	后台
		栏目管理
			添加栏目
			栏目列表
				功能：编辑，删除
		文章管理
			添加文章
				ueditor编辑文章
				图片上传
			文章列表
				功能：编辑，删除,分页
		友链管理
			添加友链
			友链列表
				功能：编辑，删除
		系统管理
			添加管理员
			管理员列表
				功能：删除
---
##项目目录结构
	-|bin/							启动项目录
	-|--|www 						启动文件
	-|configs/						配置文件目录
	-|--|db_config.js       		数据库的配置文件
	-|--|uploadImage_config.js      图片上传配置文件
	-|controllers/					控制器的目录
	-|--|adminController.js 		管理员的控制器
	-|--|indexController.js 		首页的控制器
	-|models/						放 model 目录
	-|--|itemModel.js 				栏目的数据模型
	-|--|articleModel.js 			文章的数据模型
	-|--|adminModel.js 				管理员的数据模型
	-|--|linkModel.js 				友情链接的数据模型
	-|routes/						路径文件的目录
	-|--|index.js 					前台路由(用户)
	-|--|admin.js 					后台路由(管理员)
	-|views/						模版(视图)目录
	-|--|admin						后台模板目录(管理员)
	-|---|adminAdd.ejs 				管理员添加模板
	-|---|adminList.ejs				管理员列表模板
	-|---|articleAdd.ejs			添加文章模板
	-|---|articleEdit.ejs			修改文章模板
	-|---|articleList.ejs			文章列表模板
	-|---|error.ejs					错误信息提示模板
	-|---|footer.ejs				后台公共(底部)信息模板
	-|---|header.ejs				后台公共(导航)信息模板
	-|---|index.ejs					后台首页信息模板
	-|---|itemAdd.ejs				添加栏目模板
	-|---|itemEdit.ejs				栏目修改模板
	-|---|itemList.ejs				栏目列表模板
	-|---|linkAdd.ejs				添加友链模板
	-|---|linkEdit.ejs				修改友链模板
	-|---|linkList.ejs				友链列表模板
	-|---|login.ejs					登录页模板
	-|--|article.ejs				前台内容页模板
	-|--|footer.ejs					前台公共信息(底部)模板
	-|--|header.ejs					前台公共信息(头部)模板
	-|--|index.ejs					前台首页模板
	-|--|item.ejs					前台列表页模板
	-|public/						静态资源库
	-|--|assets/					管理员页面模版资源目录
	-|--|ueditor/					百度富文本编辑器
	-|--|js/						js 的目录
	-|--|css/						css 的目录
	-|--|images/					图片的目录
	-|--|uploads/					接收上传图片的目录
	-|node_modules/					项目依赖模块的目录
	-|app.js 						项目入口文件
	-|package.json 					项目的配置文件