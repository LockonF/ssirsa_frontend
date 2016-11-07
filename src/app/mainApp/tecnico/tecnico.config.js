/**
 * Created by Emmanuel on 05/06/2016.
 */
(function () {
    angular
        .module('app.mainApp.tecnico')
        .config(moduleConfig);

    function moduleConfig($stateProvider, $translatePartialLoaderProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/tecnico');
        $stateProvider
            .state('triangular.admin-default.tecnico', {
                url: '/tecnico',
                data: {
                    roles: ['Administrador', 'Tecnico A', 'Tecnico B', 'Tecnico C', 'Tecnico D', 'Tecnico E']
                },
                templateUrl: 'app/mainApp/tecnico/inicio/tecnico.tmpl.html',
                controller: 'tecnicoController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.checklist', {
                url: '/checklist',
                data: {
                    roles: ['Administrador', 'Tecnico A', 'Tecnico B', 'Tecnico C', 'Tecnico D', 'Tecnico E']
                },
                templateUrl: 'app/mainApp/tecnico/checklist/checklist.tmpl.html',
                controller: 'checklistController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.diagnostic', {
                url: '/diagnostic',
                data: {
                    roles: ['Administrador', 'Tecnico A', 'Tecnico B', 'Tecnico C', 'Tecnico D', 'Tecnico E']
                },
                templateUrl: 'app/mainApp/tecnico/diagnostic/diagnostic.tpl.html',
                controller: 'DiagnosticController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.etapa', {
                url: '/etapa',
                data: {
                    roles: ['Administrador', 'Tecnico A', 'Tecnico B', 'Tecnico C', 'Tecnico D', 'Tecnico E']
                },
                templateUrl: 'app/mainApp/tecnico/etapa/etapa.tmpl.html',
                controller: 'etapaController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.asignacionLinea', {
                url: '/asignacionLinea',
                data: {
                    roles: ['Administrador', 'Tecnico A', 'Tecnico B', 'Tecnico C', 'Tecnico D', 'Tecnico E']
                },
                templateUrl: 'app/mainApp/tecnico/asignacion/asignacionLinea.tmpl.html',
                controller: 'asignacionLineaController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.entrada', {
                url: '/entrada',
                data: {
                    roles: ['Administrador', 'Tecnico A', 'Tecnico B', 'Tecnico C', 'Tecnico D', 'Tecnico E']
                },
                templateUrl: 'app/mainApp/tecnico/entrada/entrada.tmpl.html',
                controller: 'entradaController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.salida', {
                url: '/salida',
                data: {
                    roles: ['Administrador', 'Tecnico A', 'Tecnico B', 'Tecnico C', 'Tecnico D', 'Tecnico E']
                },
                templateUrl: 'app/mainApp/tecnico/salida/salida.tmpl.html',
                controller: 'salidaController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.puntoVenta', {
                url: '/puntoVenta',
                data: {
                    roles: ['Administrador', 'Tecnico A', 'Tecnico B', 'Tecnico C', 'Tecnico D', 'Tecnico E']
                },
                templateUrl: 'app/mainApp/tecnico/PuntoDeVenta/puntoVenta.tmpl.html',
                controller: 'PuntoVentaController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.remision', {
                url: '/remision',
                data: {
                    roles: ['Administrador', 'Tecnico A', 'Tecnico B', 'Tecnico C', 'Tecnico D', 'Tecnico E']
                },
                templateUrl: 'app/mainApp/tecnico/remision/remision.tmpl.html',
                controller: 'remisionController',
                controllerAs: 'vm'
            });

    }
})();
