/**
 * Created by franciscojaviercerdamartinez on 21/07/16.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.inventario')
        .controller('insumoController', insumoController);

    function insumoController(Translate, CatalogoInsumo, Insumo, toastr, Helper) {
        //Variable definition
        var vm = this;
        vm.searchText = "";
        vm.cantidaad="1";
        vm.showElements = false;
        vm.choices = [
            Translate.translate('SUPPLIES.FIELDS.KIND_CHOICES.UNIQUE'),
            Translate.translate('SUPPLIES.FIELDS.KIND_CHOICES.LOT')
        ];


        //Translates
        vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
        vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
        vm.errorGenericMesssage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');

        //Function parsing
        vm.selectionChanged = selectionChanged;
        vm.selectedItemChange = selectedItemChange;
        vm.search = search;

        //Blank variables
        var insumo = {
            "cantidad": null,
            "no_remision": "",
            "usado": false,
            "fecha_alta": null,
            "linea": "",
            "no_serie": "",
            "catalogo": null
        };

        //Code
        activate();

        function activate() {
            CatalogoInsumo.listObject().then(function (res) {
                vm.catalogoInsumos = Helper.filterDeleted(res, true);
                vm.filteredInsumos = {};
                vm.uniqueInsumos = _.filter(vm.catalogoInsumos, function (element) {
                    return element.tipo === "U";
                });
                vm.lotInsumos = _.filter(vm.catalogoInsumos, function (element) {
                    return element.tipo === "L";
                });
            });
            vm.selectedInsumos = {};
            vm.selectedInsumo = null;
            vm.selectedKind;
            vm.isValid = false;
            vm.insumo = angular.copy(insumo);
        }

        function selectionChanged() {
            if (vm.selectedKind == Translate.translate('SUPPLIES.FIELDS.KIND_CHOICES.UNIQUE')) {
                vm.selectedInsumos = vm.uniqueInsumos;
                vm.filteredInsumos = vm.uniqueInsumos;
            }

            if (vm.selectedKind == Translate.translate('SUPPLIES.FIELDS.KIND_CHOICES.LOT')) {
                vm.selectedInsumos = vm.lotInsumos;
                vm.filteredInsumos = vm.lotInsumos;
            }
        }

        function search(text) {
            if (!angular.isUndefined(text)) {
                vm.filteredInsumos = _.filter(vm.selectedInsumos, function (item) {
                    return (item.palabra_clave.toLowerCase().startsWith(text.toLowerCase()) || item.descripcion.toLowerCase().includes(text.toLowerCase()));
                });
                vm.isValid = !((vm.filteredInsumos.length == 0 && text.length > 0) || (text.length > 0 && !angular.isObject(vm.selectedInsumo)));
                return vm.filteredInsumos;
            }
        }

        function selectedItemChange(item) {
            vm.isValid = angular.isObject(item);
        }

        function clear(){
            vm.cantidad="1";
            vm.selectedInsumo=null;

        }

    }


})();
