var Question = require('./../models/question.js');

var callback = function(req, res, err, data){
	if(err){
		res.send({success: false, error: err});
	}
	else{
		res.send({success: true, data: data});
	}
}

exports.save = function(req, res){
	var data = req.body.question;
	Question.save(data, function(err, data){
		callback(req, res, err, data);
	});
}

exports.update = function(req, res){
	var data = req.body.question;
	Question.update(data, function(err, data){
		callback(req, res, err, data);
	});
}

exports.getQuestions = function(req, res){
	Question.list(function(err, data){
		callback(req, res, err, data);
	});
}

exports.getQuestion = function(req, res){
	var id = req.body.id;
	Question.get(id, function(err, data){
		callback(req, res, err, data);
	});
}

exports.remove = function(req, res){
	var id = req.body.id;
	Question.remove(id, function(err, data){
		callback(req, res, err, data);
	});
}