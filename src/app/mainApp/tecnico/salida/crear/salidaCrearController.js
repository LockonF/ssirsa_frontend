/**
 * Created by Adan Amezcua on 08/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('salidaCrearController', salidaCrearController)
        .filter('salidaSearch', salidaSearch)
        .filter('tipoequipoSearch', tipoequipoSearch);

    function salidaCrearController(EntradaSalida,Clientes, OPTIONS, ModeloCabinet, Persona, $mdDialog, TipoEquipo, Helper, Translate, toastr, Sucursal, udn, Cabinet, CabinetEntradaSalida, TipoTransporte, $scope, LineaTransporte) {
        var vm = this;
        vm.guardar = guardar;
        vm.selectionFile = selectionFile;
        vm.selectionImage = selectionImage;
        vm.showMassiveUpload = showMassiveUpload;
        vm.showManualUpload = showManualUpload;
        vm.cabinetSearch = cabinetSearch;
        vm.nextTab = nextTab;
        vm.lookupByEconomico=lookupByEconomico;
        vm.clear = clear;
        vm.search = search;
        vm.lookupUDN = lookupUDN;
        vm.changeType = changeType;
        vm.selectedItemChange = selectedItemChange;


        activate();

        vm.selectedTab = 0;
        vm.idEntrada = null;

        //Visualizations

        vm.hideMassiveUpload = true;
        vm.hideManualUpload = true;
        vm.hideRegisteredCabinets = true;
        vm.hideUnregisteredCabinets = true;
        vm.selectedCabinets = [];
        vm.cabinetsEntrada=[];

        vm.loading = true;
        vm.types = OPTIONS.type_out;
        vm.isValid = false;
        vm.outputWasCorrect = false;
        vm.filtrado = false;
        vm.economic_lookup_var = null;
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
            "cliente":null,
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
            if (vm.salida.pedimento != null)
                fd.append('pedimento', vm.salida.pedimento);

            fd.append('nombre_chofer', vm.salida.nombre_chofer);
            var cliente=vm.salida.cliente.nombre+" "+vm.salida.cliente.apellido_paterno+" "+vm.salida.cliente.apellido_materno;
            fd.append('cliente',cliente);

            fd.append('linea_transporte', vm.salida.linea_transporte);

            if (vm.salida.proyecto != null)
                fd.append('proyecto', vm.salida.proyecto);
            fd.append('sucursal', vm.salida.sucursal);
            fd.append('tipo_transporte', vm.salida.tipo_transporte);
            fd.append('udn', vm.salida.udn.id);
            if (vm.salida.id != null)
                fd.append("id", vm.salida.id);
            
            if (vm.fotoGeneral != null && vm.fotoGeneral != "" && !(angular.isUndefined(vm.fotoGeneral)))
                fd.append('ife_chofer', vm.fotoGeneral);
            //Is massive upload
            if (vm.salida.file != null) {
                fd.append('file', vm.salida.file);
                vm.salida.no_creados = null;
                vm.salida.creados = null;
                vm.loadingPromise=EntradaSalida.postSalidaMasiva(fd).then(function (res) {
                    vm.hideRegisteredCabinets = false;
                    vm.hideUnregisteredCabinets = true;
                    vm.salida.creados = res.creados;

                    toastr.success(vm.successMassive, vm.successTitle);
                    vm.outputWasCorrect = true;
                }).catch(function (err) {
                    
                    vm.hideUnregisteredCabinets = false;
                    vm.hideRegisteredCabinets = true;
                    if (err.status == 400) {
                        toastr.error(vm.errorMassive, vm.errorTitle);
                        vm.salida.no_creados = err.data;
                        vm.salida.file = null;
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
                    if (vm.selectedEntrada >= 2 && vm.selectedEntrada <= 4) {
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
                    } else {
                        entradaManual(fd);
                    }

                }

            }

        }
        function lookupByEconomico () {
            if(vm.economicoFilter!='' && vm.economicoFilter!=null){
                var status = vm.types[vm.selectedEntrada].value_service;
                vm.loadingPromise= Cabinet.loadByStatus(status,vm.economicoFilter).then(function (res) {
                    vm.cabinetsEntrada=res;
                });
            }else{
                vm.cabinetsEntrada=[];
            }
        }
        function changeType() {
            if (!vm.hideManualUpload) {
                vm.cabinetsEntrada=[];
                vm.economicoFilter=null;
            }
        }

        function entradaManual(fd) {

            vm.loadingPromise=EntradaSalida.postEntrada(fd).then(function (res) {
                var selected = _.chain(vm.selectedCabinets)
                    .map(function (cabinet) {
                        return {economico: cabinet};
                    }).flatten().value();

                var request = {
                    entrada_salida: res.id,
                    economico: selected
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
            var tipo = _.findWhere(vm.modelos, {id: obj.modelo});
            if (tipo != null) {
                var tiposEquipo = _.findWhere(vm.tipoEquipos, {id: tipo.tipo});
                if (tiposEquipo != null) {
                    return tiposEquipo.nombre;
                } else {
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
                }else{

                    vm.fotoGeneral=file;
                }
            }
        }

        function selectedItemChange(item) {
            vm.isValid = angular.isObject(item);
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
            }).catch(function (err) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
            TipoTransporte.listObject().then(function (res) {
                vm.tiposTransporte = Helper.filterDeleted(res, true);
                vm.tiposTransporte = _.sortBy(vm.tiposTransporte, 'descripcion');
            }).catch(function (err) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
            Sucursal.listObject().then(function (res) {
                vm.Sucursales = Helper.filterDeleted(res, true);
                vm.Sucursales = _.sortBy(vm.Sucursales, 'nombre');
            }).catch(function (err) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });

            udn.listObject().then(function (res) {
                vm.udns = Helper.filterDeleted(res, true);
                vm.udns = _.sortBy(vm.udns, 'agencia');
            }).catch(function (err) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
            ModeloCabinet.listWitout().then(function (res) {
                vm.modelos = Helper.filterDeleted(res, true);
            });
            TipoEquipo.listWitout().then(function (res) {
                vm.tipoEquipos = res;
                vm.tipoEquipos = _.sortBy(vm.tipoEquipos, 'nombre');
            }).catch(function (err) {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
            Clientes.listObject().then(function (res) {
                vm.clients=res;
                vm.clients=_.sortBy(vm.clients, 'nombre');
            }).catch(function (err) {
                toastr.error(vm.errorMessage, vm.errorTitle);
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
            vm.message=Translate.translate('OUTPUT.FORM.LABEL.SEARCH_CABINET');
            Persona.listProfile().then(function (res) {
                if (res.sucursal != null) {
                    vm.sucursal = res.sucursal;
                    vm.salida.sucursal = res.sucursal;
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
            vm.economicoFilter=null;
            vm.cabinetsEntrada=null;
        }

        function clear() {
            vm.hideUnregisteredCabinets = true;
            vm.hideRegisteredCabinets = true;
            vm.fotoGeneral=true;
            vm.salida = angular.copy(salida);
            vm.salida.sucursal = vm.sucursal;
            $scope.entradaForm.$setPristine();
            $scope.entradaForm.$setUntouched();
            vm.salida.no_creados = null;
            vm.salida.creados = null;
            vm.selectedCabinets = [];
            vm.hideMassiveUpload = true;
            vm.hideManualUpload = true;
            vm.searchText = null;
            vm.selectedEntrada = 0;
            vm.outputWasCorrect = false;

        }

        function showManualUpload() {
            vm.hideManualUpload = false;
            vm.hideMassiveUpload = true;
            vm.hideUnregisteredCabinets = true;
            vm.hideRegisteredCabinets = true;
            vm.salida.file = null;
            vm.loading = true;
            vm.economicoFilter=null;
            vm.cabinetsEntrada=null;

        }

        function cabinetSearch(query) {

            return query ? lookup(query) : vm.cabinetsEntrada;
        }

        function lookup(search_text) {
            if (!angular.isUndefined(search_text)) {
                vm.search_items = _.filter(vm.cabinetsEntrada, function (item) {
                    return item.economico.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
                });
                return vm.search_items;
            }
        }

        function lookupUDN(search_text) {
            if (!angular.isUndefined(search_text)) {
                vm.search_items = _.filter(vm.udns, function (item) {
                    return item.zona.toLowerCase().includes(search_text.toLowerCase()) || item.agencia.toLowerCase().includes(search_text.toLowerCase());
                });

                vm.isValid = !((vm.search_items.length == 0 && search_text.length > 0) || (search_text.length > 0 && !angular.isObject(vm.salida.udn)));
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
                    var tiposEquipo = _.findWhere(tipos, {id: tipo});
                    if (tiposEquipo != null) {
                        return tiposEquipo.id == text;
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
