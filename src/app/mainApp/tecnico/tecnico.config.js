/**
 * Created by Emmanuel on 05/06/2016.
 */
(function () {
    angular
        .module('app.mainApp.tecnico')
        .config(moduleConfig);

    function moduleConfig($stateProvider, $translatePartialLoaderProvider){
        $translatePartialLoaderProvider.addPart('app/mainApp/tecnico');
        $stateProvider
            .state('triangular.admin-default.tecnico',{
                url:'/tecnico',
                templateUrl:'app/mainApp/tecnico/tecnico.tmpl.html',
                controller:'tecnicoController',
                controllerAs:'vm'
            })
            .state('triangular.admin-default.checklist',{
                url:'/checklist',
                templateUrl:'app/mainApp/tecnico/checklist/checklist.tmpl.html',
                controller:'checklistController',
                controllerAs:'vm'
            })
            .state('triangular.admin-default.diagnostic',{
                url:'/diagnostic',
                templateUrl:'app/mainApp/tecnico/diagnostic/diagnostic.tpl.html',
                controller:'DiagnosticController',
                controllerAs:'vm'
            })
            .state('triangular.admin-default.etapa',{
                url:'/etapa',
                templateUrl:'app/mainApp/tecnico/etapa.tmpl.html',
                controller:'etapaController',
                controllerAs:'vm'
            })
            .state('triangular.admin-default.validarEtapa',{
                url:'/validarEtapa',
                templateUrl:'app/mainApp/tecnico/validarEtapa.tmpl.html',
                controller:'validarEtapaController',
                controllerAs:'vm'
            })
            .state('triangular.admin-default.asignacionLinea',{
                url:'/asignacionLinea',
                templateUrl:'app/mainApp/tecnico/asignacionLinea.tmpl.html',
                controller:'asignacionLineaController',
                controllerAs:'vm'
            });
    }
})();
