/**
 * Created by franciscojaviercerdamartinez on 07/07/16.
 */

(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('checklistController', checklistController);

    function checklistController($mdDialog, Cabinet, $scope, ModeloCabinet, diagnosticoEtapa, cabinet, toastr, Translate, Helper, Upload, EnvironmentConfig, OAuthToken, MarcaCabinet, CabinetEntradaSalida) {
        var vm = this;
        vm.diagnostico = {};
        vm.cabinets = null;
        vm.status = 'idle';// idle | uploading | complete
        vm.cabinet = null;
        vm.guardar = guardar;
        vm.searchCabinet = searchCabinet;
        vm.selectionFile = selectionFile;
        vm.cerrarDialog = cerrarDialog;
        vm.change = change;
        activate();
        if (diagnosticoEtapa.id != null) {
            var diagnostico =_.clone(diagnosticoEtapa);
        }
        else {
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
                fecha: moment().toISOString(),
                tipo_insumo: '',
                cabinet_entrada_salida: null
            };
            diagnostico=diagnosticoEtapa;
            vm.diagnostico=diagnosticoEtapa;
        }
        vm.diagnostico = angular.copy(diagnostico);
        function change() {
        }

        function guardar() {
            vm.status = 'uploading';
            if (vm.diagnostico.id == null) {
                if (vm.picFile != null) {
                    vm.diagnostico.foto = vm.picFile;
                }
                vm.diagnostico.tipo_insumo = vm.diagnostico.isCabinet == true ? 'cabinet' : 'bicicleta';
                vm.diagnostico.tipo = vm.diagnostico.isSalida == true ? 'salida' : 'entrada';
                Upload.upload({
                    url: EnvironmentConfig.site.rest.api + 'diagnostico_cabinet',
                    headers: {'Authorization': OAuthToken.getAuthorizationHeader()},
                    method: 'POST',
                    data: vm.diagnostico
                }).then(function (res) {
                    vm.status = 'idle';
                    vm.cabinet = null;
                    vm.picFile = null;
                    vm.statusReady = 0;

                    clear();

                    toastr.success(vm.successCreateMessage, vm.successTitle);
                    vm.diagnostico = angular.copy(diagnostico);
                    cerrarDialog();
                }, function (resp) {
                    vm.status = 'idle';
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    cerrarDialog();
                });
            }
            else {
                if (vm.picFile != null) {
                    vm.diagnostico.foto = vm.picFile;
                }
                vm.diagnostico.tipo_insumo = vm.diagnostico.isCabinet == true ? 'cabinet' : 'bicicleta';
                vm.diagnostico.tipo = vm.diagnostico.isSalida == true ? 'salida' : 'entrada';

                Upload.upload({
                    url: EnvironmentConfig.site.rest.api + 'diagnostico_cabinet/' + vm.diagnostico.id,
                    headers: {'Authorization': OAuthToken.getAuthorizationHeader()},
                    method: 'PUT',
                    data: vm.diagnostico
                }).then(function (res) {
                    vm.status = 'idle';
                    vm.cabinet = null;
                    vm.picFile = null;
                    vm.statusReady = 0;

                    clear();

                    toastr.success(vm.successCreateMessage, vm.successTitle);
                    vm.diagnostico = angular.copy(diagnostico);
                    cerrarDialog();
                }, function (resp) {

                    vm.status = 'idle';
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                    cerrarDialog();
                });
            }
        }

        function selectionFile($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn = file.name.split(".").pop();
                if (file.size / 1000000 > 1) {
                    toastr.warning(vm.errorSize, vm.errorTitle);
                    vm.picFile = null

                } else if (!Helper.acceptFile(file.type)) {
                    if (!Helper.acceptFile(extn)) {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.picFile = null;
                    }
                }
            }

        }

        function cerrarDialog() {

            $mdDialog.cancel();
        }

        function activate() {

            if (cabinet != null) {
                vm.cabinet = cabinet;
                vm.diagnostico = diagnosticoEtapa;
                console.log("Lo que le mando desde etapa de Servicio")
                console.log(diagnosticoEtapa);
                console.log("Lo que quedo de mi objeto");
                console.log(vm.diagnostico);
                vm.searchCabinet();

            }
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.SUCCESS_TICKET_MESSAGE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.notFoundMessage = Translate.translate('MAIN.MSG.NOT_FOUND');
            vm.notFoundInput = Translate.translate('MAIN.MSG.NOT_FOUND_INPUT');
            vm.errorTypeFile = Translate.translate('MAIN.MSG.ERORR_TYPE_FILE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
            vm.errorDisabled = Translate.translate('MAIN.MSG.ERROR_DISABLED_CABINET');
        }

        function clear() {
            $scope.searchCabinetForm.$setPristine();
            $scope.searchCabinetForm.$setUntouched();
            $scope.registerForm.$setPristine();
            $scope.registerForm.$setUntouched();
        }

        function searchCabinet() {
            Cabinet.get(vm.cabinet).then(function (res) {
                if (!res.deleted) {
                    ModeloCabinet.get(res.modelo).then(function (res) {


                        vm.cabinets = res;
                        CabinetEntradaSalida.getLastEntradaByCabinet(vm.cabinet).then(function (res) {
                            vm.statusReady = 1;
                            vm.diagnostico.cabinet_entrada_salida = res.id;
                        }).catch(function (res) {
                            if (res.status == 404) {
                                vm.statusReady = 0;//NO listo
                                toastr.info(vm.notFoundInput, vm.errorTitle);
                            }
                        });
                        MarcaCabinet.get(vm.cabinets.marca).then(function (res) {
                            vm.marca = res.descripcion;
                        }).catch(function (res) {
                            notifyError(res.status);
                        })


                    }).catch(function (res) {
                        notifyError(res.status);
                    });
                } else {
                    toastr.warning(vm.errorDisabled, vm.errorTitle);
                }
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
