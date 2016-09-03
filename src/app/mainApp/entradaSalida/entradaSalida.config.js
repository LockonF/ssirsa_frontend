/**
 * Created by Emmanuel on 29/08/2016.
 */
(function(){
    angular
        .module('app.mainApp.entradaSalida')
        .config(moduleConfig);

    function moduleConfig($stateProvider, $translatePartialLoaderProvider){
        $translatePartialLoaderProvider.addPart('app/mainApp/entradaSalida');
        $stateProvider
            .state('triangular.admin-default.entrada',{
                url:'/entrada',
                templateUrl:'app/mainApp/entradaSalida/entrada.tmpl.html',
                controller:'entradaController',
                controllerAs:'vm'
            });
            /*
            .state('triangular.admin-default.salida',{
                url:'/salida',
                templateUrl:'app/mainApp/entradaSalida/entradaSalida.tmpl.html',
                controller:'salidaController',
                controllerAs:'vm'
            })
            */
    }
})();