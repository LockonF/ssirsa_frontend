(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('EtapaDialogController', EtapaDialogController);

    /* @ngInject */
    function EtapaDialogController($mdDialog, catalogo, Etapa) {

        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.querySearch = querySearch;
        vm.lookup = lookup;
        vm.deleteEtapa = deleteEtapa;
        vm.selectedItemChange=selectedItemChange;
        vm.etapa_list=[];
        activate();
        function activate() {

            Etapa.list().then(function (res) {
                vm.etapas = res;
                if(catalogo.etapas.length>0) {
                    vm.etapa_list = angular.copy(vm.etapas);
                    vm.etapas.forEach(function (value) {
                        var exist = _.filter(catalogo.etapas, function (item) {
                            return (item == value.id);
                        });
                        if (exist.length == 0) {
                            vm.etapa_list = _.filter(vm.etapa_list, function (item) {
                                return !(item.id == value.id);

                            });
                        }
                    });
                }
            });
        }
        function selectedItemChange(item) {
            if (vm.etapa_list != null && item!=null) {
                var index = _.findIndex(vm.etapa_list, function (obj) {
                    return obj.id === item.id;
                });
                if (index == -1) {
                    vm.etapa_list.splice(0, 0, item);
                    vm.etapa_list = _.sortBy(vm.etapa_list, 'nombre');
                }
            }
        }
        function deleteEtapa(item) {
            var resultado = _.indexOf(vm.etapa_list, item);
            if (resultado != -1) {
                vm.etapa_list.splice(resultado, 1);
            }
        }

        function okClick() {
            vm.etapa_list=_.pluck(vm.etapa_list,"id");
            $mdDialog.hide(vm.etapa_list);
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function querySearch(query) {
            return query ? lookup(query) : vm.etapas;
        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.etapas, function (item) {
                return item.descripcion.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }
    }
})();
