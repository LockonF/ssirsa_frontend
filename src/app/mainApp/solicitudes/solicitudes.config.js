/**
 * Created by lockonDaniel on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider){
        $stateProvider
            .state('triangular.admin-default.solicitudes',{
            url:'/solicitudes',
            templateUrl:'app/mainApp/solicitudes/solicitud.tmpl.html',
            controller:'solicitudesController',
            controllerAs:'vm'
        })
            .state('triangular.admin-default.realizarSolicitud',{
                url:'/crearSolicitudes',
                templateUrl:'app/mainApp/solicitudes/realizarSolicitud.tmpl.html',
                controller:'solicitudesController',
                controllerAs:'vm'
            })



        triMenuProvider.addMenu({
            name: 'Solicitudes',
            icon: 'zmdi zmdi-bookmark',
            type: 'dropdown',
            priority: 4.1,
            children: [{
                name: 'Solicitudes Pendientes',
                state: 'triangular.admin-default.solicitudes',
                type: 'link'
            },{
                name: 'Crear Solicitud',
                state: 'triangular.admin-default.realizarSolicitud',
                type: 'link'
            }

            ]
        });
    }



})();