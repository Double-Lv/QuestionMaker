var Question = require('./../models/question.js');

exports.save = function(req, res){
	console.log(req.body);
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