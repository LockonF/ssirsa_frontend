/**
 * Created by franciscojaviercerdamartinez on 07/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('checklistController', checklistController);

    function checklistController(Cabinet, ModeloCabinet,toastr,Translate,Helper,Upload,SERVER,OAuthToken) {
        var vm = this;
        vm.diagnostico = {};

        vm.status = 'idle';  // idle | uploading | complete
        vm.guardar = guardar;
        vm.searchCabinet = searchCabinet;
        vm.selectionFile=selectionFile;
        activate();
        vm.diagnostico = {
            tipo: null,
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
            foto: null,
            fecha:moment().format('YYYY-MM-DD'),
            tipo_insumo: null,
            cabinet_entrada_salida: 4
        };

        function guardar() {
            vm.status = 'uploading';
            vm.diagnostico.foto=vm.picFile;
            vm.diagnostico.tipo_insumo=vm.diagnostico.tipo_insumo==true?'cabinet':'bicicleta';
            vm.diagnostico.tipo=vm.diagnostico.tipo==true?'salida':'entrada';
            Upload.upload({
                url: SERVER.URL+'diagnostico_cabinet',
                headers: {'Authorization': OAuthToken.getAuthorizationHeader()},
                method: 'POST',
                data: vm.diagnostico
            }).then(function (res) {
                vm.status = 'complete';
                toastr.success(vm.successCreateMessage, vm.successTitle);
            }, function (resp) {
                vm.status = 'idle';
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
            vm.notFoundMessage = Translate.translate('MAIN.MSG.NOT_FOUND  ');
            vm.errorTypeFile = Translate.translate('MAIN.MSG.ERORR_TYPE_FILE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
        }

        function searchCabinet() {
            Cabinet.get(vm.cabinet).then(function (res) {
                ModeloCabinet.get(res.modelo).then(function (res) {
                    vm.cabinets=res;
                }).catch(function (res) {
                    switch (res.status) {
                        case 404:
                            toastr.info(vm.notFoundMessage, vm.errorTitle);
                            break;
                        case 500:
                            toastr.warning(vm.errorMessage, vm.errorTitle);
                            break;
                    }
                });
            }).catch(function (res) {
                switch (res.status) {
                    case 404:
                        toastr.info(vm.notFoundMessage, vm.errorTitle);
                        break;
                    case 500:
                        toastr.warning(vm.errorMessage, vm.errorTitle);
                        break;
                }
            });
        }


    }


})();
