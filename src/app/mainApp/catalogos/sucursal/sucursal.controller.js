(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('SucursalController', SucursalController)
        .filter('sucursalSearch', sucursalSearch);

    /* @ngInject */
    function SucursalController(Sucursal, $scope, toastr, Translate,$mdDialog) {

        var vm = this;
        vm.isDisabled = false;
        vm.selectedSucursales = selectedSucursales;
        vm.registrar = registrar;
        vm.eliminar=eliminar;
        vm.editar = editar;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.showRegister = showRegister;
        vm.clearForm = clearForm;
        vm.selectedSucursal = null;
        vm.tooltipVisible = false;
        vm.hideProject = false;
        vm.editable=true;
        vm.hover = false;
        var sucursal = {
            razon_social: null,
            direccion: null,
            telefonos: [],
            responsable: null
        };
        vm.operation = 0;//0- View, 1-Register, 2-Update
        vm.sucursal = angular.copy(sucursal);
        vm.numberBuffer = '';
        activate();
        init();
        function init() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_CREATE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
            vm.successUpdateMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_UPDATE');
            vm.successDeleteMessage = Translate.translate('MAIN.MSG.GENERIC_SUCCESS_DELETE');
        }

        function activate() {
            vm.sucursales=Sucursal.list();
        }

        function editar(){
            vm.operation=2;
            vm.editable=!vm.editable;
        }

        function showRegister($event) {
            vm.operation = 1;
            vm.selectedSucursal=null;
            vm.editable=!vm.editable;
            clearForm();
        }
        function eliminar(ev) {
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
                    vm.sucursal = angular.copy(sucursal);
                    clearForm();
                    activate();
                }).catch(function (res) {
                    console.log(res);
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }, function() {

            });
        }
        function clearForm() {
            $scope.SucursalForm.$setPristine();
            $scope.SucursalForm.$setUntouched();
            vm.sucursal = angular.copy(sucursal);

            vm.selectedSucursal=null;
        }

        function selectedSucursales(project) {
            vm.selectedSucursal = project;
            vm.operation = 0;
            vm.sucursal = angular.copy(project);
            vm.editable=true;
        }


        function querySearch(query) {
            var results = query ? vm.sucursales.filter(createFilterFor(query)) : vm.sucursales, deferred;
            return results;

        }

        function createFilterFor(query) {

            return function filterFn(linea) {
                return (linea.nombre.indexOf(query) === 0);
            };
        }

        function registrar() {
            if(vm.operation ==1) {
                Sucursal.create(vm.sucursal).then(function (res) {
                    toastr.success(vm.successCreateMessage, vm.successTitle);
                    vm.sucursal = angular.copy(sucursal);
                    clearForm();
                    vm.numberBuffer=null;
                    activate();
                }).catch(function (res) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }else{
                Sucursal.update(vm.sucursal).then(function (res) {
                    toastr.success(vm.successUpdateMessage, vm.successTitle);
                    vm.operation=0;
                    vm.editable=true;
                    activate();
                }).catch(function (res) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }
        }

    }

    function sucursalSearch() {
        return function (input, text) {
            if (!angular.isString(text) || text === '') {
                return input;
            }

            return input.filter(function (item) {
                return (item.nombre.indexOf(text) > -1);
            });
        };

    }
})();
