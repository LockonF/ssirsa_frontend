/**
 * Created by franciscojaviercerdamartinez on 19/07/16.
 */
(function(){
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('asignacionLineaController', asignacionLineaController);

    function asignacionLineaController() {
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

    }


})();