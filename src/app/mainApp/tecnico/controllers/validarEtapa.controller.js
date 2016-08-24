/**
 * Created by franciscojaviercerdamartinez on 12/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('validarEtapaController', validarEtapaController);

    function validarEtapaController() {
        var vm = this;

        vm.etapatest = {
            idCabinet: "",
            noServicio: "",
            isValidated: false,
            etapaActual: "",
            siguienteEtapa: "",
            insumos: []
        };

        vm.etapa = {
            id: 3,
            fecha_realizacion: "2016-08-11T04:05:30.111922Z",
            validado: false,
            siguiente_etapa: "E5",
            actual_etapa: "E4",
            diagnostico: 1,
            usuario: 1
        };

        vm.etapas = {
            "E1":"Etapa 1",
            "E2":"Etapa 2",
            "E3":"Etapa 3",
            "E4":"Etapa 4",
            "E5":"Etapa 5"
        };

        vm.guardar=guardar;
        vm.buscar=buscar;

        function buscar(){


            vm.etapa = {
                idCabinet: "34124142112443",
                noServicio: "234567812212",
                isValidated: false,
                etapaActual: 1,
                siguienteEtapa: 2,
                fecha:"19/07/2016",
                insumos: [{
                    id: "1",
                    nombre: "Carburador",
                    cantidad: "1",
                    notas: "no de serie 32245345543"
                },{
                    id: "2",
                    nombre: "Aceite",
                    cantidad: "2",
                    notas: "Litros de viscosidad .7"
                }]

            };


        }
        
        function guardar(){
            vm.etapa = {
                idCabinet: "",
                noServicio: "",
                isValidated: false,
                etapaActual: "",
                siguienteEtapa: "",
                insumos: []

            };


        }
        vm.insumo = {
            id: "",
            nombre: "",
            cantidad: "",
            notas: ""
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
        vm.insumos = [{
            id: '1',
            nombre: 'Carburador',
        }, {
            id: '2',
            nombre: 'aceite',
        }, {
            id: '3',
            nombre: 'tornillos de 1/4"',
        }, {
            id: '4',
            nombre: 'soldadura',
        }, {
            id: '5',
            nombre: 'alambre 1/4',
        }

        ];
        vm.crearInsumo = crearInsumo;
        vm.eliminarInsumo = eliminarInsumo;
        // Crear insumo

        function crearInsumo() {

            console.log(vm.insumo)
            if (vm.insumo != null) {
                console.log("insumos antes de agregarlo");
                console.log(vm.etapa.insumos);
                vm.etapa.insumos.push(vm.insumo);
                console.log("insumos despues de agregarlo");
                console.log(vm.etapa.insumos);

                vm.insumo = {
                    id: "",
                    nombre: "",
                    cantidad: 0,
                    notas: ""
                };

                console.log("Los insumos son:");
                console.log(vm.etapa.insumos);
            }
        }

        // Eliminar Insumo


        function eliminarInsumo(insu) {

            vm.insumocopy = insu;
            var index = 0;

            for (index = 0; index < vm.etapa.insumos.length; ++index) {

                console.log(vm.insumocopy);
                console.log(vm.etapa.insumos[index]);
                if (vm.etapa.insumos[index].id == vm.insumocopy.id) {

                    console.log("voy a borrar");
                    console.log(vm.etapa.insumos[index]);
                    vm.etapa.insumos.splice(index, 1);

                }
                else {
                    console.log("Aun no lo encuentro")
                }

            }

        }


    }


})();