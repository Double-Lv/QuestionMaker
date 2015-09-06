var mongodb = require('./mongodb');
var Question = require('./question');
var Schema = mongodb.mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 1 }
});

var Counter = mongodb.mongoose.model("Counter");

var PaperSchema = new Schema({
	id: String,
    name: String,
    questionIds: Array
});
PaperSchema.pre('save', function(next) {
    var doc = this;
    Counter.findByIdAndUpdate({_id: 'paperid'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.id = counter.seq;
        next();
    });
});

var Paper = mongodb.mongoose.model("Paper", PaperSchema);


var PaperDAO = function(){};
//保存试卷
PaperDAO.prototype.save = function(obj, callback){
	var instance = new Paper(obj);
	instance.save(function(err){
		callback(err, null);
	});
}

//更新试卷
PaperDAO.prototype.update = function(obj, callback){
	Paper.findByIdAndUpdate(obj._id, obj, {}, function(err){
		callback(err, null);
	});
}

//获取试卷列表
PaperDAO.prototype.list = function(pageNo, pageSize, callback){
	Paper.count(function(err, count){
		Paper.find({}, null, {skip: (pageNo-1)*pageSize, limit: pageSize, sort: {'id': 1} }, function(err, papers){
			callback(false, {papers: papers, total: count, pageNo: pageNo});
		});
	});
}

//根据id获取试卷
PaperDAO.prototype.get = function(id, callback){
	Paper.find({id: id}, function(err, papers){
		if(papers.length){
			callback(false, papers[0]);
		}
		else{
			callback('查找不到数据！');
		}
	})
}

//删除试卷
PaperDAO.prototype.remove = function(id, callback){
	Paper.remove({id: id}, function(err){
		callback(err, null);
	})
}

//获取试卷中的试题列表
PaperDAO.prototype.getQuestions = function(id, callback){
	//如果id为0，表示新建，直接获取所有试题，并把试题的checked赋值为false
	if(id == 0){
		Question.list(function(err, questions){
			questions.forEach(function(e, index){
				e = e.toObject();
				e.checked = false;
				questions[index] = e;
			});
			callback(err, questions);
		});
	}
	else{
		//如果是编辑试卷，获取该试卷中的试题，标记checked
		this.get(id, function(err, paper){
			var questionIds = paper.questionIds;
			Question.list(function(err, questions){
				questions.forEach(function(e, index){
					e = e.toObject();
					if(questionIds.indexOf(e.id)>-1){
						e.checked = true;
					}
					else{
						e.checked = false;	
					}
					questions[index] = e;
				});
				callback(err, questions);
			});
		})
	}

}

module.exports = new PaperDAO();