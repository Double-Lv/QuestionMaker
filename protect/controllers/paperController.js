var Paper = require('../models/paper');

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
	getPapers: function(req, res){
		var pageNo = req.body.pageNo;
		var pageSize = req.body.pageSize;
		Paper.list(pageNo, pageSize, function(err, data){
			callback(req, res, err, data);
		});
	},
	//获取试题列表
	getPaperQuestions: function(req, res){
		var id = req.body.id;
		Paper.getQuestions(id, function(err, data){
			callback(req, res, err, data);
		});
	},
	save: function(req, res){
		var paper = req.body.paper;
		Paper.save(paper, function(err, data){
			callback(req, res, err, data);
		});
	},
	getPaper: function(req, res){
		var id = req.body.id;
		Paper.get(id, function(err, data){
			callback(req, res, err, data);
		});
	},
	update: function(req, res){
		var paper = req.body.paper;
		Paper.update(paper, function(err, data){
			callback(req, res, err, data);
		});
	},
	remove: function(req, res){
		var id = req.body.id;
		Paper.remove(id, function(err, data){
			callback(req, res, err, data);
		});
	}

}