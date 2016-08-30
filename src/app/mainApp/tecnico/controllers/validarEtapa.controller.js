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

    function validarEtapaController(Servicios,toastr) {
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
            vm.etapa.validado=true;
            Servicios.editarEtapaServicio(vm.etapa).then(function(res){
                toastr.success('Etapa validada correctamente','Éxito')
            }).catch(function(err){
                console.log(err);
                toastr.error('Error al validar la etapa','Error')
            });
        }

        function lookup(){
            Servicios.getEtapaValidable(vm.idCabinet).then(function(res){
                vm.etapa=res;
                console.log(res);
            }).catch(function(err){
                switch (err.status){
                    case 404:
                        toastr.error('No puede validar la ultima etapa de este cabinet','Error')
                        break;
                        toastr.error(err.message,'Error');
                }
            });

            Servicios.consultarAllInsumosCabinetEtapa(vm.etapa).then(function(res){
                vm.insumo=res;
                console.log(res);
            }).catch(function(err){

            });
        }


    }
})();
