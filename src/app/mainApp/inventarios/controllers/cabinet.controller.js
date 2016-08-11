/**
 * Created by franciscojaviercerdamartinez on 20/07/16.
 */
(function(){
    'use strict';

    angular
        .module('app.mainApp.inventario')
        .controller('cabinetController', cabinetController);

    function cabinetController() {
        var vm = this;
        vm.cabinet={
            activo:true,
            status:1,
            economico:123453575323264,
            tipoEntrada:"Normal",
            noSerie:639462927220282323,
            ano:2014,
            incidencias:1,
            linea_x:4,
            linea_y:10,
            marca:2

        };
        vm.etapas = [{
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
        vm.status = [{
            id: '1',
            nombre: 'en reparacion',
        }, {
            id: '2',
            nombre: 'reparado',
        }, {
            id: '3',
            nombre: 'nuevo',
        }, {
            id: '4',
            nombre: 'averiado',
        },{
            id: '5',
            nombre: 'Obsoleto',
        }];
        vm.marcas = [{
            id: '1',
            nombre: 'General Electric',
        }, {
            id: '2',
            nombre: 'Turmix',
        }, {
            id: '3',
            nombre: 'Westpoint',
        }, {
            id: '4',
            nombre: 'Maytag',
        },{
            id: '5',
            nombre: 'Kenmore',
        }];

    }


})();