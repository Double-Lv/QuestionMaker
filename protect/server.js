var express = require('express');
var app = express();

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
 
app.listen(3000);

var _rootDir = '/wamp/www/QuestionMaker';
//var _rootDir = '/QuestionMaker';

app.use(express.static(_rootDir));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var questionController = require('./controllers/questionController');


app.get('/index', function(req, res){
	res.sendFile(_rootDir+'/src/index.html');
});

app.post('/api/getQuestion', questionController.getQuestion);

app.post('/api/getQuestions', questionController.getQuestions);

app.post('/api/submitQuestion', questionController.save);

app.post('/api/updateQuestion', questionController.update);

app.post('/api/removeQuestion', questionController.remove);

