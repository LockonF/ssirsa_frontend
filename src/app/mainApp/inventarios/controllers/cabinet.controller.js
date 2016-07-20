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
            marca:2

        };

    }


})();