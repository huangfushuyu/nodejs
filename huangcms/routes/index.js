var express = require('express');
var router = express.Router();

// 引入前台网站的控制器
var indexController = require('../controllers/indexController.js');

/* 首页 */
router.get('/',indexController.index);

// 内容页
router.get('/article/:_id',indexController.article);

//列表页
router.get('/item/:_id',indexController.item);

//友情链接

module.exports = router;
