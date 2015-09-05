app
.service('QuestionService', ['$http', function($http){
	//提交
	this.submit = function(formData){
		return $http.post('/api/submitQuestion', {question: formData});
	}

    //根据id获取试题信息
	this.getQuestion = function(id){
        return $http.post('/api/getQuestion', {id: id});
	}

    //获取试题列表
    this.getQuestions = function(){
        return $http.post('/api/getQuestions');
    }

    //编辑
    this.update = function(formData){
		return $http.post('/api/updateQuestion', {question: formData});
	}

	//删除
	this.remove = function(id){
		return $http.post('/api/removeQuestion', {id: id});
	}
}])
.service('PaperService', ['$http', function($http){
	//获取试卷列表
	this.getPapers = function(){
		return $http.post('/api/getPapers');
	}

	//根据id获取试卷
	this.getPaper = function(id){
		return $http.post('/api/getPaper', {id: id});
	}

	//获取该试卷中的试题列表
	this.getQuestions = function(id){
		return $http.post('/api/getPaperQuestions', {id: id});
	}

	//提交试卷
	this.submit = function(formData){
		return $http.post('/api/submitPaper', {paper: formData});	
	}

	//编辑
    this.update = function(formData){
		return $http.post('/api/updatePaper', {paper: formData});
	}

	//删除
	this.remove = function(id){
		return $http.post('/api/removePaper', {id: id});
	}

}]);