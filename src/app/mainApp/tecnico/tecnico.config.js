/**
 * Created by Emmanuel on 05/06/2016.
 */
(function () {
    angular
        .module('app.mainApp.tecnico')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider){
        $stateProvider
            .state('triangular.admin-default.tecnico',{
                url:'/tecnico',
                templateUrl:'app/mainApp/tecnico/tecnico.tmpl.html',
                controller:'tecnicoController',
                controllerAs:'vm'

            })

    }
})();