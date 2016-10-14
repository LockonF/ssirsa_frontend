(function () {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('TipoEquipoDialogController', TipoEquipoDialogController);

    /* @ngInject */
    function TipoEquipoDialogController($mdDialog, $scope,catalogo, TipoEquipo) {

        var vm = this;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.querySearch = querySearch;
        vm.lookup = lookup;
        vm.deleteTipoEquipo = deleteTipoEquipo;
        vm.addTipoEquipo=addTipoEquipo;
        vm.search=search;
        vm.catalogo=catalogo;
        vm.equipos=[];
        var tipos_equipo={
            tipo_equipo:null,
            cantidad:null,
            descripcion:null
        };
        activate();
        vm.tipos_equipo=angular.copy(tipos_equipo);
        function activate() {
            TipoEquipo.listWitout().then(function (res) {
                vm.equipos = res;

            });
        }
        function search(obj) {
            if(vm.equipos.length>0) {
                return _.findWhere(vm.equipos, {id: obj}).nombre;
            }
        }
        function addTipoEquipo() {
            if (vm.tipos_equipo!=null) {
                var index = _.findIndex(vm.catalogo.tipos_equipo, function (obj) {
                    return obj.tipo_equipo == vm.selectedTipoEquipo.id;
                });
                if (index == -1) {
                    vm.tipos_equipo.tipo_equipo=vm.selectedTipoEquipo.id;
                    vm.catalogo.tipos_equipo.push(vm.tipos_equipo);
                    vm.catalogo.tipos_equipo = _.sortBy(vm.catalogo.tipos_equipo, 'tipo_equipo');
                    clear();
                }
            }
        }
        function clear() {
            $scope.addTipoEquipoForm.$setPristine();
            $scope.addTipoEquipoForm.$setUntouched();
            vm.tipos_equipo=angular.copy(tipos_equipo);
        }
        function deleteTipoEquipo(item) {
            var resultado = _.indexOf(vm.catalogo.tipos_equipo, item);
            if (resultado != -1) {
                vm.catalogo.tipos_equipo.splice(resultado, 1);
            }
        }

        function okClick() {
            $mdDialog.hide(vm.catalogo.tipos_equipo);
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
