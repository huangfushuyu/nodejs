var express = require('express');
var router = express.Router();

// 引入管理员系统的控制器
var adminController = require('../controllers/adminController.js');

/* 管理员首页 */
router.get('/',adminController.index);

// 添加栏目页
router.get('/itemAdd',adminController.itemAdd);

// 插入栏目数据
router.post('/itemInsert',adminController.itemInsert);

//栏目列表
router.get('/itemList',adminController.itemList);

//删除栏目
router.get('/itemDel/:_id',adminController.itemDel);

//编辑栏目
router.get('/itemEdit/:_id',adminController.itemEdit);

//更新栏目数据
router.post('/itemUpdate',adminController.itemUpdate);

//文章发布
router.get('/articleAdd',adminController.articleAdd);

// 添加文章
router.post('/articleInsert',adminController.articleInsert);

// 文章列表
router.get('/articleList',adminController.articleList);

// 编辑文章的页面
router.get('/articleEdit/:_id',adminController.articleEdit);

// 更新文章封面
router.post('/articleImageUpdate',adminController.articleImageUpdate);

// 更新文章文本
router.post('/articleTextUpdate',adminController.articleTextUpdate);

// 删除文章
router.get('/articleRemove/:_id',adminController.articleRemove);

// 友链列表
router.get('/linkList',adminController.linkList);

// 添加友链
router.get('/linkAdd',adminController.linkAdd);

//删除友链
router.get('/linkDel/:_id',adminController.linkDel);

// 插入友链
router.post('/linkInsert',adminController.linkInsert);

//编辑友链
router.get('/linkEdit/:_id',adminController.linkEdit);

//修改友链
router.post('/linkUpdate',adminController.linkUpdate);

// 添加管理员页面
router.get('/adminAdd',adminController.adminAdd);

// 添加管理员信息
router.post('/adminInsert',adminController.adminInsert);

//管理员列表
router.get('/adminList',adminController.adminList);

//删除管理员
router.get('/adminDel/:_id',adminController.adminDel);

// 验证码
router.get('/code',adminController.code);

// 登录页面
router.get('/login',adminController.login);

// 登录的操作
router.post('/doLogin',adminController.doLogin);

// 退出登录
router.get('/logOut',adminController.logOut);

module.exports = router;
