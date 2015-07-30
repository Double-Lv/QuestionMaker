var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/QuestionMaker');
exports.mongoose = mongoose;