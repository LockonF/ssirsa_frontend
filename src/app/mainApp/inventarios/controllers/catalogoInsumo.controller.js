/**
 * Created by franciscojaviercerdamartinez on 21/07/16.
 */
(function(){
    'use strict';

    angular
        .module('app.mainApp.inventario')
        .controller('catalogoInsumoController', catalogoInsumoController);

    function catalogoInsumoController() {
        var vm = this;
        vm.insumo={
            id:12345678,
            noRemision:123453575323264,
            categoria:1,
            tipo:1,
            zona:2,
            fechaAlta:'18/7/2016'
        };
        vm.tiposInsumo = [{
            id: '1',
            nombre: 'Compresor',
        }, {
            id: '2',
            nombre: 'Ventilador',
        }];
        vm.zonas = [{
            id: '1',
            nombre: 'etapa 1',
        }, {
            id: '2',
            nombre: 'etapa 2',
        }, {
            id: '3',
            nombre: 'etapa 3',
        }, {
            id: '4',
            nombre: 'etapa 4',
        }];
        vm.categorias = [{
            id: '1',
            nombre: 'Categoria1',
        }, {
            id: '2',
            nombre: 'Categoria2',
        }, {
            id: '3',
            nombre: 'Categoria3',
        }, {
            id: '4',
            nombre: 'Categoria4',
        },{
            id: '5',
            nombre: 'Categoria5',
        }];
        vm.provedores = [{
            id: '1',
            nombre: 'Proveedor 1',
        }, {
            id: '2',
            nombre: 'Proveedor 2',
        }, {
            id: '3',
            nombre: 'Proveedor 3',
        }, {
            id: '4',
            nombre: 'Proveedor 4',
        },{
            id: '5',
            nombre: 'Proveedor 5',
        }];


    }


})();