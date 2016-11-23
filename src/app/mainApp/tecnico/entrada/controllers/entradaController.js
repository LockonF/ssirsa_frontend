/**
 * Created by Emmanuel on 29/08/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.tecnico')
        .controller('entradaController', entradaController);

    function entradaController(EntradaSalida, toastr, $mdDialog, MarcaCabinet,
                               ModeloCabinet, Sucursal, udn, CabinetEntradaSalida,
                               Proyectos, TipoTransporte, LineaTransporte, Translate,
                               $scope, Cabinet, Helper, Persona) {
        var vm = this;
        vm.isGarantia = false;
        vm.isPedimento = false;
        vm.searchText = "";
        vm.isValid = false;

        vm.guardar = guardar;
        vm.limpiar = limpiar;
        vm.selectionFile = selectionFile;
        vm.selectionImage = selectionImage;
        vm.showMassiveUpload = showMassiveUpload;
        vm.showManualUpload = showManualUpload;
        vm.removeImage = removeImage;
        vm.nextTab = nextTab;
        vm.uploadFile = uploadFile;
        vm.showMarcaDialog = showMarcaDialog;
        vm.showModeloDialog = showModeloDialog;
        vm.showCabinetDialog = showCabinetDialog;
        vm.addCabinet = addCabinet;
        vm.removeNotFoundCabinet = removeNotFoundCabinet;
        vm.removeCabinet = removeCabinet;
        vm.selectedItemChange = selectedItemChange;
        vm.search = search;

        vm.options = ["Nuevos", "Garantías"];
        vm.selectedEntrada = null;

        vm.selectedTab = 0;
        vm.idEntrada = null;
        vm.sucursal=null;
        vm.modelos = ModeloCabinet.list();
        vm.marcas = MarcaCabinet.list();

        //Visualizations
        vm.hideMassiveUpload = true;
        vm.hideManualUpload = true;
        vm.hideRegisteredCabinets = true;
        vm.hideUnregisteredCabinets = true;
        vm.inputWasCorrect = false;


        vm.responseMassiveUpload = {
            "id": "",
            "creados": [],
            "no_creados": [],
            "modelos_no_existentes": []

        };

        var entrada = {
            "id": null,
            "fecha": "",
            "nombre_chofer": "",
            "ife_chofer": null,
            "pedimento": "",
            "accion": "entrada",
            "linea_transporte": null,
            "proyecto": null,
            "sucursal": null,
            "tipo_transporte": null,
            "udn": null,
            "file": null,
            "creados": [],
            "no_creados": [],
            "modelos_no_existentes": null

        };

        //Translates
        vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
        vm.warningTitle = Translate.translate('MAIN.MSG.WARNING_TITLE');
        vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
        vm.errorGeneric = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
        vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_CATALOG');
        vm.sucessMassive = Translate.translate('INPUT.Messages.SuccessMassive');
        vm.successNormal = Translate.translate('INPUT.Messages.SuccessNormal');
        vm.warning = Translate.translate('INPUT.Messages.Warning');
        vm.errorMassive = Translate.translate('INPUT.Messages.ErrorMassive');
        vm.errorNormal = Translate.translate('INPUT.Messages.ErrorNormal');
        vm.errorCabinet = Translate.translate('INPUT.Messages.ErrorCabinet');
        vm.notFoundCabinet = Translate.translate('INPUT.Messages.NotFoundCabinet');
        vm.acceptButton = Translate.translate('MAIN.BUTTONS.ACCEPT');
        vm.cancelButton = Translate.translate('MAIN.BUTTONS.CANCEL');
        vm.dialogTitle = Translate.translate('INPUT.Dialogs.Confirm.Title');
        vm.dialogMessage = Translate.translate('INPUT.Dialogs.Confirm.Message');

        activate();

        //Functions
        function activate() {
            vm.cabinets = [];
            vm.cabinetID = "";
            vm.notFoundCabinets = [];

            Cabinet.getEconomics().then(function (res) {
                vm.existingCabinets = _.pluck(res, "economico");
            }).catch(function () {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
            LineaTransporte.listObject().then(function (res) {
                vm.lineasTransporte = Helper.filterDeleted(res, true);
                vm.lineasTransporte = _.sortBy(vm.lineasTransporte, 'razon_social');
            }).catch(function () {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
            TipoTransporte.listObject().then(function (res) {
                vm.tiposTransporte = Helper.filterDeleted(res, true);
                vm.tiposTransporte = _.sortBy(vm.tiposTransporte, 'descripcion');
            }).catch(function () {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
            Sucursal.listObject().then(function (res) {
                vm.Sucursales = Helper.filterDeleted(res, true);
                vm.Sucursales = _.sortBy(vm.Sucursales, 'nombre');
            }).catch(function () {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
            Proyectos.listObject().then(function (res) {
                vm.Proyectos = Helper.filterDeleted(res, true);
                vm.Proyectos = _.sortBy(vm.Proyectos, 'descripcion');
            }).catch(function () {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
            udn.listObject().then(function (res) {
                vm.udns = Helper.filterDeleted(res, true);
                vm.udns = _.sortBy(vm.udns, 'agencia');
                vm.filteredUDN = angular.copy(vm.udns);
            }).catch(function () {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
            vm.entrada = angular.copy(entrada);
            Persona.listProfile().then(function(res){
                if(res.sucursal!=null){
                    vm.sucursal=res.sucursal;
                    vm.entrada.sucursal=res.sucursal;
                }
            }).catch(function () {
                toastr.error(vm.errorMessage, vm.errorTitle);
            });
        }

        function guardar() {
            vm.entrada.fecha = getToday();

            var fd = new FormData();

            fd.append('accion', 'entrada');
            fd.append('fecha', vm.entrada.fecha);

            if (vm.entrada.pedimento != null)
                fd.append('pedimento', vm.entrada.pedimento);

            fd.append('nombre_chofer', vm.entrada.nombre_chofer);
            fd.append('linea_transporte', vm.entrada.linea_transporte);

            if (vm.entrada.proyecto != null)
                fd.append('proyecto', vm.entrada.proyecto);

            fd.append('sucursal', vm.entrada.sucursal);
            fd.append('tipo_transporte', vm.entrada.tipo_transporte);

            if (vm.entrada.udn != null)
                fd.append('udn', vm.entrada.udn.id);

            if (vm.entrada.id != null)
                fd.append("id", vm.entrada.id);

            if (vm.cabinets.length > 0)
                fd.append('cabinets', _.pluck(vm.cabinets, "economico"));

            if (vm.entrada.ife_chofer != null)
                fd.append('ife_chofer', vm.entrada.ife_chofer);
            //Is massive upload
            if (vm.entrada.file != null) {
                fd.append('file', vm.entrada.file);
                if (vm.entrada.id == null) {
                    EntradaSalida.postEntradaMasiva(fd).then(function (res) {
                        vm.entrada.id = res.id;
                        vm.entrada.creados = res.creados;
                        vm.entrada.no_creados = _.map(res.no_creados, function (id) {
                            return {"economico": id, "motivo": "Marca o modelo no existentes"};
                        });
                        vm.hideRegisteredCabinets = false;
                        vm.hideUnregisteredCabinets = false;
                        if (vm.entrada.no_creados.length > 0) {
                            toastr.warning(vm.warning, vm.warningTitle);
                            vm.entrada.file = null;
                        }
                        else {
                            toastr.success(vm.sucessMassive, vm.successTitle);
                            vm.inputWasCorrect = true;
                        }
                    }).catch(function (err) {
                        if (err.data.no_creados.length > 0) {
                            vm.entrada.no_creados = err.data.no_creados;
                        }
                        vm.entrada.file = null;
                        toastr.error(vm.errorMassive, vm.errorTitle);
                    });
                }
                else {
                    fd.append('id', vm.entrada.id);
                    EntradaSalida.putEntradaMasiva(fd,vm.entrada.id).then(function (res) {
                        vm.entrada.id = res.id;
                        vm.entrada.creados = res.creados;
                        vm.entrada.no_creados = res.no_creados;
                        vm.hideRegisteredCabinets = false;
                        vm.hideUnregisteredCabinets = false;
                        if (vm.entrada.no_creados.length > 0) {
                            toastr.warning(vm.warning, vm.warningTitle);
                            vm.entrada.file = null;
                        }
                        else {
                            toastr.success(vm.sucessMassive, vm.successTitle);
                            vm.inputWasCorrect = true;
                        }
                    }).catch(function (err) {
                        console.log(err.data);
                        if (err.data.no_creados.length > 0) {
                            vm.entrada.no_creados = err.data.no_creados;
                        }
                        vm.entrada.file = null;
                        toastr.error(vm.errorMassive, vm.errorTitle);
                    });
                }
            }
            else {
                if (vm.notFoundCabinet.length == 0) {
                    var confirm = $mdDialog.confirm()
                        .title(vm.dialogTitle)
                        .textContent(vm.dialogMessage)
                        .ariaLabel('Confirmar guardado')
                        .ok(vm.acceptButton)
                        .cancel(vm.cancelButton);
                    $mdDialog.show(confirm).then(function () {
                        postManual(fd);
                    }, function () {
                        //Cancelled
                    });
                }
                else {
                    postManual(fd);
                }

            }

        }

        function postManual(fd) {
            EntradaSalida.postEntrada(fd).then(function (res) {
                var request = {
                    "entrada_salida": res.id,
                    "economico": _.map(vm.cabinets, function (element) {
                            return {"economico": element.economico};
                        }
                    )
                };
                CabinetEntradaSalida.create(request).then(function () {
                    toastr.success(vm.successNormal, vm.successTitle);
                    limpiar();
                }).catch(function (err) {
                    vm.entrada.no_creados = err.data.cabinet;
                    toastr.error(vm.errorNormal, vm.errorTitle);
                });

            }).catch(function (err) {
                toastr.error(vm.errorNormal, vm.errorTitle);
            });
        }

        function limpiar() {
            vm.entrada = angular.copy(entrada);
            vm.entrada.sucursal=vm.sucursal;
            vm.hideRegisteredCabinets = true;
            vm.hideUnregisteredCabinets = true;
            vm.hideMassiveUpload = true;
            vm.hideManualUpload = true;
            $scope.entradaForm.$setPristine();
            $scope.entradaForm.$setUntouched();
            $scope.entradaForm.$invalid = true;
            vm.selectedTab = 0;
            vm.inputWasCorrect = false;
        }

        function partialClean() {
            //vm.entrada.id = null;
            vm.cabinets = [];
            vm.entrada.creados = [];
            vm.entrada.no_creados = [];
            vm.notFoundCabinets = [];
        }

        function selectionImage($file) {
            vm.entrada.ife_chofer = $file;
        }

        function selectionFile($file) {
            partialClean();
            vm.entrada.file = $file;
        }

        function getToday() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            return yyyy + '/' + mm + '/' + dd;
        }

        function showMassiveUpload() {
            vm.hideManualUpload = true;
            vm.hideMassiveUpload = false;
            partialClean();
        }

        function showManualUpload() {
            vm.hideManualUpload = false;
            vm.hideMassiveUpload = true;
            partialClean();
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

            });
        }

        function showMarcaDialog(ev) {
            $mdDialog.show({
                controller: 'MarcaDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/tecnico/entrada/dialogs/marca.tmpl.html',
                fullscreen: true,
                clickOutsideToClose: true,
                focusOnOpen: true
            }).then(function (res) {

            }).catch(function (err) {
                if (err != null) {
                    toastr.error(vm.errorGeneric, vm.errorTitle);
                }
            });
        }

        function showModeloDialog(ev) {
            $mdDialog.show({
                controller: 'ModeloDialogController',
                templateUrl: 'app/mainApp/tecnico/entrada/dialogs/modelo.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                controllerAs: 'vm',
                fullscreen: true,
                clickOutsideToClose: true
            }).then(function (res) {

            }).catch(function (err) {
                if (err != null) {
                    toastr.error(vm.errorGeneric, vm.errorTitle);
                }
            });
        }

        function addCabinet() {
            if (_.contains(vm.existingCabinets, vm.cabinetID)) {
                Cabinet.get(vm.cabinetID).then(function (res) {
                    var index = vm.cabinets.map(function (elem) {
                        return elem.economico;
                    }).indexOf(res.economico);
                    if (index != -1) {
                        toastr.warning(vm.errorCabinet, vm.warning);
                    }
                    else {
                        var tempCabinet = angular.copy(res);
                        tempCabinet.modelo = modeloById(res.modelo).nombre;
                        tempCabinet.marca = marcaById(res.modelo);
                        vm.cabinets.push(tempCabinet);
                    }
                    vm.cabinetID = "";
                }).catch(function (err) {
                    toastr.error(vm.notFoundCabinet, vm.errorTitle);
                    vm.cabinetID = "";
                });
            }
            else {
                if (vm.notFoundCabinets.indexOf(vm.cabinetID) != -1) {
                    toastr.warning(vm.errorCabinet, vm.warning);
                }
                else {
                    toastr.warning(vm.notFoundCabinet, vm.warning);
                    vm.notFoundCabinets.push(vm.cabinetID);
                }
                vm.cabinetID = "";
            }


        }


        function removeNotFoundCabinet(id) {
            var index = vm.notFoundCabinets.indexOf(id);
            if (index > -1) {
                vm.notFoundCabinets.splice(index, 1);
            }
        }
        
        function removeCabinet(id){
            var index = vm.cabinets.indexOf(id);
            if (index > -1) {
                vm.cabinets.splice(index, 1);
            }
        }

        function modeloById(id) {
            return _.find(vm.modelos, function (model) {
                return model.id == id;
            });
        }

        function marcaById(id) {
            var modelo = modeloById(id);
            return _.find(vm.marcas, function (brand) {
                return brand.id == modelo.marca;
            }).descripcion;
        }

        function showCabinetDialog(economico) {
            $mdDialog.show({
                controller: 'CabinetDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/mainApp/tecnico/entrada/dialogs/cabinet.tmpl.html',
                fullscreen: true,
                clickOutsideToClose: true,
                focusOnOpen: true,
                locals: {
                    cabinetID: economico
                }
            }).then(function (res) {
                vm.existingCabinets.push(res);
                removeNotFoundCabinet(res);
                vm.cabinetID = res;
                addCabinet();
            }).catch(function (err) {
                if (err != null) {

                }
            });
        }

        function search(text) {
            if (!angular.isUndefined(text)) {
                vm.filteredUDN = _.filter(vm.udns, function (item) {
                    return item.agencia.toLowerCase().startsWith(text.toLowerCase()) || item.zona.toLowerCase().startsWith(text.toLowerCase());
                });
                vm.isValid = !((vm.filteredUDN.length == 0 && text.length > 0) || (text.length > 0 && !angular.isObject(vm.entrada.udn)));
                return vm.filteredUDN;
            }
        }

        function selectedItemChange(item) {
            vm.isValid = angular.isObject(item);
        }


    }

})();
