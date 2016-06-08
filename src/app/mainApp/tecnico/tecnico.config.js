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
                    name: 'Registro Etapa',
                    state: 'triangular.admin-default.etapaSolicitud',
                    type: 'link'
                },
            ]

        });
    }
})();