/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: '/src/tpl/questionList.html',
            controller: 'questionListCtrl'
        })
        .state('edit', {
            url: '/edit/id/:id',
            templateUrl: '/src/tpl/questionEdit.html',
            controller: 'questionCtrl'
        })
        .state('edit.choice', {
            url: '/type/choice',
            templateUrl: '/src/tpl/choice.html'
        })
        .state('edit.block', {
            url: '/type/block',
            templateUrl: '/src/tpl/block.html',
        });
});
