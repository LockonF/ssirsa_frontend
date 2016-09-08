(function() {
    'use strict';

    angular
        .module('app.mainApp.catalogos')
        .controller('LineaTransporteModalController', LineaTransporteModalController) ;

    /* @ngInject */
    function LineaTransporteModalController(LineaTransporte,$mdDialog,toastr,Translate ) {

        var vm = this;
        vm.cancel=cancel;
        vm.registrarTransporte=registrarTransporte;
        var transport={
            razon_social:null,
            direccion:null,
            telefonos:[],
            responsable:null
        };
        vm.transport=angular.copy(transport);
        activate();
        function activate() {
            vm.successTitle = Translate.translate('MAIN.MSG.SUCCESS_TITLE');
            vm.errorTitle = Translate.translate('MAIN.MSG.ERROR_TITLE');
            vm.successCreateMessage = Translate.translate('MAIN.MSG.SUCESSS_TRANSPORTE_MESSAGE');
            vm.errorMessage = Translate.translate('MAIN.MSG.ERROR_MESSAGE');

        }
        function cancel()
        {
            $mdDialog.cancel();
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

})();
