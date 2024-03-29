(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('ModeloCabinetController', ModeloCabinetController)
        .filter('modeloSearch', modeloSearch);

    /* @ngInject */
    function ModeloCabinetController(ModeloCabinet,TipoEquipo, $scope, toastr,Helper, Translate, $mdDialog, MarcaCabinet) {

        var vm = this;
        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedModelos = selectedModelos;
        vm.selectedItemChange = selectedItemChange;
        vm.cancel = cancel;
        vm.create = create;
        vm.remove=remove;
        vm.update=update;

        vm.disabled=disabled;
        vm.toggleDeletedFunction = toggleDeletedFunction;
        vm.restore = restore;

        vm.search_items = [];
        vm.searchText = '';
        var modelo = {
            nombre: null,
            descripcion: null,
            palabra_clave: null,
            tipo: null,
            marca: null
        };
        vm.modelo = angular.copy(modelo);
        vm.myHeight=window.innerHeight-250;
        vm.myStyle={"min-height":""+vm.myHeight+"px"};
        vm.toggleDeleted = true;

        activate();
        init();
        function init() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
            vm.deleteButton=Translate.translate('MAIN.BUTTONS.DELETE');
            vm.cancelButton=Translate.translate('MAIN.BUTTONS.CANCEL');
            vm.dialogTitle=Translate.translate('MAIN.DIALOG.DELETE_TITLE');
            vm.dialogMessage=Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
            vm.duplicateMessage=Translate.translate('MODEL_CABINET.MESSAGES.DUPLICATE');
            vm.dialogRestoreTitle=Translate.translate('MAIN.DIALOG.RESTORE_TITLE');
            vm.dialogRestoreMessage=Translate.translate('MAIN.DIALOG.RESTORE_MESSAGE');
            vm.restoreButton=Translate.translate('MAIN.BUTTONS.RESTORE');
            vm.successRestoreMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_RESTORE');
        }
        function disabled(id,tipoArray,deleted) {
            if(deleted==false) {
                if (id != null) {
                    if (tipoArray === "tipo") {
                        return Helper.searchByField(vm.tipoEquipos, id).deleted;
                    } else {
                        return Helper.searchByField(vm.marcas, id).deleted;
                    }

                }
            }else{
                return deleted;
            }
        }
        function activate() {
            listModelos();
            MarcaCabinet.listPromise().then(function (res) {
                vm.marcas = Helper.filterDeleted(res, true);
                vm.marcas = Helper.sortByAttribute(vm.marcas, 'descripcion')

            }).catch(function (err) {

            });
            TipoEquipo.listWitout().then(function (res) {
                vm.tipoEquipos =Helper.filterDeleted(res,true);
                vm.tipoEquipos=_.sortBy(vm.tipoEquipos, 'nombre');
            });
        }
        function toggleDeletedFunction() {
            listModelos();
            cancel();
        }

        function listModelos() {
            vm.loadingPromise = ModeloCabinet.listWitout().then(function (res) {
                vm.modelos =Helper.filterDeleted(res,vm.toggleDeleted);
                vm.modelos=_.sortBy(vm.modelos, 'nombre');
            }).catch(function(err){

            });


        }
        function restore() {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogRestoreTitle)
                .textContent(vm.dialogRestoreMessage)
                .ariaLabel('Confirmar restauración')
                .ok(vm.restoreButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function() {
                vm.modelo.deleted=false;
                ModeloCabinet.update(vm.modelo).then(function (res) {
                    toastr.success(vm.successRestoreMessage, vm.successTitle);
                    cancel();
                    activate();
                }).catch(function (res) {
                    vm.modelo.deleted=true;
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }, function() {

            });

        }

        function remove(ev) {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
                $mdDialog.show(confirm).then(function() {
                    ModeloCabinet.remove(vm.modelo).then(function (res) {
                        toastr.success(vm.successDeleteMessage, vm.successTitle);
                        cancel();
                        activate();
                    }).catch(function (res) {
                        toastr.warning(vm.errorMessage, vm.errorTitle);
                    });
                }, function() {

                });
        }
        function update() {
            ModeloCabinet.update(vm.modelo).then(function (res) {
                toastr.success(vm.successUpdateMessage, vm.successTitle);
                cancel();
                activate();
            }).catch(function (err) {
                if(err.status==400 && err.data.non_field_errors[0] =='Los campos nombre, marca deben formar un conjunto único.'){
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }
                else {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                }
            });
        }
        function create() {
            ModeloCabinet.create(vm.modelo).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.modelo = angular.copy(modelo);
                cancel();
                activate();
            }).catch(function (err) {
                if(err.status==400 && err.data.non_field_errors[0] =='Los campos nombre, marca deben formar un conjunto único.'){
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }
                else {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                }

            });
        }

        function cancel() {
            $scope.ModelCabinetForm.$setPristine();
            $scope.ModelCabinetForm.$setUntouched();
            vm.modelo = angular.copy(modelo);
            vm.selectedModeloList = null;
            vm.searchText=null;
        }
        function selectedItemChange(item)
        {
            if (item!=null) {
                vm.modelo = angular.copy(item);

            }else{
                cancel();
            }
        }
        function selectedModelos(project) {
            project.cantidad =parseFloat(project.cantidad);
            vm.selectedModeloList = project;

            vm.modelo = angular.copy(project);
        }

        function querySearch(query) {
            var results = query ? lookup(query) : vm.modelos;
            return results;

        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.modelos, function (item) {
                return item.nombre.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }


    }

    function modeloSearch() {
        return function (input, text) {
            if (!angular.isString(text) || text === '') {
                return input;
            }

            return _.filter(input, function (item) {
                return item.nombre.toLowerCase().indexOf(text.toLowerCase()) >= 0;
            });

        };

    }
})();
