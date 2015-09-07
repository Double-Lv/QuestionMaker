app
.controller('questionListCtrl',['$scope', 'QuestionService', function($scope, QuestionService) {
    var getList = function(pageNo, pageSize){
        QuestionService.getQuestions(pageNo, pageSize).success(function(data){
            if(data.success){
                $scope.questionList = data.data.questions;
                //分页数据
                $scope.pageObject.itemsCount = data.data.total;
            }
            else{
                alert(data.error);
            }
        });
    }
    $scope.pageObject = {
        itemsCount: 0,
        pageSize: 3,
        pageNo: 1
    }
    $scope.pageFunction = function(){
        getList($scope.pageObject.pageNo, $scope.pageObject.pageSize);
    }
    
    getList($scope.pageObject.pageNo, $scope.pageObject.pageSize);

    //删除试题
    $scope.removeQuestion = function(id){
        QuestionService.remove(id)
        .success(function(data){
            if(data.success){
                for(var i=0; i<$scope.questionList.length; i++){
                    var q = $scope.questionList[i];
                    if(q.id===id){
                        $scope.questionList.splice(i, 1);
                        break;
                    }
                }
            }
            else{
                alert(data.error);
            }
        });
    }

    window.scope = $scope; //debug
}])
.controller('questionCtrl', ['$scope', '$rootScope', '$http', '$location', 'QuestionService', '$filter', function($scope, $rootScope, $http, $location, QuestionService, $filter){
    var id = $rootScope.$state.params.id;
    var type = $rootScope.$state.current.name.split('.')[1]; //获取到题型的名称
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
            break;
        }
    }

    //监控填空题的内容变化函数
    var subscirbeCont = function(type){
        if(type == 'block'){
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
        }
    }

    if(id!=0){
        //编辑
        //取到试题数据
        QuestionService.getQuestion(id).success(function(data){
            $scope.formData = data.data;
            //如果获取到的数据中的qtype与当前模板中的不同，则重新初始化数据
            if($filter('qtypestr_en')(data.data.qtype) != type){
                initData(type);
            }
            else{
                //需要对answer数据进行格式化
                $scope.formData.answer = data.data.answer.split(',');
            }
            
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

    //监听题干内容
    subscirbeCont(type);
    
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
        $rootScope.$state.go('questionEdit.'+type, {type: type}); //修改子路由

        initData(type);
        subscirbeCont(type);
    }

    //提交
    $scope.submit = function(){
        if(id!=0){
            QuestionService.update($scope.formData)
            .success(function(data){
                if(data.success){
                    alert('修改成功！');
                }
                else{
                    alert(data.error);
                }
            });
        }
        else{
            QuestionService.submit($scope.formData)
            .success(function(data){
                if(data.success){
                    alert('提交成功！');
                }
                else{
                    alert(data.error);
                }
            });
        }
    }

    window.scope = $scope; //debug
}])
.controller('paperListCtrl',['$scope', 'PaperService', function($scope, PaperService){
    var getList = function(pageNo, pageSize){
        PaperService.getPapers(pageNo, pageSize).success(function(data){
            if(data.success){
                $scope.paperList = data.data.papers;
                //分页数据
                $scope.pageObject.itemsCount = data.data.total;
            }
            else{
                alert(data.error);
            }
        });
    }
    $scope.pageObject = {
        itemsCount: 0,
        pageSize: 3,
        pageNo: 1
    }
    $scope.pageFunction = function(){
        getList($scope.pageObject.pageNo, $scope.pageObject.pageSize);
    }
    
    getList($scope.pageObject.pageNo, $scope.pageObject.pageSize);

    //删除试卷
    $scope.removePaper = function(id){
        PaperService.remove(id)
        .success(function(data){
            if(data.success){
                for(var i=0; i<$scope.paperList.length; i++){
                    var p = $scope.paperList[i];
                    if(p.id===id){
                        $scope.paperList.splice(i, 1);
                        break;
                    }
                }
            }
            else{
                alert(data.error);
            }
        });
    }

    window.scope = $scope; //debug
}])
.controller('paperCtrl', ['$scope', '$rootScope', '$http', '$location', 'PaperService', function($scope, $rootScope, $http, $location, PaperService){
        var id = $rootScope.$state.params.id;
        $scope.questions = [];
        //如果id=1，则为新建试卷
        if(id == 0){
            $scope.formData = {
                id: id,
                name: '',
                questionIds: []
            }
        }
        else{
            PaperService.getPaper(id).success(function(data){
                if(data.success){
                    $scope.formData = data.data;
                }
                else{
                    alert('获取试卷信息失败！');
                }
            });
        }
        
        //获取试卷中的试题列表
        PaperService.getQuestions(id).success(function(data){
            if(data.success){
                $scope.questions = data.data;
            }
            else{
                alert('加载题目失败！');
            }
        });

        $scope.submit = function(){
            $scope.formData.questionIds = [];
            $scope.questions.forEach(function(e){
                if(e.checked){
                    $scope.formData.questionIds.push(e.id);    
                }
            });

            if(id == 0){
                PaperService.submit($scope.formData).success(function(data){
                    if(data.success){
                        alert('提交成功！');
                    }
                    else{
                        alert(data.error);
                    }
                });    
            }
            else{
                PaperService.update($scope.formData).success(function(data){
                    if(data.success){
                        alert('修改成功！');
                    }
                    else{
                        alert(data.error);
                    }
                });  
            }
            
        }

        window.scope = $scope; //debug
}])
.controller('paperPreviewCtrl', ['$scope', '$rootScope', 'PaperService', function($scope, $rootScope, PaperService){
        var id = $rootScope.$state.params.id;
        $scope.questions = [];
        
        PaperService.getPaper(id).success(function(data){
            if(data.success){
                $scope.paper = data.data;
            }
            else{
                alert('获取试卷信息失败！');
            }
        });
        
        //获取试卷中的试题列表
        PaperService.getQuestions(id).success(function(data){
            if(data.success){
                $scope.questions = data.data;
            }
            else{
                alert('加载题目失败！');
            }
        });

        window.scope = $scope; //debug
}]);