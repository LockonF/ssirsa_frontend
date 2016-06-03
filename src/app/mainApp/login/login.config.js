/**
 * Created by Emmanuel on 02/06/2016.
 */
(function () {
    angular
        .module('app.mainApp.login')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider){
        $stateProvider
            .state('login',{
                url:'/login',
                templateUrl:'app/mainApp/login/login.tmpl.html',
                controller:'loginController',
                controllerAs:'vm'

            })

    }

})();
