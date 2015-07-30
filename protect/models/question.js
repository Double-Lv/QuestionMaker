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
QuestionDAO.prototype.save = function(obj, callback){
	var instance = new Question(obj);
	instance.save(function(err){
		console.log(arguments)
		callback(err);
	});
}
module.exports = new QuestionDAO();