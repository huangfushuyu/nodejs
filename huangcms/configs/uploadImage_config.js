// 图片上传的配置

// 引入multer模块
var multer  = require('multer');

// 引入path模块
var path = require('path');

// 引入uid模块
var uid = require('uid');

// 引入时间模块
var timestamp = require('time-stamp');

var imgUpload = function(imgPath,imgType,fileSize){

	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, imgPath)
		},

		filename: function (req, file, cb) {
			var extName = path.extname(file.originalname);
			// 设置图片名称
			cb(null,timestamp('YYYYMMDD')+'-'+uid()+extName);
		}
	})

	function fileFilter (req, file, cb) {
		if( imgType.indexOf(file.mimetype) == -1){
		  cb(null, false);
		  cb(new Error('请上传 jpeg、png或gif格式的图片'))
		}else{
		  cb(null, true)
		}
	}

	var upload = multer({ 
		storage: storage,
		fileFilter: fileFilter,
		limits:{
			fileSize:fileSize
		}	
	})

	return upload;
}

// 暴露 图片上传 函数
module.exports = imgUpload;