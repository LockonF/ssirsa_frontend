/**
 * Created by lockonDaniel on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .config(moduleConfig);

    function moduleConfig($stateProvider, $translatePartialLoaderProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/solicitudes');
        $stateProvider
            .state('triangular.admin-default.realizarSolicitud', {
                url: '/realizarSolicitudes',
                templateUrl: 'app/mainApp/solicitudes/solicitud/crear/realizarSolicitud.tmpl.html',
                controller: 'realizarSolicitudController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.buscarSolicitud', {
                url: '/buscarSolicitud',
                templateUrl: 'app/mainApp/solicitudes/solicitud/buscar/buscarSolicitud.html',
                controller: 'buscarSolicitudController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.calendar', {
                url: '/calendar',
                templateUrl: 'app/mainApp/solicitudes/calendario/calendar.tmpl.html',
                controller: 'CalendarController',
                controllerAs: 'vm'
            });

    }


})();
