(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('TipoEquipoController', TipoEquipoController)
        .filter('tipoSearch', tipoSearch);

    /* @ngInject */
    function TipoEquipoController(TipoEquipo, $scope, toastr, Translate, $mdDialog) {

        var vm = this;
        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedEquipos = selectedEquipos;
        vm.showRegister=showRegister;
        vm.cancel = cancel;
        vm.create = create;
        vm.remove=remove;
        vm.update=update;
        vm.search_items = [];
        vm.searchText = '';
        var tipo_equipo = {
            nombre: null,
            descripcion: null

        };
        vm.tipo_equipo = angular.copy(tipo_equipo);
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
            vm.tipo_equipos = TipoEquipo.list();
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
                    TipoEquipo.remove(vm.tipo_equipo).then(function (res) {
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
            TipoEquipo.update(vm.tipo_equipo).then(function (res) {
                toastr.success(vm.successUpdateMessage, vm.successTitle);
                cancel();
                activate();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }
        function create() {
            TipoEquipo.create(vm.tipo_equipo).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.tipo_equipo = angular.copy(tipo_equipo);
                cancel();
                activate();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }

        function cancel() {
            $scope.TipoEquipoForm.$setPristine();
            $scope.TipoEquipoForm.$setUntouched();
            vm.tipo_equipo = angular.copy(tipo_equipo);
            vm.selectedEquipoList = null;
        }

        function selectedEquipos(project) {
            vm.selectedEquipoList = project;
            vm.tipo_equipo = angular.copy(project);
        }

        function querySearch(query) {
            var results = query ? lookup(query) : vm.tipo_equipos;
            return results;

        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.tipo_equipos, function (item) {
                return item.nombre.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }


    }

    function tipoSearch() {
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
