(function() {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('LineaTransporteController', LineaTransporteController)
        .filter('custom', custom);

    /* @ngInject */
    function LineaTransporteController(LineaTransporte,$mdDialog) {

        var vm = this;
        vm.isDisabled = false;
        vm.selectedLineas = selectedLineas;
        vm.registrarTransporte=registrarTransporte;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.showRegister = showRegister;
        vm.selectedLinea = null;
        vm.selectedSolicitudes = [];
        vm.tooltipVisible = false;
        vm.hideProject = false;
        vm.solicitudes = null;
        vm.proyectos = null;
        vm.showSolicitudes = false;
        vm.hover = false;
        var transport={
            razon_social:null,
            direccion:null,
            telefonos:[],
            responsable:null
        };
        vm.transport=angular.copy(transport);
        activate();
        function activate() {
            LineaTransporte.getAll().then(function (res) {
                vm.lineas=res;
            }).catch(function () {

            });
        }

        function showRegister($event) {
            var config = {
                controller: 'LineaTransporteModalController',
                templateUrl: 'app/mainApp/catalogos/lineaTransporte/lineaTransporteCreate.dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                disableParentScroll: false,
                fullscreen: true,
                locals:{
                    selectedLinea:vm.selectedLinea
                },
                controllerAs: 'vm'
            };
            $mdDialog.show(config);
        }

        function selectedLineas(project) {
            vm.selectedLinea = project;
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
            LineaTransporte.create(vm.transport).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.transport=angular.copy(transport);
                cancel();
            }).catch(function (res) {
                console.log(res);
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
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
