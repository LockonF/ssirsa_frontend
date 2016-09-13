(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('LineaTransporteController', LineaTransporteController)
        .filter('custom', custom);

    /* @ngInject */
    function LineaTransporteController(LineaTransporte, $scope, toastr, Translate,$mdDialog) {

        var vm = this;
        vm.isDisabled = false;
        vm.selectedLineas = selectedLineas;
        vm.registrarTransporte = registrarTransporte;
        vm.eliminar=eliminar;
        vm.editar = editar;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.showRegister = showRegister;
        vm.clearForm = clearForm;
        vm.selectedLinea = null;
        vm.selectedSolicitudes = [];
        vm.tooltipVisible = false;
        vm.hideProject = false;
        vm.solicitudes = null;
        vm.proyectos = null;
        vm.showSolicitudes = false;
        vm.editable=true;
        vm.hover = false;
        var transport = {
            razon_social: null,
            direccion: null,
            telefonos: [],
            responsable: null
        };
        vm.operation = 0;//0- View, 1-Register, 2-Update
        vm.transport = angular.copy(transport);
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
            LineaTransporte.getAll().then(function (res) {
                vm.lineas = res;
            }).catch(function () {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }

        function editar(){
            vm.operation=2;
            vm.editable=!vm.editable;
        }

        function showRegister($event) {
            vm.operation = 1;
            vm.selectedLinea=null;
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
                LineaTransporte.remove(vm.transport.id).then(function (res) {
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                    vm.transport = angular.copy(transport);
                    clearForm();
                    activate();
                    vm.selectedLinea=null;
                }).catch(function (res) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }, function() {

            });
        }
        function clearForm() {
            $scope.TransportForm.$setPristine();
            $scope.TransportForm.$setUntouched();
            vm.transport = angular.copy(transport);

            vm.selectedLinea=null;
        }

        function selectedLineas(project) {
            vm.selectedLinea = project;
            vm.operation = 0;
            vm.transport = angular.copy(project);
            vm.editable=true;
        }


        function querySearch(query) {
            var results = query ? vm.lineas.filter(createFilterFor(query)) : vm.lineas, deferred;
            return results;

        }

        function createFilterFor(query) {

            return function filterFn(linea) {
                return (linea.razon_social.indexOf(query) === 0);
            };
        }

        function registrarTransporte() {
            if(vm.operation ==1) {
                LineaTransporte.create(vm.transport).then(function (res) {
                    toastr.success(vm.successCreateMessage, vm.successTitle);
                    vm.transport = angular.copy(transport);
                    clearForm();
                    vm.numberBuffer=null;
                    activate();
                }).catch(function (res) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }else{
                LineaTransporte.modify(vm.transport).then(function (res) {
                    toastr.success(vm.successUpdateMessage, vm.successTitle);
                    vm.operation=0;
                    vm.editable=true;
                    vm.selectedLinea=null;
                    activate();
                }).catch(function (res) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }
        }

    }

    function custom() {
        return function (input, text) {
            if (!angular.isString(text) || text === '') {
                return input;
            }

            return input.filter(function (item) {
                return (item.razon_social.indexOf(text) > -1);
            });
        };

    }
})();
