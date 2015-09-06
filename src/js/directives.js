//分页组件
app.directive('pagenav',function(){
	return {
		restrict: 'E',
		replace:true,
        scope:{
            page : '=pageobj',
            query : '=pagefunc'
        },
        link: function($scope, $element){
            $scope.createHtml = function(){
                var maxPage =  Math.ceil($scope.page.itemsCount/ $scope.page.pageSize) ;
                var pageNo = $scope.page.pageNo;
                var str = '<nav><ul class="pagination">' ;
                if(maxPage > 10){
                    if(pageNo > 3){//minPage + 2
                        str += '<li><a href="javascript:void(0);" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>' ;
                        str += '<li><span>...</span></li>';
                    }
                    for(var i= pageNo <=2?1:pageNo -2 ;i<= (pageNo >= maxPage-2?maxPage:pageNo +2) ;i++ ){
                        if(i == 1){
                            if(pageNo == 1){
                                str += '<li class="disabled"><a href="javascript:void(0);" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
                                str += '<li class="active"><a href="javascript:void(0);">'+i+'</a></li>' ;
                            }else{
                                str += '<li><a href="javascript:void(0);" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>' ;
                                str += '<li><a href="javascript:void(0);">'+i+'</a></li>' ;
                            }
                        }else if(i == maxPage){
                            if(pageNo == maxPage){
                                str += '<li class="active"><a>'+i+'</a></li>' ;
                                str += '<li><a href="javascript:void(0);" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
                            }else{
                                str += '<li><a href="javascript:void(0);">'+i+'</a></li>' ;
                                str += '<li><a href="javascript:void(0);" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>' ;
                            }
                        }else{
                            if(pageNo == i){
                                str += '<li class="active"><a href="javascript:void(0);">'+i+'</a></li>' ;
                            }else{
                                str += '<li><a href="javascript:void(0);">'+i+'</a></li>' ;
                            }
                        }
                    }
                    if(pageNo < maxPage - 2){
                        str += '<li><span>...</span></li>';
                        str += '<li><a href="javascript:void(0);" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>' ;
                    }
                }else{
                    for(var i=1 ; i<=maxPage ; i++){
                        if(i == 1){
                            if(pageNo == 1){
                                str += '<li class="disabled"><a href="javascript:void(0);" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
                                str += '<li class="active"><a href="javascript:void(0);">'+i+'</a></li>' ;
                            }else{
                                str += '<li><a href="javascript:void(0);" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>' ;
                                str += '<li><a href="javascript:void(0);">'+i+'</a></li>' ;
                            }
                        }else if(i == maxPage){
                            if(pageNo == maxPage){
                                str += '<li class="active"><a href="javascript:void(0);">'+i+'</a></li>' ;
                                str += '<li class="disabled"><a href="javascript:void(0);" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
                            }else{
                                str += '<li><a href="javascript:void(0);">'+i+'</a></li>' ;
                                str += '<li><a href="javascript:void(0);" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>' ;
                            }
                        }else{
                            if(pageNo == i){
                                str += '<li class="active"><a href="javascript:void(0);">'+i+'</a></li>' ;
                            }else{
                                str += '<li><a href="javascript:void(0);">'+i+'</a></li>' ;
                            }
                        }
                    }
                }

                str += '</ul></nav>';
                $element.html(str);
                $scope.bindEvent();
            };
            $scope.bindEvent = function(){
                $element.find('a').on('click', function(){
                	var direction = $(this).attr('aria-label');
                    var text = $(this).text();
                    var li = $(this).closest('li');
                    var pageNo = $scope.page.pageNo;
                    if(direction == 'Previous'){
                    	if(!li.hasClass('disabled')){
                    		$scope.page.pageNo = pageNo - 1;	
                    	}
                    	else{
                    		return;
                    	}
                    }else if(direction == 'Next'){
                    	if(!li.hasClass('disabled')){
                        	$scope.page.pageNo = pageNo + 1;
                        }
                        else{
                        	return;
                        }
                    }else{
                        $scope.page.pageNo = parseInt(text);
                    }
                    $scope.query();
                    $scope.createHtml();
                });
            }
            $scope.createHtml();
            $scope.$watch('page.itemsCount', function(){
                $scope.createHtml();
            })
        }
	}
});