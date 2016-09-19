/**
 * Created by Luis_Olvera on 19/07/2016.
 */
(function () {
    'use strict';
    angular.module('app.mainApp').controller('solicitudDataDialogController',solicitudDataDialogController);
    function solicitudDataDialogController($mdDialog,ModeloCabinet,OPTIONS)
    {
        var vm = this;
        vm.status=OPTIONS.status_equipment;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.tiposEquipo=null;
        activate();
        function activate(){
            vm.tiposEquipo=ModeloCabinet.list();
        }
        function submit()
        {
            $mdDialog.hide(vm.object);
        }
        function cancel()
        {
            $mdDialog.cancel();
        }
    }
})();
