var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/QuestionMaker');
console.log(111)
exports.mongoose = mongoose;