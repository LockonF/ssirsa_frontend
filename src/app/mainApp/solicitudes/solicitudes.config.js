/**
 * Created by lockonDaniel on 6/2/16.
 */
(function () {
    angular
        .module('app.mainApp.solicitudes')
        .config(moduleConfig);

    function moduleConfig($stateProvider,$translatePartialLoaderProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/solicitudes');
        $stateProvider
            .state('triangular.admin-default.solicitudes', {
                url: '/solicitudes',
                templateUrl: 'app/mainApp/solicitudes/solicitud.tmpl.html',
                controller: 'solicitudesController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.realizarSolicitud', {
                url: '/realizarSolicitudes',
                templateUrl: 'app/mainApp/solicitudes/realizarSolicitud.tmpl.html',
                controller: 'realizarSolicitudController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.buscarSolicitud', {
                url: '/buscarSolicitud',
                templateUrl: 'app/mainApp/solicitudes/buscarSolicitud.html',
                controller: 'buscarSolicitudController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.Pruebas', {
                url: '/Pruebas',
                templateUrl: 'app/mainApp/solicitudes/Pruebas.html',
                controller: 'Prueba',
                controllerAs: 'vm'
            }).state('triangular.admin-default.calendar', {
            url: '/calendar',
            templateUrl: 'app/mainApp/solicitudes/calendar/calendar.tmpl.html',
            controller: 'CalendarController',
            controllerAs: 'vm'
        });

    }


})();
