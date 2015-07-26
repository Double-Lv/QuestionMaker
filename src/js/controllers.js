app
.controller('questionListCtrl',['$scope', '$http', 'QuestionService', function($scope, $http, QuestionService) {
    $scope.title = '试题列表';
    QuestionService.getQuestions().success(function(data){
        $scope.questionList = data;
    });

    $scope.removeQuestion = function(id){
        for(var i=0; i<$scope.questionList.length; i++){
            var q = $scope.questionList[i];
            if(q.id===id){
                $scope.questionList.splice(i, 1);
                break;
            }
        }
    }
}])
.controller('questionCtrl', ['$scope', '$http', '$state', '$stateParams', '$location', 'QuestionService', '$filter', function($scope, $http, $state, $stateParams, $location, QuestionService, $filter){
    var id = $state.params.id;
    var type = $state.current.name.split('.')[1];
    var initData = function(type){
        switch(type){
            case 'choice':
                $scope.formData.qtype = 1;
                $scope.formData.options = [{}, {}, {}, {}];
                $scope.formData.answer = 0;
            break;
            case 'block':
                $scope.formData.qtype = 2;
                $scope.formData.options = null;
                $scope.formData.answer = [];

                //监听题干内容
                $scope.$watch('formData.content', function(newValue, oldValue){
                    newValue = newValue || '';
                    oldValue = oldValue || '';
                    var newBlocks = newValue.match(/\$\$/g) || [];
                    var oldBlocks = oldValue.match(/\$\$/g) || [];
                    if(newBlocks.length !== oldBlocks.length){
                        var answer = [];
                        for(var i=0; i<newBlocks.length; i++){
                            var a = $scope.formData.answer[i] || (i+1);//把旧值保持到新answer数组中
                            answer.push(a);
                        }
                        $scope.formData.answer = answer;
                    }
                });
            break;
        }
    }

    if(id!=0){
        //编辑
        //取到试题数据
        QuestionService.getQuestion(id).success(function(data){
            $scope.formData = data;
        });
        
    }
    else{
        //新建
        $scope.formData = {
            id: 0,
            name: ''
        };
        initData(type);
    }
    
    
    $scope.qtypes = [1,2];

    //删除选项
    $scope.removeOption = function(index){
        $scope.formData.options.splice(index, 1);
    }
    //添加选项
    $scope.addOption = function(){
        $scope.formData.options.push({name: ''})
    }

    //修改模板
    $scope.changeTpl = function(){
        var type = $filter('qtypestr_en')($scope.formData.qtype);
        $state.go('edit.'+type, {type: type}); //修改子路由

        initData(type);
    }

    //提交
    $scope.submit = function(){
        QuestionService.submit($scope.formData);
    }

    window.scope = $scope;
}]);
