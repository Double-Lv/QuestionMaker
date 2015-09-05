/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/src/tpl/home.html'
        })
        .state('questionList', {
            url: '/questionList',
            templateUrl: '/src/tpl/questionList.html',
            controller: 'questionListCtrl'
        })
        .state('questionEdit', {
            url: '/questionEdit/id/:id',
            templateUrl: '/src/tpl/questionEdit.html',
            controller: 'questionCtrl'
        })
        .state('questionEdit.choice', {
            url: '/type/choice',
            views: {
                'editArea': {
                    templateUrl: '/src/tpl/choice.html'
                },
                'previewArea': {
                    templateUrl: '/src/tpl/choiceView.html'
                }
            }
        })
        .state('questionEdit.block', {
            url: '/type/block',
            views: {
                'editArea': {
                    templateUrl: '/src/tpl/block.html',
                },
                'previewArea': {
                    templateUrl: '/src/tpl/blockView.html'
                }
            }
        })
        .state('paperList', {
            url: '/paperList',
            templateUrl: '/src/tpl/paperList.html',
            controller: 'paperListCtrl'
        })
        .state('paperEdit', {
            url: '/paperEdit/id/:id',
            templateUrl: '/src/tpl/paperEdit.html',
            controller: 'paperCtrl'
        })
        .state('paperEdit.preview', {
            url: '/',
            views: {
                'choicePreview': {
                    templateUrl: '/src/tpl/choiceView.html',
                },
                'blockPreview': {
                    templateUrl: '/src/tpl/blockView.html'
                }
            }
        })
        .state('paperPreview', {
            url: '/paperPreview/id/:id',
            templateUrl: '/src/tpl/paperPreview.html',
            controller: 'paperPreviewCtrl'
        })
        .state('paperPreview.preview', {
            url:'/',
            views: {
                'choicePreview': {
                    templateUrl: '/src/tpl/choiceView.html',
                },
                'blockPreview': {
                    templateUrl: '/src/tpl/blockView.html'
                }
            }
        });
});
