(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, $translatePartialLoaderProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/catalogos');
        $stateProvider

            .state('triangular.admin-default.linea-transporte', {
                // set the url of this page
                url: '/lineaTransporte',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/catalogos/lineaTransporte/lineaTransporte.tmpl.html',
                // set the controller to load for this page
                controller: 'LineaTransporteController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.tipo-transporte', {
                // set the url of this page
                url: '/tipoTransporte',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/catalogos/tipoTransporte/tipoTransporte.tmpl.html',
                // set the controller to load for this page
                controller: 'TipoTransporteController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.sucursal', {
                // set the url of this page
                url: '/sucursal',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/catalogos/sucursal/sucursal.tmpl.html',
                // set the controller to load for this page
                controller: 'SucursalController',
                controllerAs: 'vm'
            })
            .state('triangular.admin-default.model-cabinet', {
                // set the url of this page
                url: '/modelCabinet',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/catalogos/modeloCabinet/modeloCabinet.tmpl.html',
                // set the controller to load for this page
                controller: 'ModeloCabinetController',
                controllerAs: 'vm'
            });


    }
})();

