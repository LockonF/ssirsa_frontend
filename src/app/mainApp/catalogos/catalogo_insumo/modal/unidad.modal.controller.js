/**
 * Created by amezc on 01/12/2016.
 */
(function() {
    'use_strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('UnidadModalController', UnidadModalController);

    function UnidadModalController( unidad, $mdDialog,Translate) {
        var vm = this;
        //Function parsing
        vm.create = create;
        vm.cancel = cancel;

        var unidad_var = {
            "name": ""
        };
        vm.unidad=angular.copy(unidad_var);
        activate();

        function activate() {
            vm.duplicateMessage=Translate.translate('Consumable_Catalog.DUPLICATE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');
        }

        function create() {
            unidad.create(vm.unidad).then(function () {
                $mdDialog.hide();
            }).catch(function (err) {
                if(err.status==400 && err.data.nombre!=undefined)
                {
                    toastr.error(vm.duplicateMessage,vm.errorTitle);
                }else {
                    toastr.error(vm.errorMessage, vm.errorTitle);
                }
            });
        }

        function cancel() {
            $mdDialog.cancel(null);
        }

    }

})();

