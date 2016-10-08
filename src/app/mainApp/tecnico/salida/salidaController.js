/**
 * Created by Emmanuel on 29/08/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('salidaController', salidaController);

    function salidaController(EntradaSalida, EnvironmentConfig, OAuthToken, Upload, Helper, Translate, toastr, Sucursal, udn, Proyectos, TipoTransporte, $scope, LineaTransporte) {
        var vm = this;
        vm.guardar = guardar;
        vm.selectionFile = selectionFile;
        vm.selectionImage = selectionImage;
        vm.showMassiveUpload = showMassiveUpload;
        vm.showManualUpload = showManualUpload;
        vm.cabinetSearch = cabinetSearch;
        vm.nextTab = nextTab;
        vm.clear = clear;
        vm.appendCabinet = appendCabinet;


        activate();

        vm.selectedTab = 0;
        vm.idEntrada = null;

        //Visualizations
        vm.hideEntrada = false;
        vm.hideSalida = true;
        vm.hideMassiveUpload = true;
        vm.hideManualUpload = true;
        vm.hideRegisteredCabinets = true;
        vm.hideUnregisteredCabinets = true;
        vm.manualInput = false;
        vm.selectedCabinets = [];

        //Models

        vm.cabinets = null;

        var salida = {
            "id": null,
            "fecha": "",
            "nombre_chofer": "",
            "ife_chofer": "",
            "pedimento": "",
            "accion": "entrada",
            "linea_transporte": "",
            "proyecto": "",
            "sucursal": "",
            "tipo_transporte": "",
            "udn": null,
            "file": null,

            "creados": null,
            "no_creados": null,
            "cabinets": null
        };
        vm.salida = angular.copy(salida);

        //Functions
        function guardar() {
            vm.salida.fecha = moment().format("YYYY-MM-DD");

            var fd = new FormData();

            fd.append('accion', 'salida');
            fd.append('fecha', vm.salida.fecha);
            fd.append('pedimento', vm.salida.pedimento);
            fd.append('nombre_chofer', vm.salida.nombre_chofer);
            fd.append('linea_transporte', vm.salida.linea_transporte);
            fd.append('proyecto', vm.salida.proyecto);
            fd.append('sucursal', vm.salida.sucursal);
            fd.append('tipo_transporte', vm.salida.tipo_transporte);
            fd.append('udn', vm.salida.udn);
            var cabinet = [{
                economico: "10"
            }, {
                economico: "9"
            }];

            if (vm.salida.id != null)
                fd.append("id", vm.salida.id);

            vm.salida.cabinets = cabinet;
            fd.append('cabinets', JSON.stringify(cabinet));
            if (vm.salida.ife_chofer != null)
                fd.append('ife_chofer', vm.salida.ife_chofer);
            //Is massive upload
            if (vm.salida.file != null) {
                fd.append('file', vm.salida.file);
                EntradaSalida.postSalidaMasiva(fd).then(function (res) {
                    vm.hideRegisteredCabinets = false;
                    vm.hideUnregisteredCabinets = true;
                    vm.salida.creados = res.creados;
                    toastr.success(vm.successMassive, vm.successTitle);
                }).catch(function (err) {
                    vm.hideUnregisteredCabinets = false;
                    vm.hideRegisteredCabinets = true;
                    if (err.status == 400) {
                        toastr.error(vm.errorMassive, vm.errorTitle);
                        vm.salida.no_creados = err.data;
                    } else {
                        toastr.error(vm.errorMessage, vm.errorTitle);
                    }
                });
            }
            else {
                EntradaSalida.postEntrada(fd).then(function (res) {
                    console.log(res);
                    toastr.success(vm.successMessage, vm.successTitle);
                }).catch(function (err) {
                    console.log(err);
                    toastr.error(vm.errorMessage, vm.errorTitle);
                });
            }

        }

        function selectionImage($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn = file.name.split(".").pop();
                if (file.size / 1000000 > 1) {
                    vm.salida.ife_chofer = null;
                    toastr.warning(vm.errorSize, vm.errorTitle);
                } else if (!Helper.acceptFile(file.type)) {
                    if (!Helper.acceptFile(extn)) {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.salida.ife_chofer = null;
                    }
                }
            }
        }

        function selectionFile($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn = file.name.split(".").pop();
                if (file.size / 1000000 > 10) {
                    vm.salida.file = null;
                    toastr.warning(vm.errorSizeTen, vm.errorTitle);
                } else if (!Helper.acceptFile(file.type)) {
                    if (!Helper.acceptFile(extn)) {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.salida.file = null;
                    }
                }
            }
        }

        function activate() {
            vm.lineasTransporte = LineaTransporte.list();
            vm.tiposTransporte = TipoTransporte.list();
            vm.Sucursales = Sucursal.list();
            vm.Proyectos = Proyectos.list();
            vm.udns = udn.list();
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.errorTypeFile = Translate.translate('MAIN.MSG.ERORR_TYPE_FILE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
            vm.errorSizeTen = Translate.translate('MAIN.MSG.FILE_SIZE_10');
            vm.errorMassive = Translate.translate('MAIN.MSG.ERROR_MASSIVE');
            vm.successMassive = Translate.translate('MAIN.MSG.SUCCESS_MASSIVE');
            vm.successMessage = Translate.translate('MAIN.MSG.SUCCESS_MANUAL');
        }

        function showMassiveUpload() {
            vm.hideManualUpload = true;
            vm.hideMassiveUpload = false;
        }

        function clear() {
            vm.hideUnregisteredCabinets = true;
            vm.hideRegisteredCabinets = true;
            vm.salida = angular.copy(salida);
            $scope.entradaForm.$setPristine();
            $scope.entradaForm.$setUntouched();
            vm.salida.no_creados = null;
            vm.salida.creados = null;
        }

        function showManualUpload() {
            /*vm.hideManualUpload = false;
            vm.hideMassiveUpload = true;
            EntradaSalida.getCabinetsEntrada().then(function (res) {
                vm.cabinetsEntrada = res;
            });*/
        }

        function cabinetSearch(query) {

            return query ? lookup(query) : vm.cabinetsEntrada;
        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.cabinetsEntrada, function (item) {
                return item.economico.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }

        function appendCabinet(chip) {
            if (vm.selectedCabinets != null) {
                var index = _.findIndex(vm.selectedCabinets, function (obj) {
                    return obj.economico === chip.economico;
                });
                if (index != -1) {//no lo encontr
                    vm.selectedCabinets.splice(index, 1);
                }
            } else {
                vm.selectedCabinets.splice(index, 1);
            }
            return chip;
        }

        function nextTab() {
            vm.selectedTab = vm.selectedTab + 1;
        }


    }

})();
