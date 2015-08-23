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

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var Counter = mongodb.mongoose.model("Counter", CounterSchema);

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