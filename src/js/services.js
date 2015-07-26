app
.service('QuestionService', ['$http', function($http){
	//提交
	this.submit = function(formData){
		return $http.post('/api/submitQuestion', formData);
	}

    //根据id获取试题信息
	this.getQuestion = function(id){
        return $http.post('/api/getQuestion', {id: id});
	}

    //获取试题列表
    this.getQuestions = function(){
        return $http.post('/api/getQuestions');
    }
}]);