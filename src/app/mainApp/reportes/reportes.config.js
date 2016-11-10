/**
 * Created by Emmanuel on 16/10/2016.
 */
(function () {
    angular
        .module('app.mainApp.reportes')
        .config(moduleConfig);

    function moduleConfig($stateProvider, $translatePartialLoaderProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/reportes');
        $stateProvider
            .state('triangular.admin-default.reportes', {
                url: '/reportes',
                data: {
                    roles: ['Administrador']
                },
                templateUrl: 'app/mainApp/reportes/manager/reportesCRUD.tmpl.html',
                controller: 'ReportesCrudController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.reportModify', {
                url: '/reportesCrear/:id/',
                data: {
                    roles: ['Administrador']
                },
                params: {
                    id: null
                },
                templateUrl: 'app/mainApp/reportes/edicion/reportEdicion.tmpl.html',
                controller: 'reportEditionController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.list', {
            url: '/list',
            data: {
                roles: ['Administrador']
            },
            params: {
                id: null
            },
            templateUrl: 'app/mainApp/reportes/list/listReports.tmpl.html',
            controller: 'ListReportsController',
            controllerAs: 'vm'
        });

    }
})();
