/**
 * Created by franciscojaviercerdamartinez on 07/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('checklistController', checklistController);

    function checklistController(Cabinet, ModeloCabinet,toastr,Translate,Helper,Upload,EnvironmentConfig,OAuthToken,MarcaCabinet,EntradaSalida) {
        var vm = this;
        vm.diagnostico = {};
        vm.cabinets=null;
        vm.status = 'idle';  // idle | uploading | complete
        vm.guardar = guardar;
        vm.searchCabinet = searchCabinet;
        vm.selectionFile=selectionFile;
        activate();
        var diagnostico = {
            tipo: 'entrada',
            rodajas: null,
            canastillas: null,
            puertas: null,
            rejillas: null,
            sticker: false,
            pintura: false,
            lavado: false,
            emplayado: false,
            lubricacion: false,
            listo_mercado: false,
            fecha:moment().format('YYYY-MM-DD'),
            tipo_insumo: 'bicicleta',
            cabinet_entrada_salida: null
        };
        vm.diagnostico=angular.copy(diagnostico);

        function guardar() {
            vm.status = 'uploading';
            if(vm.picFile!=null) {
                vm.diagnostico.foto = vm.picFile;
            }
            vm.diagnostico.tipo_insumo=vm.diagnostico.isCabinet==true?'cabinet':'bicicleta';
            vm.diagnostico.tipo=vm.diagnostico.isSalida==true?'salida':'entrada';
            console.log(vm.diagnostico);
            Upload.upload({
                url: EnvironmentConfig.site.rest.api+'diagnostico_cabinet',
                headers: {'Authorization': OAuthToken.getAuthorizationHeader()},
                method: 'POST',
                data: vm.diagnostico
            }).then(function (res) {
                vm.status = 'idle';
                vm.cabinet=null;
                vm.picFile=null;
                vm.statusReady=0;
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.diagnostico=angular.copy(diagnostico);
            }, function (resp) {
                vm.status = 'idle';
                console.log(resp);
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }
        function selectionFile($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn=file.name.split(".").pop();
                if(file.size/1000000>1) {
                    toastr.warning(vm.errorSize, vm.errorTitle);
                    vm.picFile = null

                }else if (!Helper.acceptFile(file.type))  {
                    if (!Helper.acceptFile(extn))  {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.picFile = null;
                    }
                }
            }

        }
        function activate() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.SUCCESS_TICKET_MESSAGE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.notFoundMessage = Translate.translate('MAIN.MSG.NOT_FOUND');
            vm.notFoundInput=Translate.translate('MAIN.MSG.NOT_FOUND_INPUT');
            vm.errorTypeFile = Translate.translate('MAIN.MSG.ERORR_TYPE_FILE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
        }

        function searchCabinet() {
            Cabinet.get(vm.cabinet).then(function (res) {
                ModeloCabinet.get(res.modelo).then(function (res) {
                    vm.cabinets=res;
                    EntradaSalida.getLastEntradaByCabinet(vm.cabinet).then(function (res) {
                        vm.statusReady=1;
                        vm.diagnostico.cabinet_entrada_salida=res.id;
                    }).catch(function (res) {

                        if(res.status==404){
                            vm.statusReady=0;//NO listo
                            toastr.info(vm.notFoundInput, vm.errorTitle);
                        }
                    });
                    MarcaCabinet.get(vm.cabinets.marca).then(function (res) {
                        vm.marca=res.descripcion;
                    }).catch(function (res) {
                        notifyError(res.status);
                    })

                }).catch(function (res) {
                    notifyError(res.status);
                });
            }).catch(function (res) {
                 notifyError(res.status);
            });
        }

        function notifyError(status) {
            switch (status) {
                case 404:
                    toastr.info(vm.notFoundMessage, vm.errorTitle);
                    break;
                case 500:
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    break;
            }
        }


    }


})();
