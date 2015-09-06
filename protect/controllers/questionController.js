var Question = require('../models/question');

//统一回调函数
var callback = function(req, res, err, data){
	if(err){
		res.send({success: false, error: err});
	}
	else{
		res.send({success: true, data: data});
	}
}


module.exports = {
	//添加试题
	save: function(req, res){
		var data = req.body.question;
		Question.save(data, function(err, data){
			callback(req, res, err, data);
		});
	},
	//更新试题
	update: function(req, res){
		var data = req.body.question;
		Question.update(data, function(err, data){
			callback(req, res, err, data);
		});
	},
	//获取试题列表
	getQuestions: function(req, res){
		var pageNo = req.body.pageNo;
		var pageSize = req.body.pageSize;
		Question.list(pageNo, pageSize, function(err, data){
			callback(req, res, err, data);
		});
	},
	//根据id获取试题
	getQuestion: function(req, res){
		var id = req.body.id;
		Question.get(id, function(err, data){
			callback(req, res, err, data);
		});
	},
	//删除试题
	remove: function(req, res){
		var id = req.body.id;
		Question.remove(id, function(err, data){
			callback(req, res, err, data);
		});
	}

}