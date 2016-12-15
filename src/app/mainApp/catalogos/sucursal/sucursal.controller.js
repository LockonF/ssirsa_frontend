(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('SucursalController', SucursalController)
        .filter('sucursalSearch', sucursalSearch);

    /* @ngInject */
    function SucursalController(Sucursal, $scope, NotificationPanel,toastr,Helper, Translate,$mdDialog) {

        var vm = this;

        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedSucursales = selectedSucursales;
        vm.selectedItemChange = selectedItemChange;
        vm.toggleDeletedFunction = toggleDeletedFunction;
        vm.restore = restore;
        vm.cancel = cancel;
        vm.create = create;
        vm.remove=remove;
        vm.update=update;
        vm.search_items = [];
        vm.searchText = '';
        var sucursal = {
            razon_social: null,
            direccion: null,
            telefonos: [],
            responsable: null
        };
        vm.sucursal = angular.copy(sucursal);
        vm.numberBuffer = '';
        vm.myHeight=window.innerHeight-250;
        vm.myStyle={"min-height":""+vm.myHeight+"px"};
        vm.toggleDeleted = true;

        activate();
        init();
        function init() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.SUCESSS_TRANSPORTE_MESSAGE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
            vm.deleteButton=Translate.translate('MAIN.BUTTONS.DELETE');
            vm.cancelButton=Translate.translate('MAIN.BUTTONS.CANCEL');
            vm.dialogTitle=Translate.translate('MAIN.DIALOG.DELETE_TITLE');
            vm.dialogMessage=Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
            vm.duplicateMessage=Translate.translate('SUCURSAL.FORM.LABEL.DUPLICATE');
            vm.dialogRestoreTitle=Translate.translate('MAIN.DIALOG.RESTORE_TITLE');
            vm.dialogRestoreMessage=Translate.translate('MAIN.DIALOG.RESTORE_MESSAGE');
            vm.restoreButton=Translate.translate('MAIN.BUTTONS.RESTORE');
            vm.successRestoreMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_RESTORE');
        }


        function activate() {

            listSucursales();

        }
        function toggleDeletedFunction() {
            listSucursales();
            cancel();
        }

        function listSucursales() {
            vm.loadingPromise = Sucursal.listObject().then(function (res) {
                vm.sucursales=Helper.filterDeleted(res,vm.toggleDeleted);
                vm.sucursales=_.sortBy(vm.sucursales, 'nombre');
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
                vm.sucursal.deleted=false;
                Sucursal.update(vm.sucursal).then(function (res) {
                    toastr.success(vm.successRestoreMessage, vm.successTitle);
                    cancel();
                    activate();
                }).catch(function (res) {
                    vm.sucursal.deleted=true;
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
                Sucursal.remove(vm.sucursal).then(function (res) {
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
            Sucursal.update(vm.sucursal).then(function (res) {
                toastr.success(vm.successUpdateMessage, vm.successTitle);
                cancel();
                activate();
            }).catch(function (err) {
                if(err.status==400 && err.data.nombre!=undefined)
                {
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                }
            });
        }
        function create() {
            Sucursal.create(vm.sucursal).then(function (res) {

                vm.sucursal = angular.copy(sucursal);
                var request={
                    id:res.id,
                    name:res.nombre
                };
                NotificationPanel.createOffice(request).then(function () {
                    toastr.success(vm.successCreateMessage, vm.successTitle);
                    cancel();
                    activate();
                }).catch(function () {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                });

            }).catch(function (err) {
                if(err.status==400 && err.data.nombre!=undefined)
                {
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                }
            });
        }

        function cancel() {
            $scope.SucursalForm.$setPristine();
            $scope.SucursalForm.$setUntouched();
            vm.sucursal = angular.copy(sucursal);
            vm.selectedSucursalList = null;
            vm.searchText=null;
            vm.numberBuffer=null;
        }
        function selectedItemChange(item)
        {
            if (item!=null) {
                vm.sucursal = angular.copy(item);

            }else{
                cancel();
            }
        }
        function selectedSucursales(project) {
            vm.selectedSucursalList = project;
            vm.sucursal = angular.copy(project);
        }

        function querySearch(query) {
            var results = query ? lookup(query) : vm.sucursales;
            return results;

        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.sucursales, function (item) {
                return item.nombre.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }

    }

    function sucursalSearch() {
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
