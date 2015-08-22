var express = require('express');
var app = express();

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
 
app.listen(3000);

var _rootDir = '/wamp/www/QuestionMaker';

app.use(express.static(_rootDir));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var questionController = require('./controllers/questionController');


app.get('/index', function(req, res){
	res.sendFile(_rootDir+'/src/index.html');
});

app.post('/api/getQuestion', function(req, res){
	console.log(req.body);
	var result = {
        id: 2,
        qtype: 1,
        name: '一年级英语选择题',
        content: '题目的题干：请选择一个你认为正确的：',
        options: [
            {
                name: '选项a的内容'
            },
            {
                name: '选项b的内容'
            }
        ],
        answer: 1
    };
	res.json(result);
});

app.post('/api/getQuestions', questionController.getQuestions);

app.post('/api/submitQuestion', questionController.save);
