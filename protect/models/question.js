var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
/*var MovieSchema = new Schema({
	name : String,
	alias : [String],
	publish : Date,
	create_date : { type: Date, default: Date.now},
	images :{
		coverSmall:String,
		coverBig:String,
	},
	source :[{
		source:String,
		link:String,
		swfLink:String,
		quality:String,
		version:String,
		lang:String,
		subtitle:String,
		create_date : { type: Date, default: Date.now }
	}]
});
var Movie = mongodb.mongoose.model("Movie", MovieSchema);
var MovieDAO = function(){};*/

var CounterSchema = new Schema({
	_id: String,
	seq: Number
});
CounterSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

var Counter = mongodb.mongoose.model("Counter", CounterSchema);

function getNextSequence(name) {
	Counter.findAndModify({ _id: name }, [], { $inc: { seq: 1 } }, {}, function (err, counter) {
		if (err) throw err;
		console.log('updated, counter is ' + counter.seq);
	});
	// var ret = Counter.findAndModify(
	// 	{
	// 	query: { _id: name },
	// 	update: { $inc: { seq: 1 } },
	// 	new: true
	// 	}
	// );

	// return ret.seq;
}

var QuestionSchema = new Schema({
	id: String,
    qtype: String,
    name: String,
    content: String,
    options: [
        {
            name: String
        }
    ],
    answer: String
});
var Question = mongodb.mongoose.model("Question", QuestionSchema);

var QuestionDAO = function(){};
//保存试题
QuestionDAO.prototype.save = function(obj, callback){
	var newId = getNextSequence('questionid');
	console.log(newId);
	return;
	var instance = new Question(obj);
	instance.save(function(err){
		callback(err);
	});
}

//获取试题列表
QuestionDAO.prototype.list = function(callback){
	Question.find(function(err, questions){
		if(questions.length){
			callback(false, questions);
		}
		else{
			callback('查找不到数据！');
		}
	})
}

module.exports = new QuestionDAO();