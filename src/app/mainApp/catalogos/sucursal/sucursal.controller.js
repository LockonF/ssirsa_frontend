(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('SucursalController', SucursalController)
        .filter('sucursalSearch', sucursalSearch);

    /* @ngInject */
    function SucursalController(Sucursal, $scope, toastr, Translate,$mdDialog) {

        var vm = this;

        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedSucursales = selectedSucursales;
        vm.showRegister=showRegister;
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
        activate();
        init();
        function init() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.SUCESSS_TRANSPORTE_MESSAGE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
        }


        function activate() {
            vm.sucursales = Sucursal.list();
        }
        function showRegister($event) {
            clearForm();
        }
        function remove(ev) {
            var confirm = $mdDialog.confirm()
                .title('Confirmación para eliminar')
                .textContent('¿Esta seguro de eliminar este elemento?')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Aceptar')
                .cancel('Cancelar');
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
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }
        function create() {
            Sucursal.create(vm.sucursal).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.sucursal = angular.copy(sucursal);
                cancel();
                activate();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }

        function cancel() {
            $scope.SucursalForm.$setPristine();
            $scope.SucursalForm.$setUntouched();
            vm.sucursal = angular.copy(sucursal);
            vm.selectedSucursalList = null;
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
