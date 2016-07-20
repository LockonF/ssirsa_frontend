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
            .state('triangular.admin-default.checklist',{
                url:'/checklist',
                templateUrl:'app/mainApp/tecnico/checklist.tmpl.html',
                controller:'checklistController',
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
        triMenuProvider.addMenu({
            name: 'Servicios',
            icon: 'fa fa-wrench',
            type: 'dropdown',
            priority: 4.1,
            children: [{
                name: 'Inicio',
                state: 'triangular.admin-default.tecnico',
                type: 'link'
            },
                {
                    name: 'Validar Etapa',
                    state: 'triangular.admin-default.validarEtapa',
                    type: 'link'
                },
                {
                    name: 'Registro Etapa',
                    state: 'triangular.admin-default.etapa',
                    type: 'link'
                },
                {
                    name: 'Checklist',
                    state: 'triangular.admin-default.checklist',
                    type: 'link'
                },
            ]

        });
    }
})();