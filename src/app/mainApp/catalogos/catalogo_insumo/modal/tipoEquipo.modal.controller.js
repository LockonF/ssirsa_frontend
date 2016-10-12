(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('TipoEquipoDialogController', TipoEquipoDialogController);

    /* @ngInject */
    function TipoEquipoDialogController($mdDialog, catalogo, TipoEquipo) {

        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.querySearch = querySearch;
        vm.lookup = lookup;
        vm.deleteTipoEquipo = deleteTipoEquipo;
        vm.selectedItemChange=selectedItemChange;
        vm.equipo_list=[];
        activate();
        function activate() {
            TipoEquipo.listWitout().then(function (res) {
                vm.equipos = res;
                if(catalogo.tipos_equipo.length>0) {
                    vm.equipo_list = angular.copy(vm.equipos);
                    vm.equipos.forEach(function (value) {
                        var exist = _.filter(catalogo.tipos_equipo, function (item) {
                            return (item == value.id);
                        });
                        if (exist.length == 0) {
                            vm.equipo_list = _.filter(vm.equipo_list, function (item) {
                                return !(item.id == value.id);

                            });
                        }
                    });
                }
            });
        }
        function selectedItemChange(item) {
            if (vm.equipo_list != null && item!=null) {
                var index = _.findIndex(vm.equipo_list, function (obj) {
                    return obj.id === item.id;
                });
                if (index == -1) {
                    vm.equipo_list.splice(0, 0, item);
                    vm.equipo_list = _.sortBy(vm.equipo_list, 'nombre');
                }
            }
        }
        function deleteTipoEquipo(item) {
            var resultado = _.indexOf(vm.equipo_list, item);
            if (resultado != -1) {
                vm.equipo_list.splice(resultado, 1);
            }
        }

        function okClick() {
            vm.equipo_list=_.pluck(vm.equipo_list,"id");
            $mdDialog.hide(vm.equipo_list);
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function querySearch(query) {
            return query ? lookup(query) : vm.equipos;
        }

        function lookup(search_text) {
            vm.search_items = _.filter(vm.equipos, function (item) {
                return item.descripcion.toLowerCase().indexOf(search_text.toLowerCase()) >= 0;
            });
            return vm.search_items;
        }
    }
})();
