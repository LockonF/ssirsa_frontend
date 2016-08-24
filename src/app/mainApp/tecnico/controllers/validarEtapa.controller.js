/**
 * Created by franciscojaviercerdamartinez on 12/07/16.
 */
/*
* Modified by platae93
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('validarEtapaController', validarEtapaController);

    function validarEtapaController(Servicios) {
        var vm = this;
        vm.validate=validate;
        vm.lookup=lookup;

        vm.idCabinet;

        //fecha_realizacion: "2016-08-11T04:05:30.111922Z",
        //property.format('YYYY-MM-DD')
        //{{1288323623006 | date:"MM/dd/yyyy 'at' h:mma"}}

        vm.etapa = {
            id: "",
            fecha_realizacion: "",
            validado: false,
            siguiente_etapa: "",
            actual_etapa: "",
            diagnostico:"" ,
            usuario: ""
        };

        vm.etapas = [
            {
                id:"E1",
                    value:"Etapa 1"
            },
            {
                id:"E2",
                    value:"Etapa 2"
            },
            {
                id:"E3",
                    value:"Etapa 3"
            },
            {
                id:"E4",
                    value:"Etapa 4"
            },
            {
                id:"E5",
                    value:"Etapa 5"
            },
            {
                id:"E6",
                    value:"Etapa 6"
            }
        ];

        vm.insumo = {
            id: "",
            nombre: "",
            cantidad: "",
            notas: ""
        };


        function validate(){
            Servicios.editarEtapaServicio(vm.etapa);
        }
        
        function lookup(){
            Servicios.getEtapaValidable(vm.idCabinet);
        }


    }
})();