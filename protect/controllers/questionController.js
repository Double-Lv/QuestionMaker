var Question = require('./../models/question.js');

exports.save = function(req, res){
	var data = req.body;
	Question.save(data, function(err){
		if(err){
			res.send({success: false, error: err});
		}
		else{
			res.send({success: true});
		}
	});
}

exports.getQuestions = function(req, res){
	Question.list(function(err, data){
		if(err){
			res.send({success: false, error: err});
		}
		else{
			res.send({success: true, data: data});
		}
	});
}