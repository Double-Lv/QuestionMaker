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

var apiRouter = express.Router();
apiRouter.post('/getQuestion', questionController.getQuestion);
apiRouter.post('/getQuestions', questionController.getQuestions);
apiRouter.post('/submitQuestion', questionController.save);
apiRouter.post('/updateQuestion', questionController.update);
apiRouter.post('/removeQuestion', questionController.remove);
apiRouter.post('/getPapers', paperController.getPapers);
apiRouter.post('/getPaper', paperController.getPaper);
apiRouter.post('/getPaperQuestions', paperController.getPaperQuestions);
apiRouter.post('/submitPaper', paperController.save);
apiRouter.post('/updatePaper', paperController.update);
apiRouter.post('/removePaper', paperController.remove);

app.use('/api', apiRouter);


app.use(function(req, res, next) {
	res.status(404).sendFile(_rootDir+'/src/404.html');
});
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('500 Error');
});