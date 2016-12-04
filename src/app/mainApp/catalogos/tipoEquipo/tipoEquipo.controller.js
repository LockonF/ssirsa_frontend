(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('TipoEquipoController', TipoEquipoController)
        .filter('tipoSearch', tipoSearch);

    /* @ngInject */
    function TipoEquipoController(TipoEquipo, $scope,Helper, toastr, Translate, $mdDialog) {

        var vm = this;
        vm.lookup = lookup;
        vm.querySearch = querySearch;
        vm.selectedEquipos = selectedEquipos;
        vm.selectedItemChange = selectedItemChange;
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
            vm.deleteButton=Translate.translate('MAIN.BUTTONS.DELETE');
            vm.cancelButton=Translate.translate('MAIN.BUTTONS.CANCEL');
            vm.dialogTitle=Translate.translate('MAIN.DIALOG.DELETE_TITLE');
            vm.dialogMessage=Translate.translate('MAIN.DIALOG.DELETE_MESSAGE');
            vm.duplicateMessage=Translate.translate('EQUIPMENT_TYPE.FORM.LABEL.DUPLICATE');
        }

        function activate() {
            TipoEquipo.listWitout().then(function (res) {
                vm.tipo_equipos =Helper.filterDeleted(res,true);
                vm.tipo_equipos=_.sortBy(vm.tipo_equipos, 'nombre');
            });
        }
        function selectedItemChange(item)
        {
            if (item!=null) {
                vm.tipo_equipo = angular.copy(item);

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
            }).catch(function (err) {
                if(err.status==400 && err.data.nombre!=undefined)
                {
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else{
                    toastr.error(vm.errorMessage,vm.errorTitle);
                }
            });
        }
        function create() {
            TipoEquipo.create(vm.tipo_equipo).then(function (res) {
                toastr.success(vm.successCreateMessage, vm.successTitle);
                vm.tipo_equipo = angular.copy(tipo_equipo);
                cancel();
                activate();
            }).catch(function (err) {
                if(err.status==400 && err.data.nombre!=undefined)
                {
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else{
                    toastr.error(vm.errorMessage,vm.errorTitle);
                }
            });
        }

        function cancel() {
            $scope.TipoEquipoForm.$setPristine();
            $scope.TipoEquipoForm.$setUntouched();
            vm.tipo_equipo = angular.copy(tipo_equipo);
            vm.selectedEquipoList = null;
            vm.searchText=null;
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
