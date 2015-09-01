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
}]);