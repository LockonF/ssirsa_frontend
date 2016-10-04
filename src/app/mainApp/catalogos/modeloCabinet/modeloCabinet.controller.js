(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('ModeloCabinetController', ModeloCabinetController)
        .filter('modeloSearch', modeloSearch);

    /* @ngInject */
    function ModeloCabinetController(ModeloCabinet, $scope, toastr, Translate, $mdDialog, MarcaCabinet) {

        var vm = this;
        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedModelos = selectedModelos;
        vm.cancel = cancel;
        vm.create = create;
        vm.remove=remove;
        vm.update=update;
        vm.search_items = [];
        vm.searchText = '';
        var modelo = {
            nombre: null,
            descripcion: null,
            palabra_clave: null,
            cantidad: null,
            tipo_compresor: null,
            tipo_refrigerante: null,
            tipo: null,
            marca: null
        };
        vm.modelo = angular.copy(modelo);
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
            vm.modelos = ModeloCabinet.list();
            vm.marcas = MarcaCabinet.list();
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
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }
        function create() {
            ModeloCabinet.create(vm.modelo).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.modelo = angular.copy(modelo);
                cancel();
                activate();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }

        function cancel() {
            $scope.ModelCabinetForm.$setPristine();
            $scope.ModelCabinetForm.$setUntouched();
            vm.modelo = angular.copy(modelo);
            vm.selectedModeloList = null;
        }

        function selectedModelos(project) {
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
