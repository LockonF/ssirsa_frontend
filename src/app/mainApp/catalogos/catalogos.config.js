(function() {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider,$translatePartialLoaderProvider) {
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
            .state('triangular.admin-default.proyectos',{
                url:'/proyectos',
                templateUrl:'app/mainApp/catalogos/proyectos/proyectos.tmpl.html',
                controller:'proyectosController',
                controllerAs:'vm'
            });

    }
})();

