/**
 * Created by Emmanuel on 29/08/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('salidaController', salidaController);

    function salidaController(EntradaSalida, Helper,Translate,toastr, Sucursal, udn, Proyectos, TipoTransporte, LineaTransporte) {
        var vm = this;
        vm.guardar = guardar;
        vm.selectionFile = selectionFile;
        vm.selectionImage = selectionImage;
        vm.showMassiveUpload = showMassiveUpload;
        vm.showManualUpload = showManualUpload;
        vm.removeImage = removeImage;
        vm.nextTab = nextTab;
        vm.uploadFile = uploadFile;


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

        //Models

        vm.cabinets = null;
        vm.responseMassiveUpload = {
            "id": "",
            "creados": [],
            "no_creados": [],
            "modelos_no_existentes": []

        };

        vm.entrada = {
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
            "modelos_no_existentes": null

        };

        //Functions
        function guardar() {
            vm.entrada.fecha = moment().format("YYYY-MM-DD");

            var fd = new FormData();

            fd.append('accion', 'entrada');
            fd.append('fecha', vm.entrada.fecha);
            fd.append('pedimento', vm.entrada.pedimento);
            fd.append('nombre_chofer', vm.entrada.nombre_chofer);
            fd.append('linea_transporte', vm.entrada.linea_transporte);
            fd.append('proyecto', vm.entrada.proyecto);
            fd.append('sucursal', vm.entrada.sucursal);
            fd.append('tipo_transporte', vm.entrada.tipo_transporte);
            fd.append('udn', vm.entrada.udn);

            if (vm.entrada.id != null)
                fd.append("id", vm.entrada.id);
            if (vm.cabinets != null)
                fd.append('cabinets', vm.cabinets);
            if (vm.entrada.ife_chofer != null)
                fd.append('ife_chofer', vm.entrada.ife_chofer);
            //Is massive upload
            if (vm.entrada.file != null) {
                fd.append('file', vm.entrada.file);
                EntradaSalida.postEntradaMasiva(fd).then(function (res) {
                    vm.entrada = res;
                    vm.hideRegisteredCabinets = false;
                    vm.hideUnregisteredCabinets = false;
                    toastr.success('Exito en la carga masiva', 'Exito');
                }).catch(function (err) {
                    toastr.error('Error en la carga masiva', 'Error');
                    console.log(err);
                });
            }
            else {
                EntradaSalida.postEntrada(fd).then(function (res) {

                }).catch(function (err) {

                });
            }

        }

        function selectionImage($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn = file.name.split(".").pop();
                if (file.size / 1000000 > 1) {
                    vm.entrada.ife_chofer = null;
                    toastr.warning(vm.errorSize, vm.errorTitle);
                } else if (!Helper.acceptFile(file.type)) {
                    if (!Helper.acceptFile(extn)) {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.entrada.ife_chofer = null;
                    }
                }
            }
        }

        function selectionFile($files) {
            if ($files.length > 0) {
                var file = $files[0];
                var extn = file.name.split(".").pop();
                if (file.size / 1000000 > 10) {
                    vm.entrada.file = null;
                    toastr.warning(vm.errorSizeTen, vm.errorTitle);
                } else if (!Helper.acceptFile(file.type)) {
                    if (!Helper.acceptFile(extn)) {
                        toastr.warning(vm.errorTypeFile, vm.errorTitle);
                        vm.entrada.file = null;
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
        }

        function showMassiveUpload() {
            vm.hideManualUpload = true;
            vm.hideMassiveUpload = false;
        }

        function showManualUpload() {
            vm.hideManualUpload = false;
            vm.hideMassiveUpload = true;
        }

        function removeImage() {
            vm.entrada.ife_chofer = null;
        }

        function nextTab() {
            vm.selectedTab = vm.selectedTab + 1;
        }

        function uploadFile() {
            EntradaSalida.postEntradaMasiva(vm.entrada).then(function (res) {
                vm.responseMassiveUpload = res;
            }).catch(function (err) {
                console.log(err);
            });
        }

    }

})();
