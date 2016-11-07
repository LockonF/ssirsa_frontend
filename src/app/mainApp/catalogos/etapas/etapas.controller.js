(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('EtapasController', EtapasController)
        .filter('etapaSearch', etapaSearch);

    /* @ngInject */
    function EtapasController(Etapa, $scope, Helper,toastr, Translate, $mdDialog) {

        var vm = this;
        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedEtapa = selectedEtapa;
        vm.selectedItemChange=selectedItemChange;
        vm.cancel = cancel;
        vm.create = create;
        vm.remove = remove;
        vm.update = update;
        vm.search_items = [];
        vm.searchText = '';
        var etapa = {
            nombre: null,
            descripcion: null,
            taller:null
        };
        vm.etapa = angular.copy(etapa);
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
        }

        function activate() {
            Etapa.list().then(function (res) {
                vm.etapas=Helper.filterDeleted(res,true);
                vm.etapas=_.sortBy(vm.etapas, 'nombre');
            });

        }
        function selectedItemChange(item) {
            if (item!=null) {
                vm.etapa = angular.copy(item);

            }else{
                cancel();
            }
        }
        function remove(ev) {
            var confirm = $mdDialog.confirm()
                .title(vm.dialogTitle)
                .textContent(vm.dialogMessage)
                .ariaLabel('Confirmar eliminación')
                .ok(vm.deleteButton)
                .cancel(vm.cancelButton);
            $mdDialog.show(confirm).then(function () {
                Etapa.remove(vm.etapa).then(function (res) {
                    toastr.success(vm.successDeleteMessage, vm.successTitle);
                    cancel();
                    activate();
                }).catch(function (res) {
                    toastr.warning(vm.errorMessage, vm.errorTitle);
                });
            }, function () {

            });
        }

        function update() {
            Etapa.update(vm.etapa).then(function (res) {
                toastr.success(vm.successUpdateMessage, vm.successTitle);
                cancel();
                activate();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }

        function create() {
            Etapa.create(vm.etapa).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.etapa = angular.copy(etapa);
                cancel();
                activate();
            }).catch(function (res) {
                toastr.warning(vm.errorMessage, vm.errorTitle);
            });
        }

        function cancel() {
            $scope.EtapaForm.$setPristine();
            $scope.EtapaForm.$setUntouched();
            vm.etapa = angular.copy(etapa);
            vm.selectedEtapaList = null;
        }

        function selectedEtapa(project) {
            vm.selectedEtapaList = project;
            vm.etapa = angular.copy(project);
        }

        function querySearch(query) {
            var results = query ? lookup(query) : vm.etapas;
            return results;

        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.etapas, function (item) {
                return item.descripcion.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }


    }

    function etapaSearch() {
        return function (input, text) {
            if (!angular.isString(text) || text === '') {
                return input;
            }

            return _.filter(input, function (item) {
                return item.descripcion.toLowerCase().indexOf(text.toLowerCase()) >= 0;
            });

        };

    }
})();
