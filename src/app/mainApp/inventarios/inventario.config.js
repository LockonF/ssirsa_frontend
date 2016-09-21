/**
 * Created by franciscojaviercerdamartinez on 20/07/16.
 */
(function () {
    'use strict';
    angular
        .module('app.mainApp.inventario')
        .config(moduleConfig);

    function moduleConfig($stateProvider, triMenuProvider){
        $stateProvider
            .state('triangular.admin-default.cabinets', { //Nombre del state
                url: '/cabinets', //Nombre que quiero en mi url
                data: {
                    roles: ['Administrador','Capturista']
                },
                templateUrl: 'app/mainApp/inventarios/cabinet.tmpl.html', //Dirección del archivo a usar
                controller: 'cabinetController', //nombre del controlador
                controllerAs: 'vm' //se renombra al scope
            })
            .state('triangular.admin-default.insumos', { //Nombre del state
                url: '/insumos', //Nombre que quiero en mi url
                data: {
                    roles: ['Administrador','Capturista']
                },
                templateUrl: 'app/mainApp/inventarios/insumo.tmpl.html', //Dirección del archivo a usar
                controller: 'insumoController', //nombre del controlador
                controllerAs: 'vm' //se renombra al scope
            })
            .state('triangular.admin-default.catalogoInsumos', { //Nombre del state
                url: '/catalogoInsumo', //Nombre que quiero en mi url
                data: {
                    roles: ['Administrador']
                },
                templateUrl: 'app/mainApp/inventarios/catalogoInsumo.tmpl.html', //Dirección del archivo a usar
                controller: 'catalogoInsumoController', //nombre del controlador
                controllerAs: 'vm' //se renombra al scope
            })
            .state('triangular.admin-default.construccion', { //Nombre del state
                url: '/construccion', //Nombre que quiero en mi url

                templateUrl: 'app/mainApp/inventarios/enConstruccion.tmpl.html', //Dirección del archivo a usar

            })

    }

} )();
