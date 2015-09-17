var express = require('express');
var app = express();
app.listen(3000);

var _rootDir = __dirname;
var protectDir = _rootDir + '/protect/';

app.use(express.static(_rootDir));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var questionController = require(protectDir + 'controllers/questionController');
var paperController = require(protectDir + 'controllers/paperController');

//注册路由
app.get('/', function(req, res){
    res.sendFile(_rootDir+'/src/index.html');
});
app.post('/api/getQuestion', questionController.getQuestion);
app.post('/api/getQuestions', questionController.getQuestions);
app.post('/api/submitQuestion', questionController.save);
app.post('/api/updateQuestion', questionController.update);
app.post('/api/removeQuestion', questionController.remove);

app.post('/api/getPapers', paperController.getPapers);
app.post('/api/getPaper', paperController.getPaper);
app.post('/api/getPaperQuestions', paperController.getPaperQuestions);
app.post('/api/submitPaper', paperController.save);
app.post('/api/updatePaper', paperController.update);
app.post('/api/removePaper', paperController.remove);

app.use(function(req, res, next) {
	res.status(404).sendFile(_rootDir+'/src/404.html');
});
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('500 Error');
});