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

        vm.etapa = {
            idCabinet: "34124142112443",
            noServicio: "234567812212",
            isValidated: true,
            etapaActual: 1,
            siguienteEtapa: 2,
            fecha: "02/07/2016",
            insumos: []

        };
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