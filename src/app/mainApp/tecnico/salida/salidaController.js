/**
 * Created by Adan Amezcua on 08/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('salidaController', salidaController)
        .filter('salidaSearch', salidaSearch)
        .filter('tipoequipoSearch', tipoequipoSearch);

    function salidaController(EntradaSalida,OPTIONS, ModeloCabinet,Persona, $mdDialog, TipoEquipo, Helper, Translate, toastr, Sucursal, udn, Cabinet, CabinetEntradaSalida, TipoTransporte, $scope, LineaTransporte) {
        var vm = this;
        vm.guardar = guardar;
        vm.selectionFile = selectionFile;
        vm.selectionImage = selectionImage;
        vm.showMassiveUpload = showMassiveUpload;
        vm.showManualUpload = showManualUpload;
        vm.cabinetSearch = cabinetSearch;
        vm.nextTab = nextTab;
        vm.clear = clear;
        vm.search = search;
        vm.lookupUDN = lookupUDN;
        vm.selection = selection;
        vm.changeType=changeType;
        vm.selectedItemChange=selectedItemChange;


        activate();

        vm.selectedTab = 0;
        vm.idEntrada = null;

        //Visualizations

        vm.hideMassiveUpload = true;
        vm.hideManualUpload = true;
        vm.hideRegisteredCabinets = true;
        vm.hideUnregisteredCabinets = true;
        vm.selectedCabinets = [];
        vm.loading = true;
        vm.types=OPTIONS.type_out;
        vm.isValid=false;
        vm.outputWasCorrect=false;
        //Models

        vm.cabinets = null;

        var salida = {
            "id": null,
            "fecha": "",
            "nombre_chofer": "",
            "ife_chofer": "",
            "pedimento": null,
            "accion": "entrada",
            "linea_transporte": "",
            "proyecto": null,
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
            if(vm.salida.pedimento!=null)
                fd.append('pedimento', vm.salida.pedimento);

            fd.append('nombre_chofer', vm.salida.nombre_chofer);
            fd.append('linea_transporte', vm.salida.linea_transporte);

            if(vm.salida.proyecto!=null)
                fd.append('proyecto', vm.salida.proyecto);
            fd.append('sucursal', vm.salida.sucursal);
            fd.append('tipo_transporte', vm.salida.tipo_transporte);
            fd.append('udn', vm.salida.udn.id);
            if (vm.salida.id != null)
                fd.append("id", vm.salida.id);
            if (vm.salida.ife_chofer != null && vm.salida.ife_chofer != "")
                fd.append('ife_chofer', vm.salida.ife_chofer);
            //Is massive upload
            if (vm.salida.file != null) {
                fd.append('file', vm.salida.file);
                vm.salida.no_creados = null;
                vm.salida.creados = null;
                EntradaSalida.postSalidaMasiva(fd).then(function (res) {
                    vm.hideRegisteredCabinets = false;
                    vm.hideUnregisteredCabinets = true;
                    vm.salida.creados = res.creados;
                    toastr.success(vm.successMassive, vm.successTitle);
                    vm.outputWasCorrect=true;
                }).catch(function (err) {
                    vm.hideUnregisteredCabinets = false;
                    vm.hideRegisteredCabinets = true;
                    if (err.status == 400) {
                        toastr.error(vm.errorMassive, vm.errorTitle);
                        vm.salida.no_creados = err.data;
                        vm.salida.file=null;
                    } else {
                        toastr.error(vm.errorMessage, vm.errorTitle);
                    }
                });
            }
            else {
                if (vm.selectedCabinets.length == 0) {
                    var confirm = $mdDialog.confirm()
                        .title(vm.dialogTitle)
                        .textContent(vm.dialogMessage)
                        .ariaLabel('Confirmar envío')
                        .ok(vm.submitButton)
                        .cancel(vm.cancelButton);
                    $mdDialog.show(confirm).then(function () {
                            entradaManual(fd);
                    }, function () {

                    });
                } else {
                    if(vm.selectedEntrada>=1 && vm.selectedEntrada<=3){
                        var confirms = $mdDialog.confirm()
                            .title(vm.dialogTitle)
                            .textContent(vm.dialogSureMessage)
                            .ariaLabel('Confirmar envío')
                            .ok(vm.submitButton)
                            .cancel(vm.cancelButton);
                        $mdDialog.show(confirms).then(function () {
                            entradaManual(fd);
                        }, function () {

                        });
                    }else{
                        entradaManual(fd);
                    }

                }

            }

        }
        function changeType() {
            if(!vm.hideManualUpload){
                var status=vm.types[vm.selectedEntrada].value_service;
                Cabinet.loadByStatus(status).then(function (res) {
                    vm.cabinetsEntrada = Helper.filterDeleted(res, true);
                    vm.cabinetsEntrada = _.sortBy(vm.cabinetsEntrada, 'economico');
                    vm.loading = false;
                }).catch(function(err){
                    toastr.error(vm.errorMessage,vm.errorTitle);
                });
            }
        }

        function entradaManual(fd) {

            EntradaSalida.postEntrada(fd).then(function (res) {
                var request = {
                    entrada_salida: res.id,
                    economico: vm.selectedCabinets
                };
                CabinetEntradaSalida.create(request).then(function () {
                    EntradaSalida.normalizeCabinets(res.id).then(function () {
                        toastr.success(vm.successMessage, vm.successTitle);
                        clear();
                    }).catch(function () {
                        toastr.error(vm.errorMessage, vm.errorTitle);
                    });
                }).catch(function (err) {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                });
            }).catch(function (err) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
        }

        function search(obj) {
            var tipo = _.findWhere(vm.modelos, {id: obj.modelo}).tipo;
            if (tipo != null) {
                var tiposEquipo=_.findWhere(vm.tipoEquipos, {id: tipo});
                if(tiposEquipo!=null) {
                    return tiposEquipo.nombre;
                }else{
                    return "No tiene";
                }
            } else {
                return "No tiene";
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

        function selection(cabinet) {
            var index = _.findIndex(vm.selectedCabinets, function (obj) {
                return obj.economico === cabinet.economico;
            });
            if (index > -1) {//no lo encontr
                vm.selectedCabinets.splice(index, 1);
            } else {
                vm.selectedCabinets.push({
                    economico: cabinet.economico
                });
            }
        }
        function selectedItemChange(item) {
            vm.isValid =angular.isObject(item);
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

            LineaTransporte.listObject().then(function (res) {
                vm.lineasTransporte = Helper.filterDeleted(res, true);
                vm.lineasTransporte = _.sortBy(vm.lineasTransporte, 'razon_social');
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
            TipoTransporte.listObject().then(function (res) {
                vm.tiposTransporte = Helper.filterDeleted(res, true);
                vm.tiposTransporte = _.sortBy(vm.tiposTransporte, 'descripcion');
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
            Sucursal.listObject().then(function (res) {
                vm.Sucursales = Helper.filterDeleted(res, true);
                vm.Sucursales = _.sortBy(vm.Sucursales, 'nombre');
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });

            udn.listObject().then(function (res) {
                vm.udns = Helper.filterDeleted(res, true);
                vm.udns = _.sortBy(vm.udns, 'agencia');
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
            ModeloCabinet.listWitout().then(function (res) {
                vm.modelos = Helper.filterDeleted(res, true);
            });
            TipoEquipo.listWitout().then(function (res) {
                vm.tipoEquipos =res;
                vm.tipoEquipos = _.sortBy(vm.tipoEquipos, 'nombre');
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.errorTypeFile = Translate.translate('MAIN.MSG.ERORR_TYPE_FILE');
            vm.errorSize = Translate.translate('MAIN.MSG.FILE_SIZE');
            vm.errorSizeTen = Translate.translate('MAIN.MSG.FILE_SIZE_10');
            vm.errorMassive = Translate.translate('MAIN.MSG.ERROR_MASSIVE');
            vm.successMassive = Translate.translate('MAIN.MSG.SUCCESS_MASSIVE');
            vm.successMessage = Translate.translate('MAIN.MSG.SUCCESS_MANUAL');
            vm.submitButton = Translate.translate('MAIN.BUTTONS.SUBMIT');
            vm.cancelButton = Translate.translate('MAIN.BUTTONS.CANCEL');
            vm.dialogTitle = Translate.translate('OUTPUT.FORM.DIALOG.SEND_TITLE');
            vm.dialogMessage = Translate.translate('OUTPUT.FORM.DIALOG.SEND_MESSAGE');
            vm.dialogSureMessage = Translate.translate('OUTPUT.FORM.DIALOG.SEND_INCONSISTENCE');
            Persona.listProfile().then(function(res){
                if(res.sucursal!=null){
                    vm.sucursal=res.sucursal;
                    vm.salida.sucursal=res.sucursal;
                }
            }).catch(function () {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
        }

        function showMassiveUpload() {
            vm.hideManualUpload = true;
            vm.hideMassiveUpload = false;
            vm.salida.no_creados = null;
            vm.salida.creados = null;
            vm.hideUnregisteredCabinets = true;
            vm.hideRegisteredCabinets = true;
        }

        function clear() {
            vm.hideUnregisteredCabinets = true;
            vm.hideRegisteredCabinets = true;
            vm.salida = angular.copy(salida);
            vm.salida.sucursal=vm.sucursal;
            $scope.entradaForm.$setPristine();
            $scope.entradaForm.$setUntouched();
            vm.salida.no_creados = null;
            vm.salida.creados = null;
            vm.selectedCabinets = [];
            vm.hideMassiveUpload = true;
            vm.hideManualUpload = true;
            vm.searchText=null;
            vm.selectedEntrada=0;
            vm.outputWasCorrect=false;

        }

        function showManualUpload() {
            vm.hideManualUpload = false;
            vm.hideMassiveUpload = true;
            vm.hideUnregisteredCabinets = true;
            vm.hideRegisteredCabinets = true;
            vm.loading = true;
            var status=vm.types[vm.selectedEntrada].value_service;
            Cabinet.loadByStatus(status).then(function (res) {
                vm.cabinetsEntrada = Helper.filterDeleted(res, true);
                vm.cabinetsEntrada = _.sortBy(vm.cabinetsEntrada, 'economico');
                vm.loading = false;
            }).catch(function(err){
                toastr.error(vm.errorMessage,vm.errorTitle);
            });

        }

        function cabinetSearch(query) {

            return query ? lookup(query) : vm.cabinetsEntrada;
        }

        function lookup(search_text) {
            if(!angular.isUndefined(search_text)) {
                vm.search_items = _.filter(vm.cabinetsEntrada, function (item) {
                    return item.economico.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
                });
                return vm.search_items;
            }
        }

        function lookupUDN(search_text) {
            if(!angular.isUndefined(search_text)) {
                vm.search_items = _.filter(vm.udns, function (item) {
                    return item.zona.toLowerCase().includes(search_text.toLowerCase()) || item.agencia.toLowerCase().includes(search_text.toLowerCase());
                });

                vm.isValid = !((vm.search_items.length == 0 && search_text.length > 0)||(search_text.length > 0 && !angular.isObject(vm.salida.udn)));
                return vm.search_items;
            }

        }


        function nextTab() {
            vm.selectedTab = vm.selectedTab + 1;
        }


    }

    function tipoequipoSearch() {
        return function (input, text, tipos, modelos) {
            if (!angular.isNumber(text) || text === '') {
                return input;
            }
            return _.filter(input, function (item) {
                var tipo = _.findWhere(modelos, {id: item.modelo}).tipo;
                if (tipo != null) {
                    var tiposEquipo=_.findWhere(tipos, {id: tipo});
                    if(tiposEquipo!=null) {
                        return tiposEquipo.id==text;
                    }
                }
            });

        };
    }

    function salidaSearch() {
        return function (input, text) {
            if (!angular.isString(text) || text === '') {
                return input;
            }

            return _.filter(input, function (item) {
                return item.economico.toLowerCase().indexOf(text.toLowerCase()) >= 0;
            });

        };

    }

})();
