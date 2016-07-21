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
                templateUrl: 'app/mainApp/inventarios/cabinet.tmpl.html', //Dirección del archivo a usar
                controller: 'cabinetController', //nombre del controlador
                controllerAs: 'vm' //se renombra al scope
            })
            .state('triangular.admin-default.insumo', { //Nombre del state
                url: '/insumos', //Nombre que quiero en mi url
                templateUrl: 'app/mainApp/inventarios/insumo.tmpl.html', //Dirección del archivo a usar
                controller: 'insumoController', //nombre del controlador
                controllerAs: 'vm' //se renombra al scope
            })
            .state('triangular.admin-default.construccion', { //Nombre del state
                url: '/construccion', //Nombre que quiero en mi url
                templateUrl: 'app/mainApp/inventarios/enConstruccion.tmpl.html', //Dirección del archivo a usar

            })


        triMenuProvider.addMenu({
            name: 'Inventarios',
            icon: 'fa fa-archive',
            type: 'dropdown',
            priority: 6.1,
            children: [{
                name: 'Cabinets',
                state: 'triangular.admin-default.cabinets',
                type: 'link'
            }, {
                name: 'Insumos',
                state: 'triangular.admin-default.insumo',
                type: 'link'
            },{
                name: 'Catalogo de Insumos',
                state: 'triangular.admin-default.construccion',
                type: 'link'
            }, {
                    name: 'Categoria Insumos',
                    state: 'triangular.admin-default.construccion',
                    type: 'link'
            }, {
                    name: 'Proveedores',
                    state: 'triangular.admin-default.construccion',
                    type: 'link'
                }

            ]
        });

    }

} )();
