var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var Counter = mongodb.mongoose.model("Counter", CounterSchema);

var QuestionSchema = new Schema({
	id: String,
    qtype: Number,
    name: String,
    content: String,
    options: [
        {
            name: String
        }
    ],
    answer: String
});
QuestionSchema.pre('save', function(next) {
    var doc = this;
    Counter.findByIdAndUpdate({_id: 'questionid'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.id = counter.seq;
        next();
    });
});
var Question = mongodb.mongoose.model("Question", QuestionSchema);




var QuestionDAO = function(){};
//保存试题
QuestionDAO.prototype.save = function(obj, callback){
	var instance = new Question(obj);
	instance.save(function(err){
		callback(err, null);
	});
}

//更新试题
QuestionDAO.prototype.update = function(obj, callback){
	Question.findByIdAndUpdate(obj._id, obj, {}, function(err){
		callback(err, null);
	});
}

//获取试题列表
QuestionDAO.prototype.list = function(callback){
	Question.find(function(err, questions){
		callback(false, questions);
	});
}

//根据id获取试题
QuestionDAO.prototype.get = function(id, callback){
	Question.find({id: id}, function(err, questions){
		if(questions.length){
			callback(false, questions[0]);
		}
		else{
			callback('查找不到数据！');
		}
	})
}

//删除试题
QuestionDAO.prototype.remove = function(id, callback){
	Question.remove({id: id}, function(err){
		callback(err, null);
	})
}

module.exports = new QuestionDAO();