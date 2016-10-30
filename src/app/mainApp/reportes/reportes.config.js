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
            });

    }
})();
